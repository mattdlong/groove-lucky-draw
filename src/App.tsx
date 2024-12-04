import DrawingFrame from './components/draw/DrawingFrame';
import ParticipantList from './components/draw/ParticipantList';
import WinnerModal from './components/draw/WinnerModal';
import GitInfo from './components/GitInfo';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-gray-100 to-accent/10">
      <GitInfo />
      <main className="relative min-h-screen">
        <DrawingFrame />
        <ParticipantList />
        <WinnerModal />
      </main>
    </div>
  );
}

export default App;
