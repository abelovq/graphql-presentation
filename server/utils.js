const SQL = require('sequelize');

module.exports.createStore = () => {
	const Op = SQL.Op;
	const operatorsAliases = {
		$in: Op.in
	};

	const db = new SQL('database', 'username', 'password', {
		dialect: 'sqlite',
		storage: './test.db',
		operatorsAliases,
		logging: false
	});

	const books = db.define(
		'book',
		{
			id: {
				type: SQL.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: SQL.STRING,
			authorId: SQL.INTEGER
		},
		{
			timestamps: false
		}
	);

	const authors = db.define(
		'author',
		{
			id: {
				type: SQL.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			firstName: SQL.STRING,
			lastName: SQL.STRING
		},
		{
			timestamps: false
		}
	);

	authors.hasMany(books, { foreignKey: 'authorId' });
	books.belongsTo(authors);

	return { books, authors };
};
