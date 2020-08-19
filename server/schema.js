const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		id: ID!
		title: String!
		author: Author
		description: String!
	}

	input BookInput {
		title: String!
		description: String!
	}

	type Author {
		id: ID!
		firstName: String!
		lastName: String!
	}

	type Query {
		getAllBooks: [Book]!
		getBook(id: ID!): Book!

		getAllBooksServ: [Book]!
		getBookServ(id: ID!): Book!
	}

	type Mutation {
		addBook(book: BookInput!): Boolean!
		addBookServ(book: BookInput!): Boolean!
	}
`;

const allBooks = [
	{
		id: '1',
		title: 'Мартин Иден',
		author: {
			id: '1',
			firstName: 'Джек',
			lastName: 'Лондон'
		}
	},
	{
		id: '2',
		title: 'Горе от ума',
		author: {
			id: '2',
			firstName: 'Александр',
			lastName: 'Грибоедов'
		}
	}
];

const resolvers = {
	Query: {
		getAllBooksServ: async (_, __, { dataSources, token }) => {
			// console.log('token', token);
			return await dataSources.bookApi.getAllBooks();
		},
		getAllBooks: () => {
			return allBooks;
		},
		getBook: (_, { id }) => {
			return allBooks.find(({ id: bookId }) => bookId === id);
		},
		getBookServ: async (_, { id }, { dataSources }) => {
			// console.log('resolvers', id);
			return await dataSources.bookApi.getBook(id);
		}

		// launch: (_, { id }, { dataSources }) => dataSources.launchAPI.getLaunchById({ launchId: id }),
		// me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
	},
	Mutation: {
		addBookServ: async (_, { book: { title, description } }, { dataSources }) => {
			console.log('title', title);
			return await dataSources.bookApi.addBook(title, description);
		},
		addBook: (_, { book: { title, description } }) => {
			try {
				const [firstName, lastName] = description.split(' ');
				allBooks.push({
					id: (allBooks.length + 1).toString(),
					title,
					author: {
						id: (allBooks.length + 1).toString(),
						firstName,
						lastName
					}
				});

				return true;
			} catch (err) {
				throw new Error();
			}
		}
	}
};

module.exports = { typeDefs, resolvers };
