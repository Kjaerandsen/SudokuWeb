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

#### Resources:
For the resources benchmarking the chrome developer tools were used in the "Network" tab. 
Where the total amount of data transferred can be viewed, in addition to the total size and amount
of requests. All the tests were ran using the disable cache function to force all elements of the
different pages to be loaded

Home page:
182kB transferred, 447kB resources and 21 requests.

Game page:
144kB transferred, 406kB resources and 13 requests.

This transfer size is lower than the target of 1.5 megabytes per page. It is also worthy to note that
the transfer for each page includes prefetching of available routes. Meaning that the home page also
transfers data for the game page, which if the cache is not disabled would reduce the transfer size
of the game page on load. Additionally, further page loads have a reduced size due to caching.

#### Performance
To test the performance of the app a metric of time to largest contentful paint (LCP) metric was used.
This testing was performed using the Chrome developer tools using the lighhouse test with the default 
simulated throttling enabled. Specifically the throttling was set to 4x cpu and Slow 4G for the networking. 
This simulates a four times slower cpu and networking conditions of a slow 4g network. 
This is done to evaluate how the page would perform for users with slower hardware.

For the home page this gave a LCP time of 1.7 seconds and the game page had a LCP of 2.1 seconds.
Both hitting the target of less than 3.5 seconds.

In testing with the "Performance" tab instead with 6x CPU slowdown and Slow3G networking enabled the
FCP was 2.41 seconds on the home page and 2.49 seconds on the game page.
Again both pages hit the target of a sub 3.5 second load time.

It is worth noting that this metric might be inacurrate and real world conditions can have an impact
on the end users actual load time. This includes things such as the specific networking conditions of 
the user, their hardware and cooling and other background tasks on the system.

The benchmarks were ran on a computer with a Ryzen R7 3700x CPU.

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