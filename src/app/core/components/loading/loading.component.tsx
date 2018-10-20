import * as React from 'react';

export default ({ isLoading, error }: { isLoading: boolean; error: string }) => {
	if (isLoading) {
		return <div>Loading...</div>;
	} else if (error) {
		return (
			<div>
				<h2>Sorry, there was a problem loading the page.</h2>
			</div>
		);
	}

	return null;
};
