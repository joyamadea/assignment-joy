'use client';
import { useEffect, useState } from "react";

const Display = ({x,y,z}) => {
    return(
        <>
            <span>X = {x}</span>
            <span>Y = {y}</span>
            <span>Z = {z}</span>
        </>
    )
}
export default function Soal1() {
    // let x = 10;
    // let y = 20;
    // let z = 30;

    const [x, setX] = useState(10);
    const [y, setY] = useState(20);
    const [z, setZ] = useState(30);

    const swaping = (x,y,z) => {
        x = x + y + z; // 60
        y = x - (y + z); // 60 - 50 = 10
        z = x - (y + z); // 60 - (10+30) = 20 
        x = x - (y + z); // 60 - (10+20) = 30

        return {x,y,z};
    }

    swaping();
    
    useEffect(() => {
        let temp = swaping(x,y,z);
        console.log('ss', x);
        setX(temp.x);
        setY(temp.y);
        setZ(temp.z);
    }, [])
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
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
            
            <b>Before:</b><Display x={10} y={20} z={30}/> 
            <b>After:</b> <Display x={x} y={y} z={z}/>
        </div>
    )
}