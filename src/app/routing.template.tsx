import * as React from 'react';
import { Switch, Route } from 'react-router';

import Home from './base/components/home/home.route';
import NotFound from './base/components/not-found/not-found.route';
import ProtectedRoute from './core/components/protected-route/protected-route.route';
import Wrapper from './common/components/wrapper/wrapper.component';

export default () => (
	<React.Fragment>
		<Switch>
			<ProtectedRoute path="/">
				<Wrapper>
					<Route path="/" exact={true} component={Home} />
				</Wrapper>
			</ProtectedRoute>
			<Route component={NotFound} />
		</Switch>
	</React.Fragment>
);
