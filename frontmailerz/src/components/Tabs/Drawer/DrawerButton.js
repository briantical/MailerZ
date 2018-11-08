import React from "react";

import "./DrawerButton.css";

const drawerButton = props => (
	<button className="drawerButton" onClick={props.click}>
		<div className="hamburger_line" />
		<div className="hamburger_line" />
		<div className="hamburger_line" />
	</button>
);
export default drawerButton;
