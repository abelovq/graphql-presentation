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
	})
});

const allBooks = [
	{
		id: '1',
		title: 'Another awesome book',
		description: '123',
		author: {
			id: '1',
			firstName: 'Alex',
			lastName: 'Kislov'
		}
	},
	{
		id: '2',
		title: 'Awesome book',
		description: '123',
		author: {
			id: '1',
			firstName: 'Alex',
			lastName: 'Kislov'
		}
	}
];

const root = {
	getAllBooks: () => {
		return allBooks;
	},
	getBook: params => {
		return allBooks.find(({ id }) => params.id === id);
	},
	addBook: params => {
		allBooks.push({
			id: allBooks.length + 1,
			...params.book,
			author: {
				id: '1',
				firstName: 'Alex',
				lastName: 'Kislov'
			}
		});

		return true;
	}
};

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
