function Square(props) {
    return (<button className="square" style={props.isWinSquare ? { color: 'red' } : {}} onClick={() => props.onClick()}>
        {props.value}
    </button>)
}

export default Square;