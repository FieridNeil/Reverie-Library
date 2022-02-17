import React, { useEffect, useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../Contexts/UserContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	return (
		<nav
			style={{
				width: '80vw',
				backgroundColor: '#ff9900',
				padding: '10px',
				margin: '0 auto',
				display: 'flex',
				alignItems: 'center',
				borderBottomLeftRadius: '5px',
				borderBottomRightRadius: '5px',
			}}>
			<Link to='/home' style={{ textDecoration: 'none', color: 'black' }}>
				<h1>Reverie Library</h1>
			</Link>
			<div style={{ marginLeft: 'auto', display: 'flex' }}>
				<img
					style={{ width: '50px', height: '50px', borderRadius: '50%' }}
					src='https://www.pokemoncenter.com/products/images/P6506/710-07588/P6506_710-07588_02.jpg'
				/>
				<NavDropdown style={{ fontSize: '1.5em' }} title={userInfo?.user}>
					<NavDropdown.Item href='#action3'>View Profile</NavDropdown.Item>
					<NavDropdown.Item href='/bookshelf'>Bookshelf</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='#action5'>Logout</NavDropdown.Item>
				</NavDropdown>
			</div>
		</nav>
	);
};

export default NavBar;
