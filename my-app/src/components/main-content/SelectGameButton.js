import React from 'react';
import './SelectGameStyle.scss';

const SelectGameButton = (props) => {
    return(
        <div className="btn-box">
            <button className="btn" onClick={props.clickHandler}>
            {/* <button className={"btn-" + props.theme}> */}
                {props.children}
            </button>
            
        </div>
    ) 
}

export default SelectGameButton;