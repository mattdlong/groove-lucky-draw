import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DrawState {
  participants: string[];
  winner: string | null;
  isDrawing: boolean;
  currentName: string | null;
  showWinnerModal: boolean;
}

interface DrawActions {
  setParticipants: (participants: string[]) => void;
  addParticipant: (name: string) => void;
  removeParticipant: (name: string) => void;
  startDraw: () => Promise<void>;
  resetDraw: () => void;
  clearParticipants: () => void;
  closeWinnerModal: () => void;
}

type DrawStore = DrawState & DrawActions;

const useDrawStore = create<DrawStore>()(
  persist(
    (set, get) => ({
      // Initial state
      participants: [],
      winner: null,
      isDrawing: false,
      currentName: null,
      showWinnerModal: false,

      // Actions
      setParticipants: (newParticipants) => {
        const validParticipants = Array.from(new Set(
          newParticipants
            .map(p => p.trim())
            .filter(p => p.length > 0)
        ));
        set({ participants: validParticipants });
      },

      addParticipant: (name) => {
        const { participants } = get();
        const trimmedName = name.trim();
        if (trimmedName && !participants.includes(trimmedName)) {
          set({ participants: [...participants, trimmedName] });
        }
      },

      removeParticipant: (name) => {
        const { participants } = get();
        set({ participants: participants.filter(p => p !== name) });
      },

      startDraw: async () => {
        const { participants } = get();
        if (participants.length === 0) return;

        set({ isDrawing: true, winner: null, showWinnerModal: false });

        // Random duration between 15 and 25 seconds
        const duration = Math.floor(Math.random() * (25000 - 15000) + 15000);
        const startTime = Date.now();
        let lastUpdateTime = startTime;

        return new Promise<void>((resolve) => {
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Calculate interval between name updates
            // Start at 50ms and gradually increase to 400ms
            const interval = 50 + (progress * 350);

            // Update name if enough time has passed since last update
            if (currentTime - lastUpdateTime >= interval) {
              const { currentName } = get();
              let newName;
              do {
                const randomIndex = Math.floor(Math.random() * participants.length);
                newName = participants[randomIndex];
              } while (newName === currentName && participants.length > 1);
              
              set({ currentName: newName });
              lastUpdateTime = currentTime;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Select winner
              const winnerIndex = Math.floor(Math.random() * participants.length);
              const winner = participants[winnerIndex];
              
              // Set the winner but keep drawing state true
              set({ currentName: winner, winner });

              // Wait 3 seconds before showing the winner modal
              setTimeout(() => {
                set(state => ({ 
                  isDrawing: false,
                  showWinnerModal: true,
                  participants: state.participants.filter(p => p !== winner)
                }));
                resolve();
              }, 3000);
            }
          };

          requestAnimationFrame(animate);
        });
      },

      resetDraw: () => {
        set({ winner: null, currentName: null, showWinnerModal: false });
      },

      clearParticipants: () => {
        set({ participants: [], winner: null, currentName: null, showWinnerModal: false });
      },

      closeWinnerModal: () => {
        set({ showWinnerModal: false });
      },
    }),
    {
      name: 'lucky-draw-storage',
      partialize: (state) => ({
        participants: state.participants
      }),
    }
  )
);

export default useDrawStore;
