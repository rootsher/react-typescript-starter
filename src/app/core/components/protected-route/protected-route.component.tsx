import * as React from 'react';
import { connect } from 'react-redux';

import ProtectedRoute from './protected-route.template';

interface IProps {
	path: string;
	session: { isAuthenticated: boolean };
}

class ProtectedRouteComponent extends React.Component<IProps, any> {
	public render() {
		const { session, ...rest } = this.props;

		return <ProtectedRoute isAuthenticated={session.isAuthenticated} {...rest} />;
	}
}

export default connect((state: { session: object }, ownProps) => ({
	session: state.session,
	...ownProps
}))(ProtectedRouteComponent);
