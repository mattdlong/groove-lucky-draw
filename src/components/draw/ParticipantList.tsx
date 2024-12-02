import { useState } from 'react';
import { motion } from 'framer-motion';
import useDrawStore from '../../store/drawStore';

const ParticipantList = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { participants, setParticipants, clearParticipants } = useDrawStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    
    // Process input immediately
    const names = value
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    // Update store with valid names
    setParticipants(names);
  };

  return (
    <div className="fixed right-0 top-0 h-full z-10">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isVisible ? "0%" : "calc(100% - 40px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex h-full"
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-10 bg-accent hover:bg-accent/90 text-white flex items-center justify-center
                     shadow-[-4px_0_8px_rgba(0,0,0,0.1)] relative z-10"
          aria-label={isVisible ? "Hide participant list" : "Show participant list"}
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="w-96 bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.1)] p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 text-text">Participants</h2>
          <div className="flex flex-col flex-grow">
            <textarea
              className="flex-grow min-h-[200px] font-mono text-sm p-4 border-2 border-gray-200 rounded-lg
                       focus:outline-none focus:border-accent
                       bg-gray-50 mb-4 resize-none"
              value={participants.join('\n')}
              onChange={handleInputChange}
              placeholder={`Enter names (one per line)\n\nExample:\nJohn Smith\nAlice Johnson\nBob Wilson`}
              aria-label="Participant names"
              spellCheck="false"
            />
            <div className="text-sm text-gray-500 flex items-center justify-between mt-auto">
              <span className="font-medium">
                {participants.length} participant{participants.length !== 1 ? 's' : ''}
              </span>
              {participants.length > 0 && (
                <button
                  onClick={clearParticipants}
                  className="text-accent hover:text-accent/80 font-medium
                           transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParticipantList;
