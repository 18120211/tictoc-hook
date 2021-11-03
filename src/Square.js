function Square({value, onClick, isWinSquare}) {
    return (<button className="square" style={isWinSquare ? { color: 'red' } : {}} onClick={onClick}>
        {value}
    </button>)
}


// function Square(props) {
//     return (<button className="square" style={props.isWinSquare ? { color: 'red' } : {}} onClick={() => props.onClick()}>
//         {props.value}
//     </button>)
// }

export default Square;