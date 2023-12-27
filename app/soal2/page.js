"use client";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function Soal2() {
    const [opened, setOpened] = useState([]);
    const [active, setActive] = useState(Array(20).fill(false));
    const [disableCards, setDisableCards] = useState(false);
    const [completed, setCompleted] = useState(false);
    const timeout = useRef(null);

    let grid = [
        1,4,6,7,8,
        9,5,6,2,1,
        7,8,4,2,3,
        5,0,9,3,0
    ];

    const enable = () => {
        setDisableCards(false);
    }

    const disable = () => {
        setDisableCards(true);
    }

    const evaluate = () => {
        const [first, second] = opened;
        
        if (first[0] === second[0]) {
            setOpened([]);
            enable();
            // check if all the cards are opened
            let checker = active.every(x => x === true);
            if (checker) {
                setCompleted(true);
            }
            return;
        }

        timeout.current = setTimeout(() => {
            let temp = [...active];
            temp[opened[0][1]] = temp[opened[1][1]] = false;
            setActive(temp);
            setOpened([]);
            enable();
          }, 200);
    }

    const handleClicked = (val, index, e) => {
        e.preventDefault();
        if (!disableCards && !active[index]) {
            let temp = [...active];
            temp[index] = true;
            setActive(temp);
            if (opened.length === 1) {
                disable();
                setOpened((prev) => [...prev, [val, index]]);
            } 
            else {
                clearTimeout(timeout.current);
                setOpened([[val, index]]);
            }
        }
        
    }

    const resetGame = () => {
        setOpened([]);
        let temp = Array(20).fill(false);
        setActive(temp);
        setCompleted(false);
    }

    useEffect(() => {
        let timeout = null;
        if (opened.length === 2) {
          timeout = setTimeout(evaluate, 300);
        }
        return () => {
          clearTimeout(timeout);
        };
      }, [opened]);

    return(
        <div className="p-20">
            <a
                href="/"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
                rel="noopener noreferrer"
                >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
                        &lt;-
                    </span>
                    Back
                </h2>
            </a>

            <div className="grid md:grid-cols-5 sm:grid-cols-3 gap-4 items-center justify-items-stretch ">
                {grid.map((val, index) => 
                    <div key={`val-${index}`} className="group h-32 w-auto" onClick={(e) => {handleClicked(val, index, e)}} >
                        <div className={`relative h-full w-full rounded-xl shadow-sm card ${active[index] ? 'card-flip' : ''}`}>
                            <div className="absolute inset-0 front">
                                <div className="card-box h-full w-full rounded-xl object-cover shadow-sm shadow-black/40"></div>
                            </div>
                            <div className="absolute inset-0 back">
                                <div className={`border-2 border-blue-500 flex min-h-full flex-col items-center justify-center card-box h-full w-full rounded-xl object-cover shadow-sm shadow-black/40`}>
                                {val}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {completed && 
                <div className="text-center justify-center">
                    <div className="font-bold text-xl mt-10 text-green-600">Completed</div>
                    <button type="button" onClick={resetGame} className="mt-5 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Reset</button>
                </div>
                
            }
        </div>
    )


}