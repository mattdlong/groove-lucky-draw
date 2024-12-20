import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { customStorage } from './storage';

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

type PersistedState = Pick<DrawState, 'participants'>;

const persistOptions: PersistOptions<DrawStore, PersistedState> = {
  name: 'lucky-draw-storage',
  storage: customStorage,
  partialize: (state) => ({
    participants: state.participants,
  }),
  version: 0,
  onRehydrateStorage: () => (state) => {
    if (state) {
      console.log('Hydrated state:', state);
    }
  },
};

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

            // Use easeInOutQuad for smooth acceleration and deceleration
            const easeInOutQuad = (t: number) => {
              return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            };

            // Calculate interval between name updates
            // Start at 400ms, peak at 600ms in the middle, end at 900ms
            const baseInterval = 400;
            const midInterval = 600;
            const endInterval = 900;
            
            let interval;
            if (progress < 0.5) {
              // First half: accelerate from base to mid
              interval = baseInterval + (midInterval - baseInterval) * easeInOutQuad(progress * 2);
            } else {
              // Second half: decelerate from mid to end
              interval = midInterval + (endInterval - midInterval) * easeInOutQuad((progress - 0.5) * 2);
            }

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
              
              setTimeout(() => {
                
                // Set the winner but keep drawing state true
                set({ currentName: winner, winner, isDrawing: true });

                // Wait 1 second with winner in black
                setTimeout(() => {
                  // Then set drawing to false to trigger pink winner animation
                  set({ isDrawing: false });

                  // Wait 3 seconds before showing the winner modal
                  setTimeout(() => {
                    set(state => ({ 
                      showWinnerModal: true,
                      participants: state.participants.filter(p => p !== winner)
                    }));
                    resolve();
                  }, 1500);
                }, 1500);
              }, 1200);
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
    persistOptions
  )
);

export default useDrawStore;
