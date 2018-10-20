import * as React from 'react';
import { withRouter } from 'react-router-dom';

import Routing from './routing.template';

class RoutingComponent extends React.PureComponent<any, any> {
	public render() {
		return <Routing />;
	}
}

export default withRouter(RoutingComponent);
