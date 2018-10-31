import * as React from 'react';
import { Switch, Route } from 'react-router';

import Login from './auth/components/login/login.route';

import Home from './base/components/home/home.route';
import NotFound from './base/components/not-found/not-found.route';
import ProtectedRoute from './core/components/protected-route/protected-route.route';
import Wrapper from './common/components/wrapper/wrapper.component';

export default () => (
	<React.Fragment>
		<Switch>
			<Route path="/auth/login" exact={true} component={Login} />
			<ProtectedRoute>
				<Wrapper>
					<Switch>
						<Route path="/" exact={true} component={Home} />
						<Route component={NotFound} />
					</Switch>
				</Wrapper>
			</ProtectedRoute>
		</Switch>
	</React.Fragment>
);
