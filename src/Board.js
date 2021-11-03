import Square from './Square'

function Board(props) {
    function renderSquare(i, isWinSquare) {
        return <Square value={props.squares[i]} onClick={() => props.onClick(i)} isWinSquare={isWinSquare} />;
    }
    const winStreak = props.winStreak;
    let board = []
    for (let i = 0; i < props.length; i++) {
        let row = []
        for (let j = 0; j < props.length; j++) {
            if (winStreak.length !== 0) {
                if (winStreak.indexOf(i * props.length + j) !== -1) {
                    row.push(renderSquare(i * props.length + j, true))
                }
                else {
                    row.push(renderSquare(i * props.length + j, false))
                }
                continue;
            }
            row.push(renderSquare(i * props.length + j, false))
        }
        board.push(<div className="board-row">{row}</div>)
    }
    return (
        <div>
            {board}
        </div>
    )
}

export default Board