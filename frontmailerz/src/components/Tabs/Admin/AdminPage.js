import React, { Component } from "react";
import "./AdminPage.css";
import Mailman from './Mailman'
import MailmanBatches from './MailManBatches'
import MailmanLetters from './MailmanLetters'


class AdminPage extends Component {
	render() {
		return (
			<div style={{ height: "100%" }}>
				<Mailman/>
				<MailmanBatches/>
				<MailmanLetters/>
			</div>
		);
	}
}

export default AdminPage;
