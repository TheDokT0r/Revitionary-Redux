import React, { useState, useEffect } from 'react'

interface Props {
    choseCorrect: boolean;
    points: number;
    nextQuestionHandler: any
};

export default function PostQuestionPage({ choseCorrect, points, nextQuestionHandler }: Props) {
    const [header, setHeader] = useState('');
    const [subHeader, setSubHeader] = useState('');

    useEffect(() => {
        // Player chose correct
        if (choseCorrect) {
            setHeader('Correct');
            setSubHeader('You\'ve chose correctly!');
            return;
        }

        // Player ran out of time
        if (choseCorrect == undefined) {
            setHeader('Time\'s up');
            setSubHeader('You\'ve ran out of time!');
            return;
        }

        // Player chose wrong
        setHeader('Wrong');
        setSubHeader('You\'ve chose wrong!');
    }, [])

    return (
        <div>
            <h1>{header}</h1>
            <p>{subHeader}</p>

            <p>You've got {points} points</p>
            <button
                onClick={(e) => {
                    nextQuestionHandler(e, choseCorrect, points);
                }}
            >Next</button>
        </div>
    )
}