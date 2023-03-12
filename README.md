# runic

FSO Part 11: CI/CD Project

Module exercises (full-stack-open-pokedex) are included with this project and can be found [in this repository](https://github.com/aiotrope/full-stack-open-pokedex).

Project built using [this code repository](https://github.com/aiotrope/passlist) from the Phonebook exercise, with automation pipeline, backend unit tests, and e2e tests added.

Date: 7.3.2023 - 12.3.2023

---

## Deployment

Web services by [Render](https://render.com/) and running online at [https://runic.onrender.com](https://runic.onrender.com)

### CLI Commands

```bash
# generate express app using express-generator
$ express --view=ejs backend

# generate react app
$ yarn create react-app frontend .

# run backend dev server at port:8000
$ yarn dev

# run production build at port:8000
$ yarn start

# run frontend dev server at port:3000
$ cd frontend && yarn run start

# build static assets
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


