import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage } from './gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from '../tetris/styles/StyledTetris';
// custom hooks
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';


const Tetris = () => {

    // state for drop time speed, depends on level; and also for game over
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // make use of custom hooks
    const [player, updatePlayerPosition, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render');

    // creates movement for player
    const movePlayer = dir => {
        updatePlayerPosition({x: dir, y: 0})
    }

    const startGame = () => {
        // reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPosition({ x: 0, y: 1, collided: false})
    }

    const dropPlayer = () => {
        drop();
    }

    // callback function for when keys are pressed, used in moveplayer function 
    const move = ({keyCode}) => {
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
            }
        }
    }

    return (
        // role set so itll respond to key press
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={event => move(event)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {/* ig G.O, show g.o text, else show score, row, level */}
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>
                    ) : (
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;