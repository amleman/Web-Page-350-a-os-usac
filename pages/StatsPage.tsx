import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GeneralStats {
  total_unique_visitors: number;
  total_visits: number;
  intro_visits: number;
  rector_visits: number;
  credits_visits: number;
}

interface RectorStats {
  rector_id: string;
  unique_visits: number;
  total_visits: number;
}

export const StatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [generalStats, setGeneralStats] = useState<GeneralStats | null>(null);
  const [rectorStats, setRectorStats] = useState<RectorStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getApiBaseUrl = (): string => {
    return window.location.origin;
  };

  useEffect(() => {
    fetchStats();
    // Actualizar cada 10 segundos
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Obtener estadísticas generales
      const generalResponse = await fetch(`${getApiBaseUrl()}/api/stats/general`);
      if (generalResponse.ok) {
        const general = await generalResponse.json();
        setGeneralStats(general);
      }

      // Obtener estadísticas por rector
      const rectorsResponse = await fetch(`${getApiBaseUrl()}/api/stats/rectors`);
      if (rectorsResponse.ok) {
        const rectors = await rectorsResponse.json();
        setRectorStats(rectors);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-slate-800/50 rounded-full text-slate-400 hover:text-cyan-400 transition-colors border border-white/5 hover:border-cyan-500/30"
              aria-label="Volver"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl md:text-3xl font-serif text-cyan-300">Estadísticas</h1>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-cyan-400 text-lg">Cargando estadísticas...</div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Estadísticas Generales */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-serif text-cyan-200 mb-6 flex items-center gap-2">
                <TrendingUp size={24} />
                Estadísticas Generales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <span className="text-sm text-slate-400 uppercase tracking-wide">Visitantes Únicos</span>
                  </div>
                  <p className="text-4xl font-bold text-cyan-300">
                    {generalStats?.total_unique_visitors || 0}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className="w-6 h-6 text-amber-400" />
                    <span className="text-sm text-slate-400 uppercase tracking-wide">Total Visitas</span>
                  </div>
                  <p className="text-4xl font-bold text-amber-300">
                    {generalStats?.total_visits || 0}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-red-400" />
                    <span className="text-sm text-slate-400 uppercase tracking-wide">Visitas a Rectores</span>
                  </div>
                  <p className="text-4xl font-bold text-red-300">
                    {generalStats?.rector_visits || 0}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                  <span className="text-sm text-slate-400 uppercase tracking-wide block mb-3">Visitas a Intro</span>
                  <p className="text-3xl font-bold text-white">
                    {generalStats?.intro_visits || 0}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                  <span className="text-sm text-slate-400 uppercase tracking-wide block mb-3">Visitas a Créditos</span>
                  <p className="text-3xl font-bold text-white">
                    {generalStats?.credits_visits || 0}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Estadísticas por Rector */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-serif text-cyan-200 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Visitas por Rector
              </h2>
              <div className="space-y-4">
                {rectorStats.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 bg-slate-900/50 rounded-xl border border-cyan-500/10">
                    No hay visitas registradas aún
                  </div>
                ) : (
                  rectorStats.map((stat, index) => (
                    <motion.div
                      key={stat.rector_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                      className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-serif text-xl text-cyan-200 capitalize">
                            {stat.rector_id.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-slate-400 mt-1">
                            {stat.unique_visits} visitantes únicos
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-amber-300">
                            {stat.total_visits}
                          </p>
                          <p className="text-xs text-slate-500">visitas totales</p>
                        </div>
                      </div>
                      {/* Barra de progreso */}
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.total_visits / (rectorStats[0]?.total_visits || 1)) * 100}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-red-500"
                        />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.section>
          </div>
        )}
      </main>
    </div>
  );
};
