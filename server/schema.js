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
}

type Mutation {
	addBook(book: BookInput!): Boolean!
}

`;

module.exports = { typeDefs };