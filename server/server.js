const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const BookAPI = require('./datasources/bookApi');

const { createStore } = require('./utils');

const store = createStore();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		bookApi: new BookAPI({ store })
	}),
	context: () => ({ token: 'foo' })
});

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
