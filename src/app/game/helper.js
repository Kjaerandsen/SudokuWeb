// Takes a list of values and returns markings based on what is occupied
export function generateMarkings(items){
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

// Takes a board, each value validates against the solution
export function validateBoard(board, solution) {
    //let solution = solvedBoard
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

// Auto marking function, takes the board and generates possible contents of each tile
export function autoMark(board) {
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

    return board
}

// Function for inputting a value to the selected tile
export function setValue(data, SelectedId, value, MarkMode, solvedBoard) {
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
        board = validateBoard(board, solvedBoard)

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

    return board
}