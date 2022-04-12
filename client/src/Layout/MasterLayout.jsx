import React from "react";
import NavBar from "../NavBar/NavBar";

const MasterLayout = ({ children }) => {
	return (
		<div
			style={{
				backgroundImage: `url(https://i.pinimg.com/originals/88/35/bf/8835bf63c6c4faad4fd62f52ca863afc.jpg)`,
				backgroundAttachment: "fixed",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
				width: "100%",
				minHeight: "100vh",
			}}
		>
			<NavBar />
			{children}
		</div>
	);
};

export default MasterLayout;
