import React, { Component } from "react";
import './Pages.css'
const githubUrl = "https://github.com/briantical/MailerZ";
export default class About extends Component {
	render() {
		return (
			<div className="pageContainer">
				<div className="pageHeader">ABOUT US</div>
				<div className="pageContent">
					<div>
						The MailerZ project is a task to build a Mail delivery management system.
						It is intended to fullfil the following tasks.
						<ul className="assignmentList">
							<li>
								Enable company staﬀ to view undelivered mails which need to be delivered to diﬀerent clients
							</li>
							<li>
								Enable company staﬀ to indicate that the mail has been delivered, the person who received it and the time it was received
							</li>
							<li>
								Once the mail has been delivered, it should be shifted from the undelivered mails to the delivered mails section
							</li>
							<li>
								The web application administrator should be able to log into the system and add,new mails that need to be delivered.
							</li>
						</ul>
						<div className="projectContent">						
								The Project was built by LUTAAYA BRIAN IVAN																
								The code is available on his GITHUB Account
								<a className="links" href={githubUrl}><b><i>{` ${githubUrl}`}</i></b></a>						
						</div>
					</div>					
				</div>
			</div>
		);
	}
}
