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

const resolvers = {
	Query: {
		getAllBooks: async (_, __, { dataSources }) => {
			return await dataSources.bookApi.getAllBooks();
		},
		getBook: async (_, { id }, { dataSources }) => {
			console.log('resolvers', id);
			return await dataSources.bookApi.getBook(id);
		}

		// launch: (_, { id }, { dataSources }) => dataSources.launchAPI.getLaunchById({ launchId: id }),
		// me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
	},
	Mutation: {
		addBook: async (_, { book: { title, description } }, { dataSources }) => {
			console.log('title', title);
			return await dataSources.bookApi.addBook(title, description);
		}
	}
	// 	bookTrips: async (_, { launchIds }, { dataSources }) => {
	// 		const results = await dataSources.userAPI.bookTrips({ launchIds });
	// 		const launches = await dataSources.launchAPI.getLaunchesByIds({
	// 			launchIds
	// 		});

	// 		return {
	// 			success: results && results.length === launchIds.length,
	// 			message:
	// 				results.length === launchIds.length
	// 					? 'trips booked successfully'
	// 					: `the following launches couldn't be booked: ${launchIds.filter(id => !results.includes(id))}`,
	// 			launches
	// 		};
	// 	},
	// 	cancelTrip: async (_, { launchId }, { dataSources }) => {
	// 		const result = dataSources.userAPI.cancelTrip({ launchId });

	// 		if (!result)
	// 			return {
	// 				success: false,
	// 				message: 'failed to cancel trip'
	// 			};

	// 		const launch = await dataSources.launchAPI.getLaunchById({ launchId });
	// 		return {
	// 			success: true,
	// 			message: 'trip cancelled',
	// 			launches: [launch]
	// 		};
	// 	},
	// 	login: async (_, { email }, { dataSources }) => {
	// 		const user = await dataSources.userAPI.findOrCreateUser({ email });
	// 		if (user) {
	// 			user.token = new Buffer(email).toString('base64');
	// 			return user;
	// 		}
	// 	},
	// 	uploadProfileImage: async (_, { file }, { dataSources }) => dataSources.userAPI.uploadProfileImage({ file })
	// },
	// Launch: {
	// 	isBooked: async (launch, _, { dataSources }) => dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
	// },
	// Mission: {
	// 	// make sure the default size is 'large' in case user doesn't specify
	// 	missionPatch: (mission, { size } = { size: 'LARGE' }) => {
	// 		return size === 'SMALL' ? mission.missionPatchSmall : mission.missionPatchLarge;
	// 	}
	// },
	// User: {
	// 	trips: async (_, __, { dataSources }) => {
	// 		// get ids of launches by user
	// 		const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

	// 		if (!launchIds.length) return [];

	// 		// look up those launches by their ids
	// 		return (
	// 			dataSources.launchAPI.getLaunchesByIds({
	// 				launchIds
	// 			}) || []
	// 		);
	// 	}
	// }
};

module.exports = { typeDefs, resolvers };
