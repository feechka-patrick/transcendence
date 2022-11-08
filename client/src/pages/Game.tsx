import React, { useContext, useState } from 'react';
import { Context } from '../index';
import Square from '../components/Square';
import '../css/GameComponents.css';
import { createGame } from '../http/userAPI';
import { calculateWinner, getNextStep, getRandomInt } from './GameUtils';
import { AxiosError } from 'axios';
import Button from 'react-bootstrap/Button';

function Game() {
  const { user } = useContext(Context);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [countStep, setCount] = useState(0);
  const winner = calculateWinner(board);

  const buttonClick = (index: number): void => {
    const boardCopy = [...board];
    let step = 0;

    if (winner || boardCopy[index]) return;
    boardCopy[index] = 'x';
    step++;

    const tmpwinner = calculateWinner(boardCopy);
    if (tmpwinner === null && countStep < 8) {
      index = getNextStep(boardCopy);
      boardCopy[index] = 'o';
      step++;
    }

    setCount(countStep + step);
    setBoard(boardCopy);

    // еще одна проверка на конец игры для записи в таблицу
    const lasttmpwinner = calculateWinner(boardCopy);
    if (lasttmpwinner !== null || countStep >= 8) {
      try {
        const bwinner = lasttmpwinner === 'x';
        const time = getRandomInt(2, 30);
        const data = createGame(bwinner, time, user.id);
        // @ts-ignore
        this?.updateGames();
      } catch (e: unknown) {
        alert((e as AxiosError)?.response?.data?.message || e?.toString());
      }
    }
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setCount(0);
  };

  return (
    <div className="black_back">

      <Button
        variant="outline-light"
        className="start__btn"
        onClick={() => startNewGame()}
      >
        {' '}
        NEW GAME
      </Button>

      <div className="board">
        {
                    board.map((square, i) => (
                      <Square
                        key={i}
                        value={square}
                        onClick={() => buttonClick(i)}
                      />
                    ))
                }
      </div>

      <div className="game__info">
        {' '}
        {winner ? `[ WIN ${winner} ! ]`
          : (countStep === 9) ? '[ DRAW ! ]' : '[ YOU TURN ]'}
        {' '}

      </div>
    </div>
  );
}

export default Game;
