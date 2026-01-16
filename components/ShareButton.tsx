import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check, Copy, X } from 'lucide-react';

interface ShareButtonProps {
  rector?: {
    id: string;
    nombre: string;
    periodo: string;
  };
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ rector, className = '' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    if (rector) {
      return `${baseUrl}/?rector=${rector.id}`;
    }
    return baseUrl;
  };

  const getShareText = () => {
    if (rector) {
      return `Conoce a ${rector.nombre} - ${rector.periodo} | Universidad de San Carlos de Guatemala - 350 Años`;
    }
    return 'Universidad de San Carlos de Guatemala - 350 Años de Historia';
  };

  const handleShare = async () => {
    const url = getShareUrl();
    const text = getShareText();

    // Intentar usar Web Share API (móviles principalmente)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'USAC 350 Años',
          text: text,
          url: url,
        });
        setShowMenu(false);
        return;
      } catch (error) {
        // El usuario canceló o hubo un error
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
        return;
      }
    }

    // Fallback: mostrar menú de opciones
    setShowMenu(true);
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    }
  };

  const handleShareTwitter = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    setShowMenu(false);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShowMenu(false);
  };

  const handleShareWhatsApp = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, '_blank');
    setShowMenu(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleShare}
        className={`flex items-center justify-center gap-2.5 p-3.5 md:p-4 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-md rounded-2xl border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_0_1px_rgba(251,191,36,0.1)] hover:shadow-[0_6px_24px_rgba(251,191,36,0.25),0_0_0_1px_rgba(251,191,36,0.2)] group ${className}`}
        aria-label="Compartir"
      >
        <Share2 className="w-5 h-5 md:w-6 md:h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
        <span className="hidden sm:inline text-sm md:text-base font-serif text-amber-300 group-hover:text-amber-200">
          Compartir
        </span>
      </motion.button>

      {/* Menú de compartir (fallback para desktop) */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
            />

            {/* Menú */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-black/90 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-2xl p-6 max-w-sm w-[90%]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif text-amber-300">Compartir</h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Copiar enlace */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all"
                >
                  {copied ? (
                    <Check className="w-6 h-6 text-green-400" />
                  ) : (
                    <Copy className="w-6 h-6 text-amber-400" />
                  )}
                  <span className="text-xs text-white/80 font-serif">
                    {copied ? 'Copiado!' : 'Copiar enlace'}
                  </span>
                </motion.button>

                {/* WhatsApp */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareWhatsApp}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all"
                >
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-xs text-white/80 font-serif">WhatsApp</span>
                </motion.button>

                {/* Twitter */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareTwitter}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all"
                >
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-xs text-white/80 font-serif">Twitter</span>
                </motion.button>

                {/* Facebook */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareFacebook}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all"
                >
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-xs text-white/80 font-serif">Facebook</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
