import SudokuBoard from './SudokuBoard.js'

export default function Home() {
  return (
    <main className="container-xl main-container bg-white text-center">
      <div className="row col-12 m-0">
        <div className="col-12 col-md-6 border-end border-start border-secondary">
          <SudokuBoard />
        </div>
        <div className="col-12 col-md-6 border-end border-start border-secondary">
          Buttons here
        </div>
      </div>
    </main>
  )
}

