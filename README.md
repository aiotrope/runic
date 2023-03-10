# runic

FSO Part 11: Project

Project based on [this code repository](https://github.com/aiotrope/passlist) with added backend unit tests, e2e test and deployment automation.

Date: 7.3.2023

---

## CLI Commands

```bash
# generate express app using express-generator
$ express --view=ejs backend

# generate react app
$ yarn create react-app frontend .

# run backend dev server at port:8000
$ yarn dev

# run production app at port:8000
$ yarn start

# run frontend dev server at port:3000
$ cd frontend && yarn run start

# build production server backend 
$ yarn build:be

# build frontend for production
$ yarn build:fe

# format code
$ yarn prettier

# lint code
$ yarn eslint

# run in test environment
$ yarn start:test

# run backend unit test
$ yarn test

# run e2e test
$ yarn test:e2e

```


