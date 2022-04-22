import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [userInfo, setUserInfo] = useState({
		user: 'John Doe',
		avatar: 'https://www.pokemoncenter.com/products/images/P6506/710-07588/P6506_710-07588_02.jpg',
		fee: 0,
		cardNumber: 123456789,
		isAdmin: false,
		reservedItems: [],
	});

	return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
}
