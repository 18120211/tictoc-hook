import Board from './Board'
import React, { useState } from "react";

function Game() {
    const [mHistory, setHistory] = useState([{
        squares: Array(25).fill(null),
        // squares: Array(9).fill(null),
        posX: null,
        posY: null
    }])
    const [mStepNumber, setStepNumber] = useState(0)
    const [mXIsNext, setXIsNext] = useState(true)
    const [mIsReverse, setIsReverse] = useState(false)
    const [mLength, setLength] = useState(5)

    function calculateWinner1(squares, value) {
        if (value == null) {
            return null
        }
        console.log(value)
        for (let i = 0; i < mLength; i++) {
            for (let j = 0; j < mLength; j++) {
                let curVal = squares[i * mLength + j]
                if ((i + 4) < mLength) {
                    if (curVal === squares[(i + 1) * mLength + j] && curVal === squares[(i + 2) * mLength + j]
                        && curVal === squares[(i + 3) * mLength + j] && curVal === squares[(i + 4) * mLength + j]
                        && curVal === value) {
                        console.log('1')
                        const res = {
                            winner: value,
                            winStreak: [i * mLength + j,
                            (i + 1) * mLength + j,
                            (i + 2) * mLength + j,
                            (i + 3) * mLength + j,
                            (i + 4) * mLength + j
                            ]
                        }
                        return res
                    }
                }

                if ((i + 4 < mLength) && (j + 4 < mLength)) {
                    if (curVal === squares[(i + 1) * mLength + j + 1] && curVal === squares[(i + 2) * mLength + j + 2]
                        && curVal === squares[(i + 3) * mLength + j + 3] && curVal === squares[(i + 4) * mLength + j + 4]
                        && curVal === value) {
                        console.log('2')
                        const res = {
                            winner: value,
                            winStreak: [i * mLength + j,
                            (i + 1) * mLength + j + 1,
                            (i + 2) * mLength + j + 2,
                            (i + 3) * mLength + j + 3,
                            (i + 4) * mLength + j + 4
                            ]
                        }
                        return res
                    }
                }

                if ((i - 4 >= 0) && (j + 4 < mLength)) {
                    if (curVal === squares[(i - 1) * mLength + j + 1] && curVal === squares[(i - 2) * mLength + j + 2]
                        && curVal === squares[(i - 3) * mLength + j + 3] && curVal === squares[(i - 4) * mLength + j + 4]
                        && curVal === value) {
                        console.log('3')
                        const res = {
                            winner: value,
                            winStreak: [i * mLength + j,
                            (i - 1) * mLength + j + 1,
                            (i - 2) * mLength + j + 2,
                            (i - 3) * mLength + j + 3,
                            (i - 4) * mLength + j + 4]
                        }
                        return res
                    }
                }

                if ((j + 4) < mLength) {
                    if (curVal === squares[i * mLength + j + 1] && curVal === squares[i * mLength + j + 2]
                        && curVal === squares[i * mLength + j + 3] && curVal === squares[i * mLength + j + 4]
                        && curVal === value) {
                        console.log('4')
                        const res = {
                            winner: value,
                            winStreak: [i * mLength + j,
                            i * mLength + j + 1,
                            i * mLength + j + 2,
                            i * mLength + j + 3,
                            i * mLength + j + 4]
                        }
                        return res
                    }
                }
            }
        }
        return null
    }

    function jumpTo(stepNumber) {
        setStepNumber(stepNumber)
        setXIsNext((stepNumber % 2) === 0)
    }
    function handleClick(i) {
        const history = mHistory.slice(0, mStepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        // squares[i] = mXIsNext ? 'X' : 'O'
        console.log(squares)
        if (calculateWinner1(squares, squares[i]) || squares[i]) {
            return
        }
        // if (calculateWinner(squares) || squares[i]) {
        //   return
        // }
        squares[i] = mXIsNext ? 'X' : 'O'
        setHistory(history.concat([{
            squares: squares,
            posX: Math.floor(i / 3),
            posY: i % 3,
        }]))
        setStepNumber(history.length)
        setXIsNext(!mXIsNext)
    }
    function sortMoves() {
        setIsReverse(!mIsReverse)
    }
    function handleChangeWidth(e) {
        const val = Number(e.target.value);

        setLength(val);
        setHistory([{
            squares: Array(mLength * mLength).fill(null),
            posX: null,
            posY: null
        }]);
        setStepNumber(0);
        setXIsNext(true);
    }
    const history = mHistory
    const current = history[mStepNumber]
    // const resultCaculateWinner = calculateWinner(current.squares);
    const resultCaculateWinner = calculateWinner1(current.squares, !mXIsNext ? 'X' : 'O');
    let winner = null;
    let winStreak = [];
    if (resultCaculateWinner) {
        winner = resultCaculateWinner.winner
        winStreak = resultCaculateWinner.winStreak
    }

    const isReverse = mIsReverse

    const bold = {
        fontWeight: 'bold'
    }

    const normal = {
        fontWeight: 'normal'
    }

    const moves = history.map((step, move) => {
        const posX = mHistory[move].posX;
        const posY = mHistory[move].posY;
        const key = `${posX}, ${posY}`
        const desc = move ? 'Go to move #' + move + `(${posX}, ${posY})` : 'Go to game start';
        return (
            <li key={key}>
                <button onClick={() => jumpTo(move)} style={mStepNumber === move ? bold : normal}>{desc}</button>
            </li>
        )
    })
    let status;
    if (mStepNumber === mLength * mLength && !resultCaculateWinner) {
        status = 'Draw match'
    }
    else if (resultCaculateWinner) {
        status = 'The winner is: ' + winner;
    }
    else {
        status = 'Next player: ' + (mXIsNext ? 'X' : 'O')
    }
    return (
        <div className="game">
            <div className="game-config">
                <span className="fixed-size">Chiều rộng:</span><input type="number" placeholder="Chiều rộng" value={mLength} onChange={handleChangeWidth} />
                <br />
            </div>
            <br />
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} winStreak={winStreak} length={mLength} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => sortMoves()}>Sort</button>
                <ol>{!isReverse ? moves : moves.reverse()}</ol>
            </div>
        </div>
    );
}

export default Game