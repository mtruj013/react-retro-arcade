import React from 'react';
import './SelectGameStyle.scss';

const SelectGameButton = (props) => {
    return(
        <div className="btn-box">
            <button className="btn btn-color btn-animated">
                {props.children}
            </button>
            
        </div>
    ) 
}

export default SelectGameButton;