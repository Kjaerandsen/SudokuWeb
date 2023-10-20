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

    const [data, setData] = useState([
        {"val":0,"isSelected":true,"isValid":true}, {"val":1,"isMarked":true,"isValid":false}, {"val":1,"isMarked":true,"isValid":true}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1},
        {"val":9}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}, {"val":1}])

    /*
        id, is automatic, not important
        value is important
        isSelected is important
        Need to be able to mark all interacting tiles, both in the case of them as impacting (blue?)
        and in the case of invalid marking (red?)
        The invalid tile should have another text color or border to show which value is incorrectly marked
    */

        /*
            {"val":0,"isFilled":true,isSelected:true,"isValid":false,isMarked:"true"}

        */
    
    
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

    function SudokuRow(props) {
        //console.log(props)
        //<th scope="row">A</th>
        //"d-flex align-items-center justify-content-center"
        return (
            <tr>
                {props.items.map((data, x) => (
                    <td className="align-items-center justify-content-center border" style={data.isSelected ? {backgroundColor: 'purple'} : 
                    data.isMarked && data.isValid ? {backgroundColor: 'blue'} : data.isMarked && !data.isValid ? {backgroundColor: 'red'} : {}} 
                    id={x + props.indexStart} key={x} onClick={() => OnItemClick(x + props.indexStart)}>
                        
                        <div style={{aspectRatio:1/1}} className={data.isValid ? "d-flex align-items-center justify-content-center" : "text-danger d-flex align-items-center justify-content-center"}>
                            {data.val}</div>
                    </td>
                ))}
            </tr>
        )
    }

    return (
        <>
        <h1>test</h1>
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


/*
function sudokuTile(props){
    return (
        <div>Tile Here</div>
    )
}
*/