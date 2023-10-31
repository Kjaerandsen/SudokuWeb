# Sudoku Web

Sudoku web is a web application containing the game Sudoku.
The current version is a minimum viable product (MVP) containing basic functionality.
This functionality includes starting a game, updating values using buttons,
ui elements showing wrong inputs and a victory screen.




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building and running the project
```bash
# Run the build process
npm run build
# Then run the build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sustainability

### Benchmarks

### Deployment instructions

## Additional info

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technology statement
The project will use the following technologies:
* Node.js
* JavaScript
* HTML
* CSS
* TailwindCSS
* JSON
* Next.js
* React.js

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

TailwindCSS is chosen to allow for faster development of the user interface. Additionally, the
tooling of TailwindCSS helps keep the CSS size down as unused parts of TailwindCSS are
automatically removed when building the application. This way the parts which are not used
will not be sent to the user. Allowing for smaller file sizes and therefore increased performance
and a more sustainable product.

All in all, these technologies are a compromise between development cost, and user experience.
Where common frameworks are used to help in the development, and steps are taken to help
the user experience. Through TailwindCSS removing unused CSS to reduce file and transfer
sizes and Next.js allowing for server-side rendering of components.