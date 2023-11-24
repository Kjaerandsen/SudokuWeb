export default function Page() {
    return(
        <main className="container text-center text-white bg-slate-800 m-auto">
            <h1 className="text-3xl">About:</h1>
            <h2 className="text-2xl">Technology statement:</h2>
            This project uses the following technologies:
            <ul>
                <li>Node.js</li>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>TailwindCSS</li>
                <li>JSON</li>
                <li>Next.js</li>
                <li>React.js</li>
            </ul>
            
            <div className="sm:w-3/4 p-2 m-auto text-left">
            <p>
            This choice of technologies is deliberate to find a balance between the priority of constituencies,
            sustainability and the cost of development. To deliver a user-centric experience Next.js will
            be used to create server-side components where possible to allow for enhanced performance
            for users. While for the sudoku game itself client-side components will be used to allow the
            user to play the game even if their connection to the internet drops out while playing. While
            React has some drawbacks in performance, it is also an industry standard and allows for
            rapid development and makes it easier for other developers to contribute as the technology
            is mature and commonly used. This is a compromise between the developer experience and
            the user experience, where the development cost decreases, but the application may be slower.
            Of course, you also have to take into account the cost of development. To help mitigate the
            performance problems with React server-side rendering techniques will be used where possible
            with Next.js.
            <br/><br/>
            TailwindCSS is chosen to allow for faster development of the user interface. Additionally, the
            tooling of TailwindCSS helps keep the CSS size down as unused parts of TailwindCSS are
            automatically removed when building the application. This way the parts which are not used
            will not be sent to the user. Allowing for smaller file sizes and therefore increased performance
            and a more sustainable product.
            <br/><br/>
            All in all, these technologies are a compromise between development cost, and user experience.
            Where common frameworks are used to help in the development, and steps are taken to help
            the user experience. Through TailwindCSS removing unused CSS to reduce file and transfer
            sizes and Next.js allowing for server-side rendering of components.
            </p>
            </div>
        </main>
    )
}