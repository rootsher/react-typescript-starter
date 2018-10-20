import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
	isAuthenticated: boolean;
	children?: React.ReactNode;
	component?: typeof React.Component; // new() => React.Component
}

export default ({ isAuthenticated, children, component: Component, ...rest }: IProps) => {
	const render = (props: any) =>
		isAuthenticated ? (
			Component ? (
				<Component {...props} />
			) : (
				children
			)
		) : (
			<Redirect
				to={{
					pathname: '/auth/login',
					state: { from: props.location }
				}}
			/>
		);

	return <Route {...rest} render={render} />;
};
