import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
	const [searchString, setSearchString] = useState();
	const [searchResult, setSearchResult] = useState();

	useEffect(() => {}, []);

	const FormSubmitHandler = (e) => {
		e.preventDefault();

		fetch(`http://localhost:4001/bookSearch`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ q: searchString }),
		})
			.then((result) => {
				setSearchResult(result);
			})
			.catch((err) => console.log('Failed to send book search request to server', err));

		setSearchString('');
	};

	return (
		<div>
			<h1>Reverie Library</h1>
			<div style={{ width: '50vw', height: '200px', margin: '0 auto' }}>
				<Form style={{ display: 'flex' }} onSubmit={FormSubmitHandler}>
					<Form.Control
						type='text'
						placeholder='Search...'
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
					/>
					<Button type='Submit'>Submit</Button>
				</Form>
			</div>

			<div></div>
			{console.log(searchResult)}
		</div>
	);
}

export default App;
