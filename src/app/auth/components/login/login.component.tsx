import * as React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import login from '../../actions/login.action';
import Login from './login.template';
import { LoginSchema } from './login.schema';

class LoginComponent extends React.Component<any, any> {
	public static defaultProps = {};

	public render() {
		return (
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				validationSchema={LoginSchema}
				onSubmit={values => this.onSubmit(values)}>
				{props => <Login {...props} />}
			</Formik>
		);
	}

	private async onSubmit({ email, password }: { email: string; password: string }) {
		const { history, location } = this.props;

		await this.props.login({ email, password });

		if (location.state && location.state.from) {
			history.push(location.state.from.pathname);
		} else {
			history.push('/');
		}
	}
}

const mapStateToProps = (state: any): any => ({
	session: state.session
});

const mapDispatchToProps = (dispatch: any) => ({
	login: () => dispatch(login())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent);
