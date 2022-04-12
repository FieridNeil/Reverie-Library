import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Bookshelf from "./User/Bookshelf/Bookshelf";
import { UserContext } from "./Contexts/UserContext";
import MasterLayout from "./Layout/MasterLayout";
import UserProfile from "./User/Profile/UserProfile";

function App() {
	const { userInfo, setUserInfo } = useContext(UserContext);
	useEffect(() => {
		if (localStorage.getItem("info") !== null) {
			setUserInfo(JSON.parse(localStorage.getItem("info")));
		}
	}, []);
	return (
		<Router>
			<MasterLayout>
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/home" element={<Home />} exact />
					<Route path="/bookshelf" element={<Bookshelf />} exact />
					<Route
						path="/userprofile"
						element={<UserProfile />}
						exact
					/>
				</Routes>
			</MasterLayout>
		</Router>
	);
}

export default App;
