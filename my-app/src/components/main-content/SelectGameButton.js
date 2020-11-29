import React from 'react';
import './SelectGameStyle.scss';

const SelectGameButton = (props) => {
    return(
        <div className="button-container">
            <button className="btn btn-color btn-animated">
                {props.children}
            </button>
            
        </div>
    ) 
}

export default SelectGameButton;