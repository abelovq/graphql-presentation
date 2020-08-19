import React, { useState } from 'react';
import AllBooks from './AllBooks';
import Book from './Book';
import CreateBook from './CreateBook';

export default () => {
	const [selectedBookId, setSelectedBookId] = useState();

	return (
		<div>
			<div>
				<AllBooks onSelect={book => setSelectedBookId(book.id)} />
			</div>

			{selectedBookId && (
				<div>
					<Book id={selectedBookId} />
				</div>
			)}
			<CreateBook />
		</div>
	);
};
