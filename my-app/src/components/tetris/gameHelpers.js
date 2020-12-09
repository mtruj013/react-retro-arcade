export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    // creates a multidimensional array that represents the grid
    // stage height is empty
    Array.from(Array(STAGE_HEIGHT), () => 
        // for each row, a new array is created with the stage width, and then thats filled with another array
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
