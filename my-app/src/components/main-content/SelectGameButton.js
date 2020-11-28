import React from 'react';
import './SelectGameStyle.scss';

const SelectGameButton = (props) => {
    return(
        <div className="button-container">
            <button className="button">
                {props.children}
            </button>
            
        </div>
    ) 
}

export default SelectGameButton;