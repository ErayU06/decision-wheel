import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import WheelScreen from './src/screens/WheelScreen';

export default function App() {
  const [wheel, setWheel] = useState(null);

  return (
    <>
      <StatusBar style={wheel ? 'light' : 'dark'} />
      {wheel ? (
        <WheelScreen {...wheel} onBack={() => setWheel(null)} />
      ) : (
        <HomeScreen onSelect={setWheel} />
      )}
    </>
  );
}
