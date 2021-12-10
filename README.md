A [Next.js](https://nextjs.org/) blueprint project using [Typescript](https://github.com/microsoft/TypeScript), [Jest](https://github.com/facebook/jest) with [React's testing library](https://github.com/testing-library/react-testing-library) and [Storybook](https://github.com/storybookjs/storybook)

## Setup

`yarn` or `npm i`

## Tasks

### Development

`yarn run dev` runs local server on [http://localhost:3000](http://localhost:3000)

`yarn run storybook` runs storybook on [http://localhost:6006](http://localhost:6006)

`yarn run test` runs all tests and re-runs on dependent file changes

`yarn run test:ci` runs tests in CI mode without a watch task 

`yarn lint` lints your code as per Next.js' built-in ESLint config

### Production

`yarn run build` builds the app for production using webpack5

`yarn run start` starts a Next.js production server

### Figma

`yarn run getFigmaToken <apiKey> [<figmaId>]` generates a token (and saves it to /token) from the figma id of a figma style guide (defaults to acessing: https://www.figma.com/file/Mi7wdQqRHavaPODG1EJ8pQ) 

`yarn run generateCss` generates css variables from the token

## Code Example

A basic button story `stories/Button.stories.tsx` and button test `__tests__/Button.spec.tsx` are included

## Docs

- [Next.js API & Feature Documentation](https://nextjs.org/docs)
- [interactive Next.js Tutorial](https://nextjs.org/learn)
- [Next.js GitHub repo](https://github.com/vercel/next.js/)
- [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Jest Documentation](https://jestjs.io/docs/next/getting-started)
- [React Testing Library API Docs](https://testing-library.com/docs/react-testing-library/api/)
- [Storybook Intro](https://storybook.js.org/docs/react/writing-stories/introduction)