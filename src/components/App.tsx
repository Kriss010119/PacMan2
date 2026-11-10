import React, { useState } from 'react';
import { Menu } from './Menu';
import { Game } from './Game';
import { Records } from './Records';
import '@fontsource/press-start-2p';

type Screen = 'menu' | 'game' | 'records';

export const App = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [level, setLevel] = useState(1);

  if (screen === 'game') {
    return <Game level={level} onMenu={() => setScreen('menu')} />;
  }

  if (screen === 'records') {
    return <Records onPlay={() => setScreen('game')} onMenu={() => setScreen('menu')} />;
  }

  return (
    <Menu level={level} onLevel={setLevel} onPlay={() => setScreen('game')} onRecords={() => setScreen('records')} />
  );
};
