import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const LibaryCard = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	return (
		<div
			style={{
				position: 'relative',
				width: '300px',
				height: '200px',
				borderRadius: '5px',
			}}>
			<h3
				style={{
					color: 'white',
					fontWeight: 'bold',
					top: '5px',
					left: '10px',
					position: 'absolute',
					userSelect: 'none',
				}}>
				REVERIE
			</h3>
			<h3
				style={{
					color: 'white',
					fontWeight: 'bold',
					top: '40px',
					left: '10px',
					position: 'absolute',
					userSelect: 'none',
				}}>
				LIBRARY
			</h3>
			<img
				style={{ width: '299px', height: '148px', borderRadius: '5px' }}
				src='https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg'
			/>
			<div
				style={{
					position: 'absolute',
					width: '100%',
					heigth: '30px',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: 'azure',
					paddingLeft: '10px',
				}}>
				<div style={{ userSelect: 'none' }}>{userInfo.user}</div>
				<div style={{ userSelect: 'none' }}>Card Number: {userInfo.cardNumber}</div>
			</div>
			<img
				style={{ width: '35px', height: '35px', position: 'absolute', bottom: '8px', right: '15px' }}
				src='https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png'
			/>
		</div>
	);
};

const UserProfile = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	return (
		<div>
			<center>
				<h1>User Profile</h1>
			</center>

			<div
				style={{
					display: 'flex',
					width: '60%',
					margin: '0 auto',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<div
					style={{
						flexBasis: '50%',
						fontSize: '1.5em',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Image
						style={{ width: 200, height: 200, border: '1px solid black', borderRadius: '50%' }}
						roundedCircle
						src={userInfo.avatar}
					/>
					<div style={{ margin: '10px' }}>
						Name: {userInfo.user}
						<span>
							<img
								style={{ width: '25px', height: '25px' }}
								src='http://simpleicon.com/wp-content/uploads/pencil.png'
							/>
						</span>
					</div>
					<div style={{ margin: '10px' }}>
						Fee: $ {userInfo.fee} <Button>Pay</Button>
					</div>
					<div style={{ margin: '10px' }}>
						<Button variant='danger'>Delete Account</Button>
					</div>
				</div>

				<div
					style={{
						flexBasis: '50%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<LibaryCard />
					<div style={{ fontSize: '1.5em', margin: '10px' }}>Card number: {userInfo.cardNumber}</div>
					<div style={{ margin: '10px' }}>
						<Button onClick={(e) => alert('Card has been locked')}>Lock Card</Button>
					</div>
					<div style={{ margin: '10px' }}>
						<Button onClick={(e) => alert('A new card has been sent to you')}>Replace Card</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
