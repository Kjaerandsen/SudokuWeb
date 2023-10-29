'use client'
import { useState } from 'react';

export default function SudokuBoard() {
    const [SelectedId, SetSelectedId] = useState(0);
    
    /*
        const styles = {
            backgroundColor: "purple",
            text-color: "red"
        }
        or
    */

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
    function setStartingPosition(values) {
        let boardData = []
        values.forEach(value => {
            boardData.push({"val":value,"isSelected":false,"isValid":true})
        })
        setData(boardData)
    }

    // Function sets the value of a tile in the game
    // Takes a value to update the selected tile to
    function setValue(value) {
        console.log("setting value: ", value)
        // Validate the value (10 > x > 0)
        if (value > 0 && value < 10) {
        // Check if a tile is selected and valid (81 > x >= 0)
        if (SelectedId >= 0 && SelectedId < 81) {
        // Get the board state
        let board = data
        // Update the value
        board[SelectedId].val = value
        board[SelectedId].isMarked = true
        // Validate and update isValid
        board = validateBoard(board)
        // Set the board state
        setData([...board])
        }
        }
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
        2,5,1,7,4,3,9,6,8,
        3,9,4,6,2,8,5,1,7,
        6,8,7,9,5,1,3,4,2,
        8,3,6,2,7,4,1,5,9,
        7,1,5,3,9,6,8,2,4,
        9,4,2,8,1,5,6,7,3,
        5,7,9,1,8,2,4,3,6,
        4,2,3,5,6,9,7,8,1,
        1,6,8,4,3,7,2,9,5
    ])

    /*
        id, is automatic, not important
        value is important
        isSelected is important
        Need to be able to mark all interacting tiles, both in the case of them as impacting (blue?)
        and in the case of invalid marking (red?)
        The invalid tile should have another text color or border to show which value is incorrectly marked
    */
    
    /*
    function OnItemClick(i){
        //alert(i)
        console.log(i)
        document.getElementById(SelectedId).classList.remove("selected")
        console.log("removed ", SelectedId )
        console.log(document.getElementById(SelectedId))
        document.getElementById(i).classList.add("selected")
        console.log(document.getElementById(i))
        console.log("Should have been selected now")
        SetSelectedId(i)
        //console.log("New id: ", SelectedId)
    }
    */

    // <div style={data.val > 0 ? {aspectRatio:1/1}: {visibility:'hidden', aspectRatio:1/1}}
    // {data.isSelected ? {backgroundColor: 'purple'} : 
    // data.isMarked && data.isValid ? {backgroundColor: 'blue'} : data.isMarked && !data.isValid ? {backgroundColor: 'red'} : {}} 
    // Displays a single row of the sudoku board
    function SudokuRow(props) {
        return (
            <tr>
                {props.items.map((data, x) => (
                    <td className="align-items-center justify-content-center w-7 h-7 border border-gray-600" style={!data.isValid && data.isMarked && data.isSelected ? {backgroundColor: 'rgb(112,53,49)'} : data.isSelected ? {backgroundColor: 'purple'} : 
                    {}} 
                    id={x + props.indexStart} key={x} onClick={() => updateSelection(x+props.indexStart)}>
                        <div style={data.val > 0 ? {}: {visibility:'hidden'}} className={data.isValid ? "align-items-center justify-content-center" : "text-red-800 align-items-center justify-content-center"}>
                            {data.val}</div>
                    </td>
                ))}
            </tr>
        )
    }

    return (
        <>
        <div className="col-span-2 md:col-span-1 md:border-r-2 md:border-fuchsia-900">
            <h1>Sudoku</h1>
            <table className="table-fixed border-2 border-black m-auto">
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
        <div className="col-span-2 md:col-span-1 border-end border-start border-secondary">
            <button type="button" className="bg-sky-950 text-gray-300 pl-2 pr-2 m-2 rounded-md w-56" onClick={() => setStartingPosition([
                0,0,0,0,0,3,9,6,8,
                0,0,4,6,2,0,5,1,0,
                0,8,7,0,5,0,0,0,2,
                0,0,0,2,7,0,0,0,9,
                7,1,0,0,0,0,0,2,4,
                9,0,0,0,1,5,0,0,0,
                5,0,0,0,8,0,4,3,0,
                0,2,3,0,6,9,7,0,0,
                1,6,8,4,0,0,0,0,0
            ])}> 
            Set up board 
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
        </div>
        </>
    )
}



/*
{sudokuRow(data.slice(9, 18))}
                {sudokuRow(data.slice(18, 27))}
                {sudokuRow(data.slice(27, 36))}
                {sudokuRow(data.slice(36, 45))}
                {sudokuRow(data.slice(45, 54))}
                {sudokuRow(data.slice(54, 63))}
                {sudokuRow(data.slice(63, 72))}
                {sudokuRow(data.slice(72, 81))}
*/

/*
{data.map((data, x) => (
            //<div key={x}>{data}</div>
            sudokuRow(data=x)
        ))}
*/