import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';

class ModalEntry extends React.Component {
	state = {
		modal: false,
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password1: '',
		password2: '',
		form: '',
		alert: {
			color: '',
			message: ''
		}
	}

	//GENERAL FUNCTION
	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			alert: {
				color: '',
				message: ''
			}
		})
	}

	validation = (form) => {
		for (let input in form) {
			if (form[input] === '')
				return true;
		}
		return false;
	}

	incompleteForm = () => {
		this.setState({
			alert: {
				color: 'danger',
				message: 'Yo! Fill everything out, ya nerd!'
			}
		})
	}

	passwordMisMatch = () => {
		this.setState({
			alert: {
				color: 'danger',
				message: "Shoop da woop! Your passwords don't match, nerd!"
			}
		})
	}

	//LOGIN SECTION
	loginModal = () => {
		this.setState({
			form: 'login'
		});
		this.toggleModal();
	}

	login = () => {
		const loginData = {
			email: this.state.email,
			password: this.state.password1
		}

		if (this.validation(loginData)) {
			console.log('EMPTY')
			this.incompleteForm();
		} else {
			console.log(loginData);
			//[NOTE]: THIS IS WHERE AXIOS GOES.
			//[NOTE]: WILL HAVE TO ADD 'EVENT' AND 'EVENT.PREVENTDEFAULT()' AS WELL
			this.setState({
				email: '',
				password: '',
			})
			this.toggleModal();
		}
	}

	//SIGN UP SECTION
	signUpModal = () => {
		this.setState({
			form: 'signUp'
		});
		this.toggleModal();
	}

	signUp = () => {

		const signUpData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			username: this.state.username,
			password1: this.state.password1,
			password2: this.state.password2,
		}

		if (this.validation(signUpData)) {
			this.incompleteForm();
		} else if (this.state.password1 !== this.state.password2) {
			this.passwordMisMatch();
		} else {
			console.log(signUpData);
			//[NOTE]: THIS IS WHERE AXIOS GOES.
			//[NOTE]: WILL HAVE TO ADD 'EVENT' AND 'EVENT.PREVENTDEFAULT()' AS WELL

			this.setState({
				firstName: '',
				lastName: '',
				email: '',
				username: '',
				password1: '',
				password2: '',
			})
			this.toggleModal();
		}
	}

	render() {
		return (
			<div>
				<div>
					<Button color="primary" onClick={this.loginModal}>Login</Button>
					<Button color="primary" onClick={this.signUpModal}>Sign Up</Button>
				</div>

				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>

					{this.state.form === 'login' ?
						<div>
							<ModalBody>
								<FormLogin handleChange={this.handleChange} />
							</ModalBody>
							<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
							<ModalFooter>
								<Button onClick={this.toggleModal}>Close</Button>
								<Button onClick={this.login}>Submit</Button>
							</ModalFooter>
						</div>
						: null}
					{this.state.form === 'signUp' ?
						<div>
							<ModalBody>
								<FormSignUp handleChange={this.handleChange} />
							</ModalBody>
							<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
							<ModalFooter>
								<Button onClick={this.toggleModal}>Close</Button>
								<Button onClick={this.signUp}>Submit</Button>
							</ModalFooter>
						</div>
						: null}
				</Modal>
			</div>
		)
	}
}

export default ModalEntry;