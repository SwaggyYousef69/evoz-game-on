
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Trophy } from 'lucide-react';

type LevelUpAnimationProps = {
  level: number;
  onComplete?: () => void;
  show: boolean;
};

export function LevelUpAnimation({ level, onComplete, show }: LevelUpAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [-20, 0, -10, 0]
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            y: { repeat: Infinity, duration: 2 }
          }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-gaming-gold via-gaming-purple to-gaming-cyan rounded-full blur-xl opacity-60"
            />
            
            {/* Main badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.2
              }}
              className="relative bg-gradient-to-r from-gaming-gold to-gaming-purple text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-gaming-gold"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-gaming-gold" />
                <div className="text-center">
                  <div className="text-2xl font-bold">LEVEL UP!</div>
                  <div className="text-lg">Level {level}</div>
                </div>
                <Trophy className="w-8 h-8 text-gaming-gold" />
              </div>
            </motion.div>

            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 100,
                  y: Math.sin(i * 60 * Math.PI / 180) * 100,
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-6 h-6 text-gaming-gold" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
