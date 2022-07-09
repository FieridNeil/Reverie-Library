import React, { useState, createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [userInfo, setUserInfo] = useState({
		user: "John Doe",
		avatar: "https://images2.minutemediacdn.com/image/upload/c_crop,w_6960,h_3915,x_0,y_521/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/mentalfloss/01g05dr5ywhn47egkrkd.jpg",
		fee: 0,
		cardNumber: 123456789,
		isAdmin: false,
		reservedItems: [],
	});

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	);
}
