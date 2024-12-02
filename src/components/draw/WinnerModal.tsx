import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDrawStore from '../../store/drawStore';

const WinnerModal = () => {
  const { winner, showWinnerModal, closeWinnerModal } = useDrawStore();

  useEffect(() => {
    if (winner && showWinnerModal) {
      // Play celebration sound
      const audio = new Audio('data:audio/wav;base64,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');
      audio.play().catch(() => {
        // Ignore audio play errors
      });
    }
  }, [winner, showWinnerModal]);

  return (
    <AnimatePresence>
      {winner && showWinnerModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeWinnerModal}
        >
          {/* Background overlay with confetti effect */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Winner announcement */}
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
              <motion.div
                className="text-4xl font-bold text-accent mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {winner}
              </motion.div>
              <p className="text-gray-600 mb-6">is the lucky winner!</p>
              <button
                onClick={closeWinnerModal}
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90
                         transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>

          {/* Confetti particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 2 + 1,
                  opacity: 0
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinnerModal;
