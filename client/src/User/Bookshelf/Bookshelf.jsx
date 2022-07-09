import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import Button from "react-bootstrap/Button";

const BookShelfCard = ({ item }) => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	const BookReturnButtonHandler = (e) => {
		let temp = { ...userInfo };
		const idx = temp.reservedItems.findIndex((x) => x.title === item.title);
		const a = temp.reservedItems.splice(idx, 1);
		localStorage.setItem("info", JSON.stringify(temp));
		window.location.reload();
	};

	console.log(item.dueDate);
	return (
		<div
			style={{
				width: "150px",
				height: "350px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around",
			}}
		>
			<img style={{ height: "250px" }} src={item.thumbnail} />
			<div
				style={{
					fontWeight: "bold",
					textAlign: "center",
					color:
						item.dueDate < new Date().getTime() ? "red" : "black",
				}}
			>
				Due {new Date(item.dueDate).toLocaleDateString()}
			</div>
			<Button onClick={BookReturnButtonHandler}>Return</Button>
		</div>
	);
};

const Bookshelf = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	return (
		<div>
			<center>
				<h1>My Bookshelf</h1>
			</center>
			<div
				style={{
					display: "flex",
					width: "80vw",
					margin: "0 auto",
					justifyContent: "space-around",
					padding: "20px",
				}}
			>
				<div style={{ flexBasis: "20%" }}>
					<center>
						<h1>Book borrowed:</h1>
						<h1>{userInfo && userInfo?.reservedItems.length}/10</h1>
					</center>
				</div>

				<div style={{ flexBasis: "70%" }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(5, 1fr)",
							gap: 20,
						}}
					>
						{userInfo &&
							userInfo?.reservedItems.map((elm, k) => (
								<BookShelfCard key={k} item={elm} />
							))}
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					width: "80vw",
					margin: "0 auto",
					justifyContent: "space-around",
					padding: "20px",
				}}
			>
				<div style={{ flexBasis: "70%" }}></div>
			</div>
		</div>
	);
};

export default Bookshelf;
