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
            console.log(board[i].val, solution[i])
            if (board[i].val == solution[i]) {
                // Set the tile to valid
                board[i].isValid = true
                correct++
            } else {
                // Else set the tile to invalid
                board[i].isValid = false
            }
        }

        if (correct == 81){
            window.alert("Congratulations, you solved the puzzle!")
        }

        return board
    }

    // Data for the board state
    const [data, setData] = useState([
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
        {"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},{"val":0,"isValid":true},
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

    // Displays a single row of the sudoku board
    function SudokuRow(props) {
        return (
            <tr>
                {props.items.map((data, x) => (
                    <td className="align-items-center justify-content-center border" style={data.isSelected ? {backgroundColor: 'purple'} : 
                    data.isMarked && data.isValid ? {backgroundColor: 'blue'} : data.isMarked && !data.isValid ? {backgroundColor: 'red'} : {}} 
                    id={x + props.indexStart} key={x} onClick={() => updateSelection(x+props.indexStart)}>
                        <div style={data.val > 0 ? {aspectRatio:1/1}: {visibility:'hidden', aspectRatio:1/1}} className={data.isValid ? "d-flex align-items-center justify-content-center" : "text-danger d-flex align-items-center justify-content-center"}>
                            {data.val}</div>
                    </td>
                ))}
            </tr>
        )
    }

    return (
        <>
        <div className="col-12 col-md-6 border-end border-start border-secondary">
            <h1>Sudoku</h1>
            <table className="table table-bordered bg-primary" style={{border:'2px solid black'}}>
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
        <div className="col-12 col-md-6 border-end border-start border-secondary">
            <button type="button" className="btn btn-primary" onClick={() => setStartingPosition([
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

            <ul>
                <button type="button" className="btn btn-primary" onClick={() => setValue(1)}><li>1</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(2)}><li>2</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(3)}><li>3</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(4)}><li>4</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(5)}><li>5</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(6)}><li>6</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(7)}><li>7</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(8)}><li>8</li></button>
                <button type="button" className="btn btn-primary" onClick={() => setValue(9)}><li>9</li></button>
            </ul>
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