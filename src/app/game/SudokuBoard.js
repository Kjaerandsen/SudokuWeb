'use client'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef} from 'react';
import { useSearchParams } from 'next/navigation';

export default function SudokuBoard() {
    const [SelectedId, SetSelectedId] = useState(0);
    const initialLoad = useRef(true);
    const [MarkMode, ToggleMarkMode] = useState(false);
    const searchParams = useSearchParams()
    const [PuzzleId, SetPuzzleId] = useState(1) 

    useEffect(() => {
      if (initialLoad.current) {
        
        let val = searchParams.get('puzzle')
        // Set the board state
        if(puzzles[val]) {
            //console.log(puzzles[val])
            console.log("Puzzle found, setting state.")
            //console.log(tempData)
            // Set the board state and solved board state variables
            setStartingPosition(puzzles[val]["board"],0)
            setSolvedBoard(puzzles[val]["solved"])
            SetPuzzleId(val)
        } else {
            // If the puzzle is not found, default to the first puzzle
            val = 1
            console.log("Puzzle found, setting state.")
            //console.log(tempData)
            // Set the board state and solved board state variables
            setStartingPosition(puzzles[val]["board"],0)
            setSolvedBoard(puzzles[val]["solved"])
        }
        // Set up the board
        initialLoad.current = false;
      }
    }, []);

    // Takes an id, updates the selection and marks the selected tile
    function updateSelection(id) {
        console.log("Updating id to: ", id)
        // Get the previous selection
        let prev = SelectedId
        // Remove the selection from the board
        let board = data
        board[prev].isSelected = false
        // Update the new selection
        board[id].isSelected = true
        // Set the values
        SetSelectedId(id)
        setData([...board])
    }

    // Sets up a new board with values from a values integer array
    function setStartingPosition(values, id) {
        if (id == 0) {
            let boardData = []
            values.forEach(value => {
                boardData.push({"val":value,"isSelected":false,"isValid":true})
            })
            setData(boardData)
        } else {
            values = puzzles[id]["board"]
            let boardData = []
            values.forEach(value => {
            boardData.push({"val":value,"isSelected":false,"isValid":true})
            })
            setData(boardData)
        }
    }

    // Function sets the value of a tile in the game
    // Takes a value to update the selected tile to
    function setValue(value) {
        // Get the board state
        let board = data

        // Validate the value (10 > x > 0)
        if (value >= 1 && value < 10) {
        console.log("setting value: ", value)
        // Check if a tile is selected and valid (81 > x >= 0)
        if (SelectedId >= 0 && SelectedId < 81) {
        // Add value if markmode is false
        if (!MarkMode) {
            // Update the value
            board[SelectedId].val = value
            board[SelectedId].isMarked = true
            delete board[SelectedId].markings
            // Validate and update isValid
            board = validateBoard(board)

        // Set marking if markmode is true
        } else {
            console.log("Marking")
            // Do not add a marking if the tile is already occupied
            if (board[SelectedId].val == 0) {
                // Marks variable
                var Marks = []
                // If markings for the tile exists get them
                if (("markings" in board[SelectedId])) {
                    //console.log(board[SelectedId])
                    Marks = board[SelectedId].markings
                    // Get the marking values if there are any
                    console.log("Found markings: ", Marks)
                    // Check if the value already exists
                    let loc = Marks.indexOf(value)
                    if (loc >= 0){
                        // Remove the value if it is present
                        console.log("Deleting: ", value)
                        Marks.splice(loc, 1)
                    } else {
                        Marks.push(value) // Add the value if not
                        console.log("Adding marks to existing", Marks, value)
                    }
                } else { // If no markings exist, add the value
                    Marks.push(value)
                    console.log("Adding marks", Marks, value)
                }
                console.log("Marks are now:", Marks)
                //Marks = Marks.sort((a, b) => a - b)
                board[SelectedId].markings=Marks
            }
        }}

        // Remove the markings and value if the input is 0
        } else {
            // Set the value to true if removing the value to remove the red background marking
            if (value == 0){
                board[SelectedId].val = value
                board[SelectedId].isValid = true
                delete board[SelectedId].markings
            }
        }

        // Set the board state
        setData([...board])
    }

    // Takes a board, each value validates against the solution
    function validateBoard(board) {
        let solution = solvedBoard
        let correct = 0
        // Go through each value
        for (let i = 0; i < 81; i++) {
            // If the value is equal to the solution value
            //console.log(board[i].val, solution[i])
            if (board[i].val == solution[i]) {
                // Set the tile to valid
                board[i].isValid = true
                correct++
            } else {
                // Else set the tile to invalid
                board[i].isValid = false
            }
        }

        console.log(board)

        if (correct == 81){
            window.alert("Congratulations, you solved the puzzle!")
        }

        return board
    }

    // Function which automatically marks the possibilites for each tile in the grid
    function AutoMark(){
        // Get the board state
        let board = data
        let rows = []
        let cols = []
        let grids = []

        // Get arrays of the lines and grids

        // Get the rows
        // Goes through the array dividing it into a 9x9 array per row
        for (let i = 0; i < 9; i++){
            rows.push([])
            for (let j = 0; j < 9; j++){
                rows[i][j] = ({"val":board[i*9+j].val, "id":i*9+j})
            }
        }

        // Get the columns
        // Goes through the array dividing it into a 9x9 array per column
        for (let i = 0; i < 9; i++){
            cols.push([])
            for (let j = 0; j < 9; j++){
                cols[i][j] = ({"val":board[j*9+i].val, "id":j*9+i})
            }
        }

        // Get the grids
        // Goes through the array dividing it into a 9x9 array per grid
        // With four counters: 
        // i is the row offset (27*i)
        // l is the column offset (3*i)
        // j is the grid row offset (9*j)
        // k is the grid column offset (3*k)
        for (let i = 0; i < 3; i++){
            for (let l = 0; l < 3; l++){
                grids.push([])
                for (let j = 0; j < 3; j++){
                    for (let k = 0; k < 3; k++){
                        grids[i*3+l][j*3+k] = ({"val":board[i*27+l*3+j*9+k].val, "id":i*27+l*3+j*9+k})
                    }
                }
            }
        }

        let marked = new Map()
        // Go through each item, generate markings
        for (let i = 0; i < 9; i++){
            rows[i] = generateMarkings(rows[i])
            cols[i] = generateMarkings(cols[i])
            grids[i] = generateMarkings(grids[i])

            // This section fills the marked map with the generated markings
            // If markings already exist in the map then the values are cross-referenced
            // keeping only values which are common accross the three arrays

            // Go through the arrays and combine the markings
            for (let j = 0; j < 9; j++){
                // Set the markings if the value is not 0
                if (marked.has(rows[i][j].id)){
                    let oldMarks = marked.get(rows[i][j].id)
                    // Update the markings with the possibilities present in both
                    // If a marking is not present in one, it is not a possibility
                    marked.set(rows[i][j].id, oldMarks.filter(item => rows[i][j].markings.includes(item)))
                } else {
                    // If not add the markings
                    if (rows[i][j].val == 0) {
                        marked.set(rows[i][j].id, rows[i][j].markings)
                    }
                }

                // Set the markings for the columns
                if (marked.has(cols[i][j].id)){
                    let oldMarks = marked.get(cols[i][j].id)
                    // Update the markings with the possibilities present in both
                    // If a marking is not present in one, it is not a possibility
                    marked.set(cols[i][j].id, oldMarks.filter(item => cols[i][j].markings.includes(item)))
                } else {
                    // If not add the markings
                    if (cols[i][j].val == 0) {
                        marked.set(cols[i][j].id, cols[i][j].markings)
                    }
                }

                // Set the markings for the grids
                if (marked.has(grids[i][j].id)){
                    let oldMarks = marked.get(grids[i][j].id)
                    // Update the markings with the possibilities present in both
                    // If a marking is not present in one, it is not a possibility
                    marked.set(grids[i][j].id, oldMarks.filter(item => grids[i][j].markings.includes(item)))
                } else {
                    // If not add the markings
                    if (grids[i][j].val == 0) {
                        marked.set(grids[i][j].id, grids[i][j].markings)
                    }
                }
            }
        }

        // Combine the result with the board
        for (let i = 0; i < 81; i++){
            if (marked.get(i) != undefined) {
                board[i].markings = marked.get(i);
            }
        }

        // Update the board to show the markings
        setData([...board])
    }

    // Takes a list of values and returns markings based on what is occupied
    function generateMarkings(items){
        let occupied = []
        let possible = [1,2,3,4,5,6,7,8,9]

        for (let i = 0; i < 9; i++) {
            if (items[i].val != 0){
                occupied.push(items[i].val)
            }
        }

        // Creates a markings array which only keeps values in possible which are not occupied
        let markings = possible.filter(item => !occupied.includes(item))

        for (let i = 0; i < 9; i++) {
            if (items[i].val == 0){
                items[i].markings = markings
            }
        }

        return items
    }
    

    /*
        id, is automatic, not important
        value is important
        isSelected is important
        Need to be able to mark all interacting tiles, both in the case of them as impacting (blue?)
        and in the case of invalid marking (red?)
        The invalid tile should have another text color or border to show which value is incorrectly marked
    */

    // Displays a single row of the sudoku board
    function SudokuRow(props) {
        return (
            <tr>
                {props.items.map((data, x) => (
                    <td className="align-items-center justify-content-center w-7 h-7 border border-gray-400" style={!data.isValid && data.isMarked && data.isSelected ? {backgroundColor: 'rgb(112,53,49)'} : data.isSelected ? {backgroundColor: 'purple'} : 
                    {}} 
                    id={x + props.indexStart} key={x} onClick={() => updateSelection(x+props.indexStart)}>
                        {data.val == 0 ? <Marking marks = {data.markings}/> : <Tile data={data}/>}
                    </td>
                ))}
            </tr>
        )
    }

    // Example way of showing markings for each tile
    function Marking(props) {
        //console.log(props.marks)
        if (props.marks !== undefined && props.marks.length > 0) {
        return (
        <div className='grid grid-cols-3' style={{fontSize: "0.3rem"}}>
            {(props.marks.includes(1)) ? <div>1</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(2)) ? <div>2</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(3)) ? <div>3</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(4)) ? <div>4</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(5)) ? <div>5</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(6)) ? <div>6</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(7)) ? <div>7</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(8)) ? <div>8</div> : <div style={{visibility:'hidden'}}>0</div>}
            {(props.marks.includes(9)) ? <div>9</div> : <div style={{visibility:'hidden'}}>0</div>}
        </div>
        )
        } else {
            return(<></>)
        }
    }

    // Show a tile without markings
    function Tile(props) {
        return (
            <div className={props.data.isValid ? "align-items-center justify-content-center text-bold text-gray-300" : "text-red-800 text-bold align-items-center justify-content-center"}>
                {props.data.val}
            </div>
        )
    }

    // Data for the board state
    const [data, setData] = useState([
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
        {"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},{"val":0,"isValid":true,"isMarked":false},
    ]) 

    // Data for the solved board state
    const [solvedBoard, setSolvedBoard] = useState([
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0
    ])

    const puzzles = {"1":{"board":[
        0,0,0,0,0,3,9,6,8,
        0,0,4,6,2,0,5,1,0,
        0,8,7,0,5,0,0,0,2,
        0,0,0,2,7,0,0,0,9,
        7,1,0,0,0,0,0,2,4,
        9,0,0,0,1,5,0,0,0,
        5,0,0,0,8,0,4,3,0,
        0,2,3,0,6,9,7,0,0,
        1,6,8,4,0,0,0,0,0
    ], "solved":[
        2,5,1,7,4,3,9,6,8,
        3,9,4,6,2,8,5,1,7,
        6,8,7,9,5,1,3,4,2,
        8,3,6,2,7,4,1,5,9,
        7,1,5,3,9,6,8,2,4,
        9,4,2,8,1,5,6,7,3,
        5,7,9,1,8,2,4,3,6,
        4,2,3,5,6,9,7,8,1,
        1,6,8,4,3,7,2,9,5
    ]},
    1:{"board":[
        0,0,0,0,0,3,9,6,8,
        0,0,4,6,2,0,5,1,0,
        0,8,7,0,5,0,0,0,2,
        0,0,0,2,7,0,0,0,9,
        7,1,0,0,0,0,0,2,4,
        9,0,0,0,1,5,0,0,0,
        5,0,0,0,8,0,4,3,0,
        0,2,3,0,6,9,7,0,0,
        1,6,8,4,0,0,0,0,0
    ], "solved":[
        2,5,1,7,4,3,9,6,8,
        3,9,4,6,2,8,5,1,7,
        6,8,7,9,5,1,3,4,2,
        8,3,6,2,7,4,1,5,9,
        7,1,5,3,9,6,8,2,4,
        9,4,2,8,1,5,6,7,3,
        5,7,9,1,8,2,4,3,6,
        4,2,3,5,6,9,7,8,1,
        1,6,8,4,3,7,2,9,5
    ]},
    2:{"board":[
        0,0,0,0,0,3,9,6,8,
        0,0,4,6,2,0,5,1,0,
        0,8,7,0,5,0,0,0,2,
        0,0,0,2,7,0,0,0,9,
        7,1,0,0,0,0,0,2,4,
        9,0,0,0,1,5,0,0,0,
        5,0,0,0,8,0,4,3,0,
        0,2,3,0,6,9,7,0,0,
        1,6,8,4,0,0,0,0,0
    ], "solved":[
        2,5,1,7,4,3,9,6,8,
        3,9,4,6,2,8,5,1,7,
        6,8,7,9,5,1,3,4,2,
        8,3,6,2,7,4,1,5,9,
        7,1,5,3,9,6,8,2,4,
        9,4,2,8,1,5,6,7,3,
        5,7,9,1,8,2,4,3,6,
        4,2,3,5,6,9,7,8,1,
        1,6,8,4,3,7,2,9,5
    ]}
    }

    return (
        <>
        <div className="col-span-2 md:col-span-1 md:border-r-2 md:border-fuchsia-900">
            <h1>Sudoku</h1>
            <table className="table-fixed border-2 m-auto mb-1" style={{borderColor: 'rgb(112, 48, 97)'}}>
                <tbody>
                    <SudokuRow items={data.slice(0, 9)} indexStart = {0} />
                    <SudokuRow items={data.slice(9, 18)} indexStart = {9} />
                    <SudokuRow items={data.slice(18, 27)} indexStart = {18} />
                    <SudokuRow items={data.slice(27, 36)} indexStart = {27} />
                    <SudokuRow items={data.slice(36, 45)} indexStart = {36} />
                    <SudokuRow items={data.slice(45, 54)} indexStart = {45} />
                    <SudokuRow items={data.slice(54, 63)} indexStart = {54} />
                    <SudokuRow items={data.slice(63, 72)} indexStart = {63} />
                    <SudokuRow items={data.slice(72, 81)} indexStart = {72} />
                </tbody>
            </table>
        </div>
        <div className="col-span-2 md:col-span-1 border-end border-start border-gray-400">
            <button type="button" className="bg-sky-950 text-gray-300 pl-2 pr-2 m-2 rounded-md w-56" onClick={() => setStartingPosition([],PuzzleId)}> 
            Reset the board 
            </button>

            <div className="m-auto">
                <div className='grid grid-cols-3 m-auto bg-sky-950 rounded-md w-36'>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-r border-b border-gray-300" onClick={() => setValue(1)}>1</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-x border-b border-gray-300" onClick={() => setValue(2)}>2</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-l border-b border-gray-300" onClick={() => setValue(3)}>3</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-y border-r border-gray-300" onClick={() => setValue(4)}>4</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border border-gray-300" onClick={() => setValue(5)}>5</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-y border-l border-gray-300" onClick={() => setValue(6)}>6</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-r border-t border-gray-300" onClick={() => setValue(7)}>7</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-t border-x border-gray-300" onClick={() => setValue(8)}>8</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-l border-t border-gray-300" onClick={() => setValue(9)}>9</button>
                </div>
            </div>

            <button type="button" className="bg-sky-950 text-gray-300 pl-2 pr-2 m-2 rounded-md w-56" onClick={() => setValue(0)}> 
            Clear tile
            </button>

            <br/>

            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={MarkMode} className="cursor-pointer" onChange={() => ToggleMarkMode(!MarkMode)}/>
                <span className="ml-3 text-gray-300">Mark mode</span>
            </label>
            
            <br/>
            <button type="button" className="bg-sky-950 text-gray-300 pl-2 pr-2 m-2 rounded-md w-56" onClick={() => AutoMark()}> 
            Automatically mark
            </button>
        </div>
        </>

    )
    
}