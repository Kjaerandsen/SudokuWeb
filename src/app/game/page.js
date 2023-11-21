import SudokuBoard from './SudokuBoard.js'

export default function Page() {
  return (
    <main className="container text-center text-white bg-slate-800 m-auto grid grid-cols-2">
        <SudokuBoard />
    </main>
  )
}
