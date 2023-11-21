// Display function for markings
export function Marking(props) {
    //console.log(props.marks)
    if (props.marks !== undefined && props.marks.length > 0) {
    return (
    <div className='grid grid-cols-3 text-xxs sm:text-xs xl:text-xsm' style={{lineHeight:"1.5"}}>
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
export function Tile(props) {
    return (
        <div className={props.data.isValid ? "align-items-center justify-content-center text-bold text-gray-300" : "text-red-800 text-bold align-items-center justify-content-center"}>
            {props.data.val}
        </div>
    )
}