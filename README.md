# vue-graphql

## What is the project about
Implements two GraphQL API clients using Vue 2.
It accesses to "SpaceX" and "Hasura" GraphQL APIs, the last one requires an authorization access toker

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Get Hasura token
### Log in to Hasura
https://hasura.io/learn/graphql/graphiql

Copy the Authorization token from Request Headers and paste it in
`src/apollo/hasura-client/index.js`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
