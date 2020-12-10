export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    // creates a multidimensional array that represents the grid
    // stage height is empty
    Array.from(Array(STAGE_HEIGHT), () => 
        // for each row, a new array is created with the stage width, and then thats filled with another array
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )


export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    // loop though tetromino
    for(let y = 0; y < player.tetromino.length; y += 1){
        for (let x = 0; x < player.tetromino[y].length; x += 1){
            //  check that you're on a cell
            if (player.tetromino[y][x] !== 0){
                if(
                // check movement is inside the grid height (y)
                // dont go through the bottom of the play area
                !stage[y + player.position.y + moveY] ||
                // check movement is inside grid width (x)
                !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
                // check cell is not set to clear
                stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }

}