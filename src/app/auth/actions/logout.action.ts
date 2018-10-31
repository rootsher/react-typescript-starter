export default function login() {
	return (dispatch: any, getState: any, { services }: any) => {
		dispatch({ type: 'AUTH_LOGOUT' });
	};
}
