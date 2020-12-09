import { useState } from 'react';
import { randomTetromino } from '../Tetrominos';

export const usePLayer = () => {
    // create state, will return an array with 2 itmes 
    const [player, setPlayer] = useState({
        position: {x: 0, y: 0},
        tetromino: randomTetromino().shape,
        collided: false
    });

    return [player];
}