import React, { Component } from "react";
import "./Header.css";
import DrawerButton from "../Drawer/DrawerButton";
class Header extends Component {
	render() {
		return (
			<header className="headerStyle">
				<nav className="header_navigation">
					<div className="header_drawer">
						<DrawerButton click={this.props.clickDrawer} />
					</div>
					<div className="header_logo">
						<a href="/">MailerZ</a>
					</div>
					<div className="spacer" />
					<div className="header_tabs">
						<ul>
							<li>
								<a href="">Settings</a>
							</li>
							<li>
								<a href="">Help</a>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;
