<!-- # Gatsby 2.0 starter

Demo: <https://fabien0102-gatsby-starter.netlify.com/>

Storybook: <https://fabien0102-gatsby-starter.netlify.com/docs/>

Gatsby 2.0 starter for generate awesome static website working with a nice env development. -->


<!-- ## Getting started

Install this starter (assuming Gatsby is installed) by running from your CLI:

```bash
$ gatsby new my-website https://github.com/fabien0102/gatsby-starter
``` -->

## Setup
Run `brew install helm && brew install scaffold`.

Create .env file (will show later)

Run `scripts/setup`.

Run `scripts/dev`.
## Running Locally

Run gatsby locally in develop mode (makes debugging and testing features much easier) `yarn develop`.

Run gatsby in a docker image in develop mode `docker build . -f Dockerfile.dev -t gatsby-dev && docker run -p 8000:8000 9929:9929  9230:9230 9001:9001 gatsby-dev`. Open `http://localhost:8000`.

Run gatsby locally in production mode (webpack build, minifiying, etc.) `yarn production`

Run gastby in a docker image in production mode `docker build . -f Dockerfile.prod -t gatsby-prod && docker run -p 8000:9000 gatsby-prod`. Open `http://localhost:8000`.

## Run Storybook

Storybook lets us render our react components in a stand alone way. Checkout the docs for more info: https://storybook.js.org/

Run `yarn storybook`

Open `http://localhost:9001`

## What's inside?

-   [ ] Gatsby Template
    -   [ ] offline support
    -   [ ] google analytics
    -   [x] manifest
    -   [x] typescript
-   [x] Best practices tools
    -   [x] [Jest](https://facebook.github.io/jest/) / [Enzyme](http://airbnb.io/enzyme/) / [Cypress](https://www.cypress.io/)
    -   [x] [Storybook](https://storybooks.js.org/)
    -   [x] [Typescript](https://www.typescriptlang.org/) / [tslint](https://palantir.github.io/tslint/)
    -   [x] [Sentry.io](https://sentry.io/welcome/)
    -   [x] [Cypress](https://www.cypress.io/)
-   [x] SEO
    -   [x] [Helmet](https://github.com/nfl/react-helmet)
-   [ ] UI Tools
    -  [x] Ant Design (component library https://ant.design/)
    -  [x] Hook State (state management https://hookstate.js.org/)
    -  [x] Atomic Design (methodolgy check out the original manifesto https://bradfrost.com/blog/post/atomic-web-design/)
    -  [x] Styled System (https://styled-system.com/)
    -  [x] Styled Components
    -  [x] Storybook (https://storybook.js.org/)

