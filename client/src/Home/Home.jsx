import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../Contexts/UserContext';
import NavBar from '../NavBar/NavBar';
import styled, { keyframes } from 'styled-components';
import { bounceIn, bounceOut } from 'react-animations';

const BounceInAnim = keyframes`${bounceIn}`;
const BounceOutAnim = keyframes`${bounceOut}`;

const Alert = styled.div`
	border-radius: 5px;
	background-color: #ff6161;
	border: 1px solid #ff3030;
	color: white;
	width: 250px;
	position: fixed;
	top: 100px;
	right: 10px;
	padding: 10px;
	font-size: 1.2em;
	animation: ${BounceInAnim} 0.5s linear, ${BounceOutAnim} 0.5s linear forwards;
	animation-delay: 0s, 4s;
`;

const BookCard = ({ item, setErr }) => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	const ReserveBookHandler = (e) => {
		if (userInfo.reservedItems.length < 10) {
			let temp = { ...userInfo };
			item.borrowDate = new Date();
			item.dueDate = item.borrowDate.setDate(item.borrowDate.getDate() + 21);
			temp.reservedItems.push(item);
			setUserInfo(temp);
			localStorage.setItem('info', JSON.stringify(temp));
		} else {
			setErr({ maxBorrow: true });
			setTimeout(() => {
				setErr({ maxBorrow: false });
			}, 5000);
		}
	};

	return (
		<div
			style={{
				width: '32vw',
				height: '250px',
				padding: '10px 5px',
				boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
				borderRadius: '5px',
				display: 'flex',
				gap: '10px',
				backgroundColor: 'white',
				color: 'black',
			}}>
			<div>
				<img style={{ width: '150px', height: '90%' }} src={item.thumbnail} />
				<div style={{ textAlign: 'center' }}>ISBN: {item.isbn10}</div>
			</div>
			<div style={{ fontSize: '0.9em' }}>
				<div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{item.title}</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Author:</span> {item.authors}
				</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Categories: </span>
					{item.categories}
				</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Description:</span>{' '}
					{item.description.length > 100 ? item.description.substr(0, 100) + '...' : item.description}
				</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Published Year:</span> {item.published_year}
				</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Average rating:</span> {item.average_rating}
				</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Number of pages:</span> {item.num_pages}
				</div>
				<div>
					<span style={{ fontWeight: 'bold' }}>Ratings count:</span> {item.ratings_count}
				</div>
			</div>
			<div style={{ position: 'relative' }}>
				<Button style={{ position: 'absolute', right: '10px', bottom: '0' }} onClick={ReserveBookHandler}>
					Borrow
				</Button>
			</div>
		</div>
	);
};

const Home = () => {
	const [searchString, setSearchString] = useState('');
	const [searchResult, setSearchResult] = useState();
	const [err, setErr] = useState({ maxBorrow: false });

	const FormSubmitHandler = (e) => {
		e.preventDefault();
		if (searchString === '') return;

		fetch(`http://localhost:4001/bookSearch`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ q: searchString }),
		})
			.then((result) => result.json())
			.then((result) => {
				console.log(result);
				setSearchResult(result);
			})
			.catch((err) => console.log('Failed to send book search request to server', err));

		setSearchString('');
	};

	return (
		<div>
			<NavBar />
			<br />
			<br />
			<br />
			<div
				style={{
					margin: '20px auto',
					width: '50%',
					padding: '15px',
					borderRadius: '10px',
					backgroundColor: '#ff9900dd',
				}}>
				<center>
					<h1>Welcome to Reverie Library</h1>
				</center>
				<div style={{ margin: '0px auto' }}>
					<Form style={{ display: 'flex' }} onSubmit={FormSubmitHandler}>
						<Form.Control
							type='text'
							placeholder='Enter a keyword...'
							value={searchString}
							onChange={(e) => setSearchString(e.target.value)}
						/>
						<Button type='Submit'>Submit</Button>
					</Form>
					{searchResult && (
						<div style={{ textAlign: 'center', margin: '10px', fontSize: '1.5em' }}>
							Found{' '}
							<span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{searchResult?.data.length}</span>{' '}
							items for query{' '}
							<span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{searchResult?.searchTitle}</span>
						</div>
					)}
				</div>
			</div>

			<div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
					{searchResult?.data.map((elm, k) => (
						<BookCard key={k} item={elm} setErr={setErr} />
					))}
				</div>
			</div>
			{err.maxBorrow && <Alert>You cannot borrow more than 10 books</Alert>}
		</div>
	);
};

export default Home;
