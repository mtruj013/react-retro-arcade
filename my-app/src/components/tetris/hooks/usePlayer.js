import { useState, useCallback } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../Tetrominos';

export const usePlayer = () => {
    // create state, will return an array with 2 itmes 
    const [player, setPlayer] = useState({
        position: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    // does actual rotation
    const rotate = (matrix, dir) => {
        // make rows columns
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map(col => col[index])
        );
        // reverse each row to get a rotated matrix
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    // checks collision
    const playerRotate = (stage, dir) => {
        // create player copy so state isnt changed
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const position = clonedPlayer.position.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, {x: 0, y : 0})){
            clonedPlayer.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            // if this is true its an illegal rotate, rotate back to last
            if(offset > clonedPlayer.tetromino[0].length){
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.position.x = position;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

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

    return [player, updatePlayerPosition, resetPlayer, playerRotate];
}