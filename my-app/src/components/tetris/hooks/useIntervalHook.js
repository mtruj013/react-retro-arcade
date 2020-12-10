import {useEffect, useRef } from 'react';

export function useInterval(callback, delay){
    
    const savedCallback = useRef();

    // remember last callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // set yp interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return() =>{
                clearInterval(id);
            }
        }
    }, [delay]);
}