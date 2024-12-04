# Lucky Draw App

A modern, animated lucky draw application built with React, TypeScript, and Vite. Features smooth animations, participant management, and a visually engaging drawing process.

## Features

- **Smooth Drawing Animation**: Names cycle through with dynamic speed transitions
- **Participant Management**: Add and remove participants easily
- **Winner Celebration**: Special animation when revealing the winner
- **Persistent Storage**: Participant list is saved between sessions
- **Responsive Design**: Works on all screen sizes
- **Git Info Display**: Shows current commit hash in top left corner

## Technical Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand (State Management)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd lucky-draw
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. Add participants by entering names in the right sidebar
2. Click "Draw" to start the lucky draw
3. Watch as names cycle through with dynamic speed
4. The winner is revealed with a celebratory animation
5. Click "Next Draw" to continue with remaining participants

## Features in Detail

### Drawing Animation
- Names cycle through with varying speeds
- Starts fast and gradually slows down
- Winner appears in black first, then transitions to pink
- 3-second pause before showing the winner modal

### Participant Management
- Add multiple participants at once
- Automatic duplicate removal
- Persistent storage between sessions
- Real-time participant count display

### UI/UX
- Clean, modern interface
- Responsive design
- Smooth animations
- Clear visual feedback

## Development

### Environment Variables
- `VITE_GIT_COMMIT_HASH`: Git commit hash (automatically set)

### Project Structure
```
src/
├── components/
│   ├── draw/
│   │   ├── DrawingFrame.tsx
│   │   ├── ParticipantList.tsx
│   │   └── WinnerModal.tsx
│   └── GitInfo.tsx
├── store/
│   └── drawStore.ts
├── App.tsx
└── main.tsx
```

### State Management
Uses Zustand for state management with the following features:
- Participant list management
- Drawing state control
- Winner selection
- Modal control

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
