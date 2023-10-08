export default function SudokuBoard() {
    const data = [0,1,2,3,4,5,6,7,8,
                  9,0,1,2,3,4,5,6,7,
                  8,9,0,0,1,2,3,4,5,
                  6,7,8,9,0,1,2,3,4,
                  5,6,7,8,9,0,0,1,2,
                  3,4,5,6,7,8,9,0,1,
                  2,3,4,5,6,7,8,9,0,
                  0,1,2,3,4,5,6,7,8,
                  9,0,1,2,3,4,5,6,7]
    return (
    <div className="container border border-2 border-black p-0">
        {sudokuRow(data.slice(0,9))}
        {sudokuRow(data.slice(9,18))}
        {sudokuRow(data.slice(18,27))}
        {sudokuRow(data.slice(27,36))}
        {sudokuRow(data.slice(36,45))}
        {sudokuRow(data.slice(45,54))}
        {sudokuRow(data.slice(54,63))}
        {sudokuRow(data.slice(63,72))}
        {sudokuRow(data.slice(72,81))}  
    </div>
    )
}

/*
{data.map((data, x) => (
            //<div key={x}>{data}</div>
            sudokuRow(data=x)
        ))}
*/
function sudokuRow(props){
    //console.log(props)
    return (
        <div className="row container border-bottom p-0 m-auto" style={{aspectRatio: 9/1}}>
            {props.map((data, x) => (
                <div className="col d-flex align-items-center justify-content-center border" key={x}>{data}</div>
            ))}
        </div>
    )
}

/*
function sudokuTile(props){
    return (
        <div>Tile Here</div>
    )
}
*/