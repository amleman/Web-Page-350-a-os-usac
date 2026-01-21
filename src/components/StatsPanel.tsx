import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, X, TrendingUp, Users, Heart, Eye } from 'lucide-react';

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

interface StatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ isOpen, onClose }) => {
  const [generalStats, setGeneralStats] = useState<GeneralStats | null>(null);
  const [rectorStats, setRectorStats] = useState<RectorStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    if (isOpen) {
      fetchStats();
      // Actualizar cada 10 segundos
      const interval = setInterval(fetchStats, 10000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);

      // Obtener estadísticas generales
      const generalResponse = await fetch(`${import.meta.env.BASE_URL}api/stats/general`);
      if (generalResponse.ok) {
        const general = await generalResponse.json();
        setGeneralStats(general);
      }

      // Obtener estadísticas por rector
      const rectorsResponse = await fetch(`${import.meta.env.BASE_URL}api/stats/rectors`);
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-80 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[#0B1120] border-l border-cyan-500/20 z-90 overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl font-serif text-cyan-300">Estadísticas</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-800/50 rounded-full text-slate-400 hover:text-cyan-400 transition-colors border border-white/5 hover:border-cyan-500/30"
            >
              <X size={24} />
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-cyan-400">Cargando estadísticas...</div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Estadísticas Generales */}
              <section>
                <h3 className="text-xl font-serif text-cyan-200 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} />
                  Estadísticas Generales
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-slate-400">Visitantes Únicos</span>
                    </div>
                    <p className="text-3xl font-bold text-cyan-300">
                      {generalStats?.total_unique_visitors || 0}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-slate-400">Total Visitas</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-300">
                      {generalStats?.total_visits || 0}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
                    <span className="text-sm text-slate-400 block mb-2">Visitas Intro</span>
                    <p className="text-2xl font-bold text-white">
                      {generalStats?.intro_visits || 0}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
                    <span className="text-sm text-slate-400 block mb-2">Visitas Créditos</span>
                    <p className="text-2xl font-bold text-white">
                      {generalStats?.credits_visits || 0}
                    </p>
                  </div>
                </div>
              </section>

              {/* Estadísticas por Rector */}
              <section>
                <h3 className="text-xl font-serif text-cyan-200 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Visitas por Rector
                </h3>
                <div className="space-y-3">
                  {rectorStats.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      No hay visitas registradas aún
                    </div>
                  ) : (
                    rectorStats.map((stat, index) => (
                      <motion.div
                        key={stat.rector_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-serif text-lg text-cyan-200 capitalize">
                              {stat.rector_id.replace('_', ' ')}
                            </p>
                            <p className="text-sm text-slate-400 mt-1">
                              {stat.unique_visits} visitantes únicos
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-amber-300">
                              {stat.total_visits}
                            </p>
                            <p className="text-xs text-slate-500">visitas</p>
                          </div>
                        </div>
                        {/* Barra de progreso */}
                        <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(stat.total_visits / (rectorStats[0]?.total_visits || 1)) * 100}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-amber-500"
                          />
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
