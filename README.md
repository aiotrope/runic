# runic

FSO Part 11: CI/CD Project

This project is accompanied by module exercises (full-stack-open-pokedex), which can be found in [this repository](https://github.com/aiotrope/full-stack-open-pokedex).

Project based on [this code repository](https://github.com/aiotrope/passlist) with added backend unit tests, e2e test and automation pipeline.

Date: 7.3.2023 - 12.3.2023

---

## Deployment

Full stack app live at [https://runic.onrender.com](https://runic.onrender.com)

### CLI Commands

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

# build full stack app
$ yarn build

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


