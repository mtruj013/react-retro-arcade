import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage, checkCollision } from './gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from '../tetris/styles/StyledTetris';
// custom hooks
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useInterval } from './hooks/useIntervalHook';
import { useGameStatus } from './hooks/useGameStatus';

const Tetris = () => {

    // state for drop time speed, depends on level; and also for game over
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // make use of custom hooks
    const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    // allows movement for player
    const movePlayer = dir => {
        console.log(checkCollision)
        if(!checkCollision(player, stage, { x : dir, y: 0})){
            updatePlayerPosition({x: dir, y: 0});
        }
    };

    const startGame = () => {
        console.log("test")
        // reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // increase level when player has cleared 10 rows
        if (rows > (level +1) * 10){
            setLevel(prev => prev +1);
            // increase speed
            setDropTime(1000 / (level + 1) + 200);
        }
        if(!checkCollision(player, stage, { x: 0, y: 1})){

            updatePlayerPosition({ x: 0, y: 1, collided: false})
        }else{
            // game over
            if(player.position.y < 1){
                console.log(player.position)
                console.log("GAME OVER!!")
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPosition({ x : 0, y : 0, collided: true})
        }
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver){
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    // callback function for when keys are pressed, used in moveplayer function 
    const move = ({keyCode}) => {
        console.log(keyCode)
        if (!gameOver) {
            // 37 = left arrow on keyboard
            if (keyCode === 37){
                // move to left
                movePlayer(-1)
            } else if (keyCode === 39){
                // move to right
                movePlayer(1)  
            } else if (keyCode === 40){
                // move down
                dropPlayer()
            } else if (keyCode === 38){
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();

    }, dropTime)

    return (
        // role set so itll respond to key press
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={event => move(event)} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {/* ig G.O, show g.o text, else show score, row, level */}
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>
                    ) : (
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;