import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import * as GetAllBooks from './GetAllBooks.graphql';

const ADD_BOOK = gql`
	mutation addBook($book: BookInput!) {
		addBook(book: $book)
	}
`;

export default function CreateBook() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [addBook, { data }] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: GetAllBooks }],
		awaitRefetchQueries: true
	});

	const onSubmit = e => {
		e.preventDefault();
		addBook({ variables: { book: { title, description } } });
		setTitle('');
		setDescription('');
	};
	console.log('data', data);

	return (
		<div style={{ marginTop: '50px' }}>
			<form onSubmit={onSubmit}>
				<label>
					title:{' '}
					<input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
				</label>
				<br />
				<label>
					description:{' '}
					<input
						type="text"
						name="description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>
				</label>
				<button type="submit">ADD</button>
			</form>
		</div>
	);
}
