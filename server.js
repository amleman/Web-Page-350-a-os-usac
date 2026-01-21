/**
 * Servidor para Rectores USAC 350 Años
 * Usa MySQL para almacenar likes y estadísticas de visitas
 * Ejecutar con: node server.js
 */

import 'dotenv/config'; // Load environment variables
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_PATH = process.env.VITE_BASE_PATH || '/';

// Configuración de MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rectores_usac',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(BASE_PATH, express.static('dist')); // Servir archivos estáticos de Vite con el path base

// Middleware para obtener IP real (útil si hay proxy)
app.use((req, res, next) => {
  req.realIp = req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    'unknown';
  next();
});

// ========== API DE LIKES ==========

// Obtener likes de un rector específico
app.get('/api/likes/:rectorId', async (req, res) => {
  try {
    const { rectorId } = req.params;
    console.log(`[API] GET /api/likes/${rectorId} - Obteniendo likes para rector`);

    const [rows] = await pool.execute(
      'SELECT COUNT(*) as count FROM likes WHERE rector_id = ?',
      [rectorId]
    );

    // MySQL2 retorna COUNT(*) como BigInt, convertir a número
    const count = Number(rows[0]?.count || 0);
    console.log(`[API] Likes encontrados para ${rectorId}: ${count}`);

    res.json({ rectorId, count });
  } catch (error) {
    console.error('[API] Error getting likes:', error);
    res.status(500).json({ error: 'Error getting likes' });
  }
});

// Obtener todos los likes
app.get('/api/likes', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT rector_id, COUNT(*) as count FROM likes GROUP BY rector_id'
    );

    const likes = {};
    rows.forEach(row => {
      likes[row.rector_id] = {
        count: row.count,
        likedBy: [] // No enviamos la lista completa por privacidad
      };
    });

    res.json(likes);
  } catch (error) {
    console.error('Error getting all likes:', error);
    res.status(500).json({ error: 'Error getting likes' });
  }
});

// Verificar si un usuario ya dio like
app.get('/api/likes/:rectorId/check/:userId', async (req, res) => {
  try {
    const { rectorId, userId } = req.params;
    console.log(`[API] GET /api/likes/${rectorId}/check/${userId} - Verificando like`);

    const [rows] = await pool.execute(
      'SELECT COUNT(*) as count FROM likes WHERE rector_id = ? AND user_id = ?',
      [rectorId, userId]
    );

    const isLiked = Number(rows[0]?.count || 0) > 0;
    console.log(`[API] Usuario ${userId} ha dado like a ${rectorId}: ${isLiked}`);

    res.json({ isLiked });
  } catch (error) {
    console.error('[API] Error checking like:', error);
    res.status(500).json({ error: 'Error checking like' });
  }
});

// Agregar o quitar like
app.post('/api/likes/:rectorId/toggle', async (req, res) => {
  try {
    const { rectorId } = req.params;
    const { userId } = req.body;

    console.log(`[API] POST /api/likes/${rectorId}/toggle - userId: ${userId}`);

    if (!userId) {
      console.error('[API] Error: userId is required');
      return res.status(400).json({ error: 'userId is required' });
    }

    // Verificar si ya existe
    const [existing] = await pool.execute(
      'SELECT id FROM likes WHERE rector_id = ? AND user_id = ?',
      [rectorId, userId]
    );

    console.log(`[API] Like existente encontrado: ${existing.length > 0}`);

    let isLiked;

    if (existing.length > 0) {
      // Quitar like
      console.log(`[API] Eliminando like para ${rectorId} de usuario ${userId}`);
      await pool.execute(
        'DELETE FROM likes WHERE rector_id = ? AND user_id = ?',
        [rectorId, userId]
      );
      isLiked = false;
    } else {
      // Agregar like
      console.log(String(`[API] Agregando like para ${rectorId} de usuario ${userId}`).replace(/\n|\r/g, ''));
      await pool.execute(
        'INSERT INTO likes (rector_id, user_id) VALUES (?, ?)',
        [rectorId, userId]
      );
      isLiked = true;
    }

    // Obtener nuevo conteo
    const [countRows] = await pool.execute(
      'SELECT COUNT(*) as count FROM likes WHERE rector_id = ?',
      [rectorId]
    );

    // MySQL2 retorna COUNT(*) como BigInt, convertir a número
    const count = Number(countRows[0]?.count || 0);
    console.log(`[API] Nuevo conteo para ${rectorId}: ${count}, isLiked: ${isLiked}`);

    res.json({
      isLiked,
      count: count
    });
  } catch (error) {
    console.error('[API] Error toggling like:', error);
    console.error('[API] Stack:', error.stack);
    res.status(500).json({ error: 'Error toggling like', details: error.message });
  }
});

