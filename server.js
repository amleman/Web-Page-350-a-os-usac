/**
 * Servidor para Rectores USAC 350 Años
 * Usa MySQL para almacenar likes y estadísticas de visitas
 * Ejecutar con: node server.js
 */

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

// Configuración de MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rectores_usac',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Servir archivos estáticos de Vite

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
    
    const [rows] = await pool.execute(
      'SELECT COUNT(*) as count FROM likes WHERE rector_id = ?',
      [rectorId]
    );
    
    const count = rows[0]?.count || 0;
    
    res.json({ rectorId, count });
  } catch (error) {
    console.error('Error getting likes:', error);
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
    
    const [rows] = await pool.execute(
      'SELECT COUNT(*) as count FROM likes WHERE rector_id = ? AND user_id = ?',
      [rectorId, userId]
    );
    
    res.json({ isLiked: rows[0].count > 0 });
  } catch (error) {
    console.error('Error checking like:', error);
    res.status(500).json({ error: 'Error checking like' });
  }
});

// Agregar o quitar like
app.post('/api/likes/:rectorId/toggle', async (req, res) => {
  try {
    const { rectorId } = req.params;
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    
    // Verificar si ya existe
    const [existing] = await pool.execute(
      'SELECT id FROM likes WHERE rector_id = ? AND user_id = ?',
      [rectorId, userId]
    );
    
    let isLiked;
    
    if (existing.length > 0) {
      // Quitar like
      await pool.execute(
        'DELETE FROM likes WHERE rector_id = ? AND user_id = ?',
        [rectorId, userId]
      );
      isLiked = false;
    } else {
      // Agregar like
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
    
    res.json({
      isLiked,
      count: countRows[0].count
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Error toggling like' });
  }
});

// ========== API DE VISITAS ==========

// Registrar visita
app.post('/api/visits', async (req, res) => {
  try {
    const { rectorId, pageType, sessionId, userAgent } = req.body;
    
    if (!pageType || !sessionId) {
      return res.status(400).json({ error: 'pageType and sessionId are required' });
    }
    
    const ipAddress = req.realIp;
    
    await pool.execute(
      `INSERT INTO visits (rector_id, page_type, ip_address, user_agent, session_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [rectorId || null, pageType, ipAddress, userAgent || null, sessionId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error recording visit:', error);
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
    const [rows] = await pool.execute(
      `SELECT 
        COUNT(DISTINCT session_id) as total_unique_visitors,
        COUNT(*) as total_visits,
        COUNT(DISTINCT CASE WHEN page_type = 'intro' THEN session_id END) as intro_visits,
        COUNT(DISTINCT CASE WHEN page_type = 'rector' THEN session_id END) as rector_visits,
        COUNT(DISTINCT CASE WHEN page_type = 'credits' THEN session_id END) as credits_visits
       FROM visits`
    );
    
    res.json(rows[0] || {
      total_unique_visitors: 0,
      total_visits: 0,
      intro_visits: 0,
      rector_visits: 0,
      credits_visits: 0
    });
  } catch (error) {
    console.error('Error getting general stats:', error);
    res.status(500).json({ error: 'Error getting statistics' });
  }
});

// Obtener estadísticas de todos los rectores
app.get('/api/stats/rectors', async (req, res) => {
  try {
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
    
    res.json(rows);
  } catch (error) {
    console.error('Error getting rectors stats:', error);
    res.status(500).json({ error: 'Error getting statistics' });
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
app.get('*', (req, res) => {
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
