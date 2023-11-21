'use client'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef} from 'react';
import { useSearchParams } from 'next/navigation';
import { autoMark, setValue } from './helper'
import { Marking, Tile } from './components';
import { zeroSolution, zeroState, puzzles } from './const';

export default function SudokuBoard() {
    const [SelectedId, SetSelectedId] = useState(0);
    const initialLoad = useRef(true);
    const [MarkMode, ToggleMarkMode] = useState(false);
    const searchParams = useSearchParams();
    const [PuzzleId, SetPuzzleId] = useState(1);

    // Based on https://devtrium.com/posts/how-keyboard-shortcut visited 20.11.2023
    // Handle keybindings
    const handleKeyboardInput = (event) => {
        switch (event.key) {
            case "1":
                setValueHelper(1);
            break;
            case "2":
                setValueHelper(2);
            break;
            case "3":
                setValueHelper(3);
            break;
            case "4":
                setValueHelper(4);
            break;
            case "5":
                setValueHelper(5);
            break;
            case "6":
                setValueHelper(6);
            break;
            case "7":
                setValueHelper(7);
            break;
            case "8":
                setValueHelper(8);
            break;
            case "9":
                setValueHelper(9);
            break;
            case "0":
                setValueHelper(0);
            break;
            case "Backspace":
                setValueHelper(0);
            break;
            case "Delete":
                setValueHelper(0);
            break;
            case "-":
                ToggleMarkMode(!MarkMode);
            break;
            case "+":
                ToggleMarkMode(!MarkMode);
            break;
        }
    }

    useEffect(() => {
      if (initialLoad.current) {
        
        let val = searchParams.get('puzzle');
        // Set the board state
        if(puzzles[val]) {
            //console.log(puzzles[val])
            console.log("Puzzle found, setting state.");
            //console.log(tempData)
            // Set the board state and solved board state variables
            setStartingPosition(puzzles[val]["board"],0);
            setSolvedBoard(puzzles[val]["solved"]);
            SetPuzzleId(val);
        } else {
            // If the puzzle is not found, default to the first puzzle
            val = 1;
            console.log("Puzzle found, setting state.");
            //console.log(tempData)
            // Set the board state and solved board state variables
            setStartingPosition(puzzles[val]["board"],0);
            setSolvedBoard(puzzles[val]["solved"]);
        }
        // Set up the board
        initialLoad.current = false;
      }

    
      // Based on https://devtrium.com/posts/how-keyboard-shortcut visited 20.11.2023
      // Listen for keyboard input, call the function above when an input is detected
      document.addEventListener('keydown', handleKeyboardInput);

      // Remove the event listener when it is no longer needed
      return () => {
        document.removeEventListener('keydown', handleKeyboardInput);
      }
    }, [handleKeyboardInput]);


    // Takes an id, updates the selection and marks the selected tile
    function updateSelection(id) {
        //console.log("Updating id to: ", id);
        // Get the previous selection
        let prev = SelectedId;
        // Remove the selection from the board
        let board = data;
        board[prev].isSelected = false;
        // Update the new selection
        board[id].isSelected = true;
        // Set the values
        SetSelectedId(id);
        setData([...board]);
    }

    // Sets up a new board with values from a values integer array
    function setStartingPosition(values, id) {
        if (id == 0) {
            let boardData = [];
            values.forEach(value => {
                boardData.push({"val":value,"isSelected":false,"isValid":true});
            })
            setData(boardData)
        } else {
            values = puzzles[id]["board"];
            let boardData = [];
            values.forEach(value => {
            boardData.push({"val":value,"isSelected":false,"isValid":true});
            })
            setData(boardData);
        }
    }

    // Function sets the value of a tile in the game
    // Takes a value to update the selected tile to
    function setValueHelper(value) {
        // Get the board state
        let board = data;

        board = setValue(data, SelectedId, value, MarkMode, solvedBoard);

        // Set the board state
        setData([...board]);
    }

    // Function which automatically marks the possibilites for each tile in the grid
    function AutoMarkHelper(){
        // Get the board state
        let board = data;
        
        board = autoMark(board);
        // Update the board to show the markings
        setData([...board]);
    }

    // Data for the board state
    const [data, setData] = useState(zeroState);

    // Data for the solved board state
    const [solvedBoard, setSolvedBoard] = useState(zeroSolution);
    

    // Displays a single row of the sudoku board
    function SudokuRow(props) {
        return (
            <tr>
                {props.items.map((data, x) => (
                    <td className="align-items-center justify-content-center w-7 h-7 border border-gray-400 xs:w-9 xs:h-9 xs:text-xl xl:w-12 xl:h-12 xl:text-2xl" 
                    style={!data.isValid && data.isMarked && data.isSelected ? { backgroundColor: 'rgb(127,95,127)' } : data.isSelected ? { backgroundColor: 'purple' } :
                        {}}
                        id={x + props.indexStart} key={x} onClick={() => updateSelection(x + props.indexStart)}>
                        {data.val == 0 ? <Marking marks={data.markings} /> : <Tile data={data} />}
                    </td>
                ))}
            </tr>
        )
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
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-r border-b border-gray-300" onClick={() => setValueHelper(1)}>1</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-x border-b border-gray-300" onClick={() => setValueHelper(2)}>2</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-l border-b border-gray-300" onClick={() => setValueHelper(3)}>3</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-y border-r border-gray-300" onClick={() => setValueHelper(4)}>4</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border border-gray-300" onClick={() => setValueHelper(5)}>5</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-y border-l border-gray-300" onClick={() => setValueHelper(6)}>6</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-r border-t border-gray-300" onClick={() => setValueHelper(7)}>7</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-t border-x border-gray-300" onClick={() => setValueHelper(8)}>8</button>
                    <button type="button" className="text-gray-300 pl-2 pr-2 m-auto h-12 w-12 border-l border-t border-gray-300" onClick={() => setValueHelper(9)}>9</button>
                </div>
            </div>

            <button type="button" className="bg-sky-950 text-gray-300 pl-2 pr-2 m-2 rounded-md w-56" onClick={() => setValueHelper(0)}> 
            Clear tile
            </button>

            <br/>

            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={MarkMode} className="cursor-pointer" onChange={() => ToggleMarkMode(!MarkMode)}/>
                <span className="ml-3 text-gray-300">Mark mode</span>
            </label>
            
            <br/>
            <button type="button" className="bg-sky-950 text-gray-300 pl-2 pr-2 m-2 rounded-md w-56" onClick={() => AutoMarkHelper()}> 
            Automatically mark
            </button>
        </div>
        </>

    )
    
}