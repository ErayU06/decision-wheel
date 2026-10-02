import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import WheelScreen from './src/screens/WheelScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import {
  loadHistory,
  loadSavedWheels,
  saveHistory,
  saveSavedWheels,
} from './src/storage/storage';

function Root() {
  const { theme } = useTheme();
  const [screen, setScreen] = useState('home');
  const [wheel, setWheel] = useState(null);
  const [savedWheels, setSavedWheels] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadSavedWheels().then(setSavedWheels);
    loadHistory().then(setHistory);
  }, []);

  const saveWheel = useCallback((w) => {
    setSavedWheels((prev) => {
      const next = [w, ...prev];
      saveSavedWheels(next);
      return next;
    });
  }, []);

  const deleteWheel = useCallback((id) => {
    setSavedWheels((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveSavedWheels(next);
      return next;
    });
  }, []);

  const addResult = useCallback((wheelTitle, result) => {
    setHistory((prev) => {
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        wheelTitle,
        result,
        date: new Date().toISOString(),
      };
      const next = [entry, ...prev];
      saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  const openWheel = (w) => {
    setWheel(w);
    setScreen('wheel');
  };

  // The wheel screen paints its own colored background, so it always uses light status-bar content.
  const lightContent = screen === 'wheel' || theme.mode === 'dark';

  return (
    <>
      <StatusBar style={lightContent ? 'light' : 'dark'} />
      {screen === 'wheel' && wheel && (
        <WheelScreen
          {...wheel}
          onResult={(result) => addResult(wheel.title, result)}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen
          history={history}
          onClear={clearHistory}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'home' && (
        <HomeScreen
          onSelect={openWheel}
          onOpenHistory={() => setScreen('history')}
          savedWheels={savedWheels}
          onSaveWheel={saveWheel}
          onDeleteWheel={deleteWheel}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
