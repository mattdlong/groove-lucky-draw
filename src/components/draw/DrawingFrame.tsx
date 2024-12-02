import { motion, AnimatePresence } from 'framer-motion';
import useDrawStore from '../../store/drawStore';

const DrawingFrame = () => {
  const { isDrawing, currentName, winner, participants, startDraw, resetDraw } = useDrawStore();

  const handleStartDraw = () => {
    if (participants.length > 0) {
      startDraw();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 text-text">Lucky Draw</h1>
          <p className="text-gray-600 text-lg">
            {participants.length} participant{participants.length !== 1 ? 's' : ''} remaining
          </p>
        </div>

        <div className="relative h-48 mb-8 flex items-center justify-center overflow-hidden border-4 border-accent rounded-xl bg-white/80 backdrop-blur-sm shadow-lg">
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div
                key="winner"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.2, 1],
                  opacity: 1 
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.7, 1],
                  ease: "easeOut"
                }}
                className="text-5xl font-bold text-accent"
              >
                {winner}
              </motion.div>
            ) : isDrawing ? (
              <motion.div
                key={currentName || 'drawing'}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-4xl font-bold text-text"
              >
                {currentName}
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-3xl font-semibold text-gray-400"
              >
                {participants.length > 0 ? 'Click to Start' : 'Add Participants'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartDraw}
            disabled={isDrawing || participants.length === 0}
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-accent text-white 
                     hover:bg-opacity-90 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-xl"
          >
            {isDrawing ? 'Drawing...' : 'Draw'}
          </button>
          {winner && (
            <button
              onClick={resetDraw}
              className="px-8 py-3 text-lg font-semibold rounded-lg bg-gray-500 text-white
                       hover:bg-gray-600 transition-colors duration-200
                       shadow-lg hover:shadow-xl"
            >
              Next Draw
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawingFrame;
