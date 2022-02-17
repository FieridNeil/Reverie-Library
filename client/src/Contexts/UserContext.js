import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [userInfo, setUserInfo] = useState({ user: 'John', reservedItems: [] });

	return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
}
