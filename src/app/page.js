import Link from 'next/link'
import Image from 'next/image'
import example1 from './resources/example1.png'
import example2 from './resources/example2.png'
import example3 from './resources/example3.png'
import example4 from './resources/example4.png'
import example5 from './resources/example5.png'

// Main page of the application, with a selection of puzzles and instructions on how to play
export default function Home() {
  return (
    <main className="container text-center text-white bg-slate-800 m-auto">
        <h1 className="text-3xl">Sudoku Web: </h1>
        <h2 className="text-2xl">An accessible Sudoku game for the web</h2>
        <br/>
        {/* Buttons here for starting a game */}
        <h2 className='text-xl'>To start a game, just select a puzzle below</h2>
        <div>
          <Link href="/game?puzzle=1"><p>1</p></Link>
          <Link href="/game?puzzle=2"><p>2</p></Link>
          <Link href="/game?puzzle=3"><p>3</p></Link>
        </div>

        <div className="sm:w-3/4 p-2 m-auto text-left">
          <h2 className="text-xl text-center">How to play:</h2>

          <p>
            Sudoku is a logic based puzzle game where the goal is to fill a grid with the whole sequence of numbers from 
            one to nine (1-9) in every straight direction and within each of the nine sub-grids.
          </p><br/>
            {/* Illustrations here */}
            <Image src={example1} className='m-auto border-black border-2'
              alt="Image of lines of a sudoku grid and a sub-grid with numbers."/>
            <br/>
            <br/>
          <p>
            This means that if there are any repeated numbers in either the vertical or horizontal direction, or in one of the
            sub-grids then an error has been made.
          </p><br/>
            {/* Illustrations here */}
            <Image src={example2} className='m-auto border-black border-2'
              alt="Image of lines of a sudoku grid and a sub-grid with invalid number combinations."/>

            <br/>
            <br/>
          <p>
            One of the main strengths of Sudoku is that it is based on logic. Meaning that a proper Sudoku puzzle can be solved
            without any guesswork. To do this there are different techniques with various degrees of complexity.
            The most basic technique is to look at the numbers already filled in and look at which numbers are filled in several 
            times. Then you can look for other places where that number can be placed. In the example below the number 1 is filled
            in every single line, and grid except for one. Which means that the only tile which is left available for the number 1
            is the marked tile.
          </p><br/>
            {/* Illustrations here */}
            <Image src={example3} className='m-auto border-black border-2'
              alt="Image of a sudoku grid with ones occupied in every line and sub-grid except for one, where the tile is marked."/>
          
            <br/>
            <br/>
          <p>
            Another basic strategy is looking for lines or sub-grids that are almost complete. If there is only one value missing 
            in a line or a sub-grid you can find that value by checking which number is not yet placed. If there are two missing 
            numbers you can check if the values can both be placed in both the open slots, if not then you know where to place both.
            This extends to situations where more values are missing as well, but the complexity increases accordingly.
          </p><br/>
            {/* Illustrations here */}
            <Image src={example4} className='m-auto border-black border-2'
              alt="Image of a subgrid with one missing number."/>
            <br/>
            <br/>
          <p>
            Finally, to help in the process of eliminating alternatives and remembering which alternatives exist for each tile there
            is a marking mode. This allows you to mark the tiles with possible values. For example if a grid has three free slots then
            you know that the three slots have two options of their contents. These three tiles can then be marked with these two options.
            This makes the alternatives for the tiles clear, and through the process of elimination the alternatives for each tile will
            reduce until there is only one option left. At that point the tile can be filled with the value.
          </p><br/>
          <Image src={example5} className='m-auto border-black border-2'
            alt="Image of a sub-grid with markings."/>
        </div>
    </main>
  )
}