// ========== API DE VISITAS ==========

// Registrar visita
app.post('/api/visits', async (req, res) => {
  try {
    const { rectorId, pageType, sessionId, userAgent } = req.body;

    console.log('[API] POST /api/visits - Registrando visita:', { rectorId, pageType, sessionId });

    if (!pageType || !sessionId) {
      console.error('[API] Error: pageType and sessionId are required');
      return res.status(400).json({ error: 'pageType and sessionId are required' });
    }

    const ipAddress = req.realIp;

    const [result] = await pool.execute(
      `INSERT INTO visits (rector_id, page_type, ip_address, user_agent, session_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [rectorId || null, pageType, ipAddress, userAgent || null, sessionId]
    );

    console.log('[API] Visita registrada exitosamente, ID:', result.insertId);

    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('[API] Error recording visit:', error);
    console.error('[API] Stack:', error.stack);
    res.status(500).json({ error: 'Error recording visit' });
  }
});

// Obtener estadísticas de visitas por rector
app.get('/api/stats/visits/rector/:rectorId', async (req, res) => {
  try {
    const { rectorId } = req.params;

    const [rows] = await pool.execute(
      `SELECT 
        COUNT(DISTINCT session_id) as unique_visits,
        COUNT(*) as total_visits
       FROM visits 
       WHERE rector_id = ?`,
      [rectorId]
    );

    res.json(rows[0] || { unique_visits: 0, total_visits: 0 });
  } catch (error) {
    console.error('Error getting rector stats:', error);
    res.status(500).json({ error: 'Error getting statistics' });
  }
});

// Obtener estadísticas generales
app.get('/api/stats/general', async (req, res) => {
  try {
    console.log('[API] GET /api/stats/general - Obteniendo estadísticas generales');

    const [rows] = await pool.execute(
      `SELECT 
        COUNT(DISTINCT session_id) as total_unique_visitors,
        COUNT(*) as total_visits,
        COUNT(DISTINCT CASE WHEN page_type = 'intro' THEN session_id END) as intro_visits,
        COUNT(DISTINCT CASE WHEN page_type = 'rector' THEN session_id END) as rector_visits,
        COUNT(DISTINCT CASE WHEN page_type = 'credits' THEN session_id END) as credits_visits
       FROM visits`
    );

    // Convertir BigInt a Number
    const stats = rows[0] ? {
      total_unique_visitors: Number(rows[0].total_unique_visitors || 0),
      total_visits: Number(rows[0].total_visits || 0),
      intro_visits: Number(rows[0].intro_visits || 0),
      rector_visits: Number(rows[0].rector_visits || 0),
      credits_visits: Number(rows[0].credits_visits || 0)
    } : {
      total_unique_visitors: 0,
      total_visits: 0,
      intro_visits: 0,
      rector_visits: 0,
      credits_visits: 0
    };

    console.log('[API] Estadísticas generales:', stats);

    res.json(stats);
  } catch (error) {
    console.error('[API] Error getting general stats:', error);
    res.status(500).json({ error: 'Error getting statistics' });
  }
});

// Obtener estadísticas de todos los rectores
app.get('/api/stats/rectors', async (req, res) => {
  try {
    console.log('[API] GET /api/stats/rectors - Obteniendo estadísticas de rectores');

    // Primero, verificar cuántas visitas hay en total
    const [totalRows] = await pool.execute(
      `SELECT COUNT(*) as total FROM visits WHERE rector_id IS NOT NULL`
    );
    console.log('[API] Total de visitas a rectores en BD:', totalRows[0]?.total || 0);

    const [rows] = await pool.execute(
      `SELECT 
        rector_id,
        COUNT(DISTINCT session_id) as unique_visits,
        COUNT(*) as total_visits
       FROM visits 
       WHERE rector_id IS NOT NULL
       GROUP BY rector_id
       ORDER BY total_visits DESC`
    );

    // Convertir BigInt a Number
    const stats = rows.map((row) => ({
      rector_id: row.rector_id,
      unique_visits: Number(row.unique_visits || 0),
      total_visits: Number(row.total_visits || 0)
    }));

    console.log(`[API] Estadísticas de rectores: ${stats.length} rectores encontrados`);
    console.log('[API] Detalle de estadísticas:', stats);

    res.json(stats);
  } catch (error) {
    console.error('[API] Error getting rectors stats:', error);
    console.error('[API] Stack:', error.stack);
    res.status(500).json({ error: 'Error getting statistics' });
  }
});

// Obtener estadísticas de likes por rector
app.get('/api/stats/likes', async (req, res) => {
  try {
    console.log('[API] GET /api/stats/likes - Obteniendo estadísticas de likes por rector');

    // Primero verificar cuántos likes hay en total
    const [totalRows] = await pool.execute(
      `SELECT COUNT(*) as total FROM likes`
    );
    const totalLikesInDB = Number(totalRows[0]?.total || 0);
    console.log('[API] Total de likes en BD:', totalLikesInDB);

    // Obtener todos los likes para debug
    const [allLikes] = await pool.execute(
      `SELECT rector_id, user_id, created_at FROM likes LIMIT 10`
    );
    console.log('[API] Primeros 10 likes en BD:', allLikes);

    const [rows] = await pool.execute(
      `SELECT 
        rector_id,
        COUNT(*) as total_likes
       FROM likes 
       GROUP BY rector_id
       ORDER BY total_likes DESC`
    );

    // Convertir BigInt a Number
    const stats = rows.map((row) => ({
      rector_id: row.rector_id,
      total_likes: Number(row.total_likes || 0)
    }));

    console.log(`[API] Estadísticas de likes: ${stats.length} rectores encontrados`);
    console.log('[API] Detalle de likes:', stats);
    console.log('[API] Total de likes en BD vs estadísticas:', totalLikesInDB, 'vs', stats.reduce((sum, s) => sum + s.total_likes, 0));

    res.json(stats);
  } catch (error) {
    console.error('[API] Error getting likes stats:', error);
    console.error('[API] Stack:', error.stack);
    res.status(500).json({ error: 'Error getting likes statistics' });
  }
});

// Endpoint de diagnóstico para verificar likes
app.get('/api/debug/likes', async (req, res) => {
  try {
    console.log('[API] GET /api/debug/likes - Diagnóstico de likes');

    // Verificar si la tabla existe
    const [tables] = await pool.execute(
      `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'likes'`
    );

    const tableExists = tables.length > 0;
    console.log('[API] Tabla likes existe:', tableExists);

    if (!tableExists) {
      return res.json({
        error: 'La tabla likes no existe',
        tableExists: false,
        totalLikes: 0,
        likesByRector: []
      });
    }

    // Contar total de likes
    const [totalRows] = await pool.execute('SELECT COUNT(*) as total FROM likes');
    const totalLikes = Number(totalRows[0]?.total || 0);
    console.log('[API] Total de likes:', totalLikes);

    // Obtener todos los likes
    const [allLikes] = await pool.execute(
      'SELECT rector_id, user_id, created_at FROM likes ORDER BY created_at DESC LIMIT 20'
    );
    console.log('[API] Últimos 20 likes:', allLikes);

    // Obtener likes agrupados por rector
    const [groupedLikes] = await pool.execute(
      `SELECT rector_id, COUNT(*) as count FROM likes GROUP BY rector_id ORDER BY count DESC`
    );

    const likesByRector = groupedLikes.map(row => ({
      rector_id: row.rector_id,
      count: Number(row.count || 0)
    }));

    console.log('[API] Likes por rector:', likesByRector);

    res.json({
      tableExists: true,
      totalLikes,
      recentLikes: allLikes,
      likesByRector,
      message: 'Diagnóstico completado. Revisa los logs del servidor para más detalles.'
    });
  } catch (error) {
    console.error('[API] Error en diagnóstico de likes:', error);
    console.error('[API] Stack:', error.stack);
    res.status(500).json({
      error: 'Error en diagnóstico',
      details: error.message,
      stack: error.stack
    });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    await pool.execute('SELECT 1');
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Servir la aplicación React para todas las rutas no-API
// Esto permite que React Router maneje las rutas en el cliente
// Servir la aplicación React para todas las rutas no-API
// Esto permite que React Router maneje las rutas en el cliente
// Match requests starting with BASE_PATH (excluding /api)
const spaRegex = new RegExp(`^${BASE_PATH === '/' ? '' : BASE_PATH}(?!api).*`);
app.get(spaRegex, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: ${dbConfig.database}@${dbConfig.host}`);

  // Verificar conexión a la base de datos
  try {
    await pool.execute('SELECT 1');
    console.log(`✅ Conexión a MySQL establecida`);
  } catch (error) {
    console.error(`❌ Error conectando a MySQL: ${error.message}`);
    console.error(`   Asegúrate de que MySQL esté corriendo y la base de datos exista`);
  }
});

// Cerrar pool al terminar
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});


// Mobb security fix applied: LOG_FORGING https://mobb.ai/organization/dd378e88-da0e-4bff-b4fc-a76162045684/project/9362d7fb-a070-4444-9de2-a649c56da21c/report/9691a04a-59e6-4539-bf38-76955c4892a4/fix/155fce47-7ae0-4d28-8480-06a5bf5eea9d