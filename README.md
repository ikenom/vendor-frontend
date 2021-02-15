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

## What's inside?

-   [ ] Gatsby Template
    -   [x] offline support
    -   [ ] google analytics
    -   [x] manifest
    -   [x] typescript
-   [x] Best practices tools
    -   [x] [Jest](https://facebook.github.io/jest/) / [Enzyme](http://airbnb.io/enzyme/) / [Cypress](https://www.cypress.io/)
    -   [x] [Storybook](https://storybooks.js.org/)
    -   [x] [Typescript](https://www.typescriptlang.org/) / [tslint](https://palantir.github.io/tslint/)
    -   [x] [Sentry.io](https://sentry.io/welcome/)
-   [x] SEO
    -   [x] [Helmet](https://github.com/nfl/react-helmet)
-   [ ] UI Tools
    -  [ ] Ant Design
    -  [ ] Hook State
    -  [ ] Atomic Design

## Files structure

     .
     ├── data                          // website data (included into graphQL)
     │   ├── author.json               // list of blog authors
     │   ├── avatars                   // authors avatars
     │   └── blog                      // all blog data (posts, images)
     ├── gatsby-config.js              // gatsby configuration
     ├── generators                    // generators (`npm run generate`)
     │   ├── blog-post-generator.js    // `blog post` generator
     │   ├── component-generator.js    // `component` generator
     │   ├── page-generator.js         // `page` generator
     │   ├── plopfile.js               // generators entry
     │   ├── templates                 // all templates (handlebar notation)
     │   └── utils.js                  // utils scripts for generators
     ├── package.json
     ├── public                        // output folder (in .gitignore)
     ├── README.md                     // this file
     ├── src                           // sources
     │   ├── components                // all react components
     │   ├── css                       // styles
     │   ├── declarations.d.ts         // declarations for no typescript modules/files
     │   ├── graphql-types.d.ts        // graphql types (`npm run graphql-types`)
     │   ├── html.tsx                  // main html (required)
     │   ├── layouts                   // layouts
     │   │   └── default.tsx           // default layout (required)
     │   ├── pages                     // all pages
     │   └── templates                 // all templates (used for procedural page creation, see `gatsby-node.js`)
     ├── tools                         // miscs tools for dev
     │   └── update-post-date.js       // update post date hook
     ├── tsconfig.json                 // typescript configuration
     ├── tslint.json                   // tslint configuration
     └── package-lock.json             // npm lock file

