// @ts-nocheck
export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

var concat = function(a, b, c, board){
    // board = board.map(function name(value) {
    //     return (value === null ? value = "null" : value)
    // })

    var result = board[a] + board[b] + board[c] 
    
    switch (result){
        case "xxnull":
            return ["x", c]
            break;
            
        case "xnullx":
            return ["x", b]
            break;
            
        case "nullxx":
            return ["x", a]
            break;
            
        case "oonull":
            return ["o", c]
            break;
            
        case "onullo":
            return ["o", b]
            break;
            
        case "nulloo":
            return ["o", a]
            break;

        default:
            return ["k", a]
            break;
    }
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
    //Максимум не включается, минимум включается
  }

export function getNextStep(board){
    //проверка комбинаций из двух "оо"
    for (var i = 0; i < 3; i++){
        var result = concat(i, i + 3, i + 6, board)
        
        if (typeof(result) === "object" && result[0] === "o"){
            return result[1]
        }
    }
    
    for (i = 0; i <= 6; i +=3){
        result = concat(i, i + 1, i + 2, board)
        
        if (typeof(result) === "object" && result[0] === "o"){
            return result[1]
        }
    }
    
    result = concat(0, 4, 8, board)
    if (typeof(result) === "object" && result[0] === "o"){
        return result[1]
    }
    
    result = concat(2, 4, 6, board)
    if (typeof(result) === "object" && result[0] === "o"){
        return result[1]
    }	
    
    //проверка комбинаций из двух "xx"
    for (i = 0; i < 3; i++){
        result = concat(i, i + 3, i + 6, board)
        
        if (typeof(result) === "object" && result[0] === "x"){
            return result[1]
        }
    }
    
    for (i = 0; i <= 6; i +=3){
        result = concat(i, i + 1, i + 2, board)
        
        if (typeof(result) === "object" && result[0] === "x"){
            return result[1]
        }
    }
    
    result = concat(0, 4, 8, board)
    if (typeof(result) === "object" && result[0] === "x"){
        return result[1]
    }
    
    result = concat(2, 4, 6, board)
    if (typeof(result) === "object" && result[0] === "x"){
        return result[1]
    }

    //рандомно ставим о
    let index = getRandomInt(0, 9);
    while (board[index]) {
        index = getRandomInt(0, 9);
      }
    return index
}