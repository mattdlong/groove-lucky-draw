# Lucky Draw App

A modern, animated lucky draw application built with React, TypeScript, and Vite. Features smooth animations, participant management, and a visually engaging drawing process.

## Features

- **Smooth Drawing Animation**: Names cycle through with dynamic speed transitions
- **Participant Management**: Add and remove participants easily
- **Winner Celebration**: Special animation when revealing the winner
- **Flexible Storage**: Choose between local storage or jsonbin.io for data persistence
- **Responsive Design**: Works on all screen sizes
- **Git Info Display**: Shows current commit hash and QR code to repository

## Technical Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- QRCode.react

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mattdlong/groove-lucky-draw.git
cd lucky-draw
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file with the following:

```env
# Storage Configuration
# For local storage:
VITE_JSONBIN_API_KEY=local

# For jsonbin.io storage:
# Note: Escape $ signs with \ in the API key
# Example: VITE_JSONBIN_API_KEY=\$2a\$10\$syjjYBWFQ96TCq.T6QeCYOMr7jso38OFeV8jmORwAEqsZPlpZDPlS

# Git commit hash will be automatically added/updated when running npm run dev or npm run build
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

The application uses the following environment variables:

- `VITE_GIT_COMMIT_HASH`: Current git commit hash (automatically managed)
  - Automatically updated when running npm run dev or npm run build
  - You don't need to set this manually
- `VITE_JSONBIN_API_KEY`: Storage configuration key
  - Set to "local" for browser's localStorage
  - Set to your jsonbin.io API key for remote storage (remember to escape $ signs)
  - This value persists between dev/build runs

## Storage Configuration

### Local Storage
- Set `VITE_JSONBIN_API_KEY=local` in your .env.local file
- Data persists in the browser's localStorage
- Data is isolated to the current browser

### JSONBin.io Storage
- Set `VITE_JSONBIN_API_KEY` to your jsonbin.io API key
- Remember to escape $ signs in the API key with backslashes
- Data persists remotely and can be accessed across different browsers/devices
- Uses a shared storage bin for all instances
- All users with the same API key will share the same participant list
- Perfect for team events where multiple devices need access to the same draw

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
- Flexible storage options (local or remote)
- Real-time participant count display

### Git Info Panel
- Shows current commit hash
- Includes QR code linking to repository
- Updates automatically during development/build

### UI/UX
- Clean, modern interface
- Responsive design
- Smooth animations
- Clear visual feedback

## Development

### Project Structure
```
src/
├── components/
│   ├── draw/
│   │   ├── DrawingFrame.tsx
│   │   ├── ParticipantList.tsx
│   │   └── WinnerModal.tsx
│   ├── GitInfo.tsx
│   └── QRCode.tsx
├── store/
│   ├── drawStore.ts
│   └── storage.ts
├── App.tsx
└── main.tsx
```

### State Management
Uses Zustand for state management with the following features:
- Participant list management
- Drawing state control
- Winner selection
- Modal control
- Persistent storage with local/remote options

### Dependencies

#### Production Dependencies
- `react`: ^18.2.0 - Core React library
- `react-dom`: ^18.2.0 - React DOM rendering
- `framer-motion`: ^11.0.3 - Animation library
- `qrcode.react`: ^3.1.0 - QR code generation
- `zustand`: ^4.5.0 - State management

#### Development Dependencies
- `typescript`: ^5.2.2 - TypeScript support
- `vite`: ^5.0.8 - Build tool and dev server
- `@vitejs/plugin-react`: ^4.2.1 - React support for Vite
- `tailwindcss`: ^3.4.1 - Utility-first CSS framework
- `postcss`: ^8.4.33 - CSS processing
- `autoprefixer`: ^10.4.17 - CSS vendor prefixing
- `eslint`: ^8.55.0 - Code linting
- Various TypeScript and ESLint plugins for development

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
