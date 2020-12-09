import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../Tetrominos';

export const usePlayer = () => {
    // create state, will return an array with 2 itmes 
    const [player, setPlayer] = useState({
        position: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const updatePlayerPosition = ({x, y, collided}) => {
        // set state using an update function
        setPlayer(prev => ({
            ...prev,
            position: { x: (prev.position.x += x), y: (prev.position.y += y)},
            collided
        }))
    }

    // needs usecallback hook to avoid infinity loop
    const resetPlayer = useCallback(() => {
            // set y to 0 so its at the top when reset
            setPlayer({
                position: { x: STAGE_WIDTH /2 - 2, y: 0},
                tetromino: randomTetromino().shape,
                collided: false

            })
        }, []) 

    return [player, updatePlayerPosition, resetPlayer];
}