import * as React from 'react';

import Wrapper from './wrapper.template';

export class WrapperComponent extends React.Component {
	public render() {
		return <Wrapper>{this.props.children}</Wrapper>;
	}
}

export default WrapperComponent;
