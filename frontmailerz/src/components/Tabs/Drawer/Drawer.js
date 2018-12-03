import React from "react";
import {
	Settings,
	Info,
	HelpOutline,
	PersonOutline,
	WorkOutline,
	StarRate,
	KeyboardArrowRight
} from "@material-ui/icons";

import "./Drawer.css";
const Drawer = props => {
	let drawerClasses = "drawer";
	if (props.show) {
		drawerClasses = "drawer open";
	}
	return (
		<nav className={drawerClasses}>
			<div className="profileHeader">
				<div className="thumbNailHolder">
					<img
						alt="profile_pic"
						src={props.profilePic !== "" ?  props.profilePic : require('./avatar.png')}
						className="profilePicture"
					/>
				</div>
				<div className="profileName">{props.profileName !== "" ? props.profileName : "user name"}</div>
			</div>
			<div className="list" id={1} onClick={props.display}>
				<div className="listName">
					<PersonOutline />
					<div>Profile</div>
				</div>
				<div className="listForward">
					<KeyboardArrowRight />
				</div>
			</div>
			<div className="list" id={2} onClick={props.display}>
				<div className="listName">
					<WorkOutline />
					<div>Tasks</div>
				</div>
				<div className="listForward">
					<KeyboardArrowRight />
				</div>
			</div>
			<div className="list" id={3} onClick={props.display}>
				<div className="listName">
					<StarRate />
					<div> Rate us</div>
				</div>
				<div className="listForward">
					<KeyboardArrowRight />
				</div>
			</div>
			<div className="list" id={4} onClick={props.display}>
				<div className="listName">
					<HelpOutline />
					<div>Help & Feedback</div>
				</div>
				<div className="listForward">
					<KeyboardArrowRight />
				</div>
			</div>
			<div className="list" id={5} onClick={props.display}>
				<div className="listName">
					<Settings />
					<div> Settings</div>
				</div>
				<div className="listForward">
					<KeyboardArrowRight />
				</div>
			</div>
			<div className="list" id={6} onClick={props.display}>
				<div className="listName">
					<Info />
					<div> About</div>
				</div>
				<div className="listForward">
					<KeyboardArrowRight />
				</div>
			</div>
		</nav>
	);
};
export default Drawer;
