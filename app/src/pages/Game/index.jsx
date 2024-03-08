import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startGame, rollDice, endGame, setWin } from '../../features/game/gameSlice';
import Dice from '../../components/Dice';

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, rolls, gameState } = useSelector((state) => state.game);

  const handleRollDice = () => {
    if (gameState !== 'end') {
      dispatch(startGame());
      dispatch(rollDice());
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && rolls < 3) {
      const counts = {};
      values.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
      });
      const countsValues = Object.values(counts);
      const maxValue = Math.max(...countsValues);
      if (maxValue >= 3) {
        dispatch(setWin(maxValue));
        dispatch(endGame());
        navigate('/results');
      }
    } else if (rolls === 3) {
      dispatch(endGame());
    }
  }, [values, gameState, rolls]);

  return (
    <div className="text-center">
      <div className="flex justify-center my-8">
        {values.map((value, index) => (
          <Dice key={index} value={value} />
        ))}
      </div>
      <button onClick={handleRollDice} disabled={gameState === 'end'}>
        Lancer les dés
      </button>
    </div>
  );
};

export default Game;
