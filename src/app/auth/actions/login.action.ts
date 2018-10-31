export const AUTH_LOGIN = 'AUTH_LOGIN';

export default function login() {
	return (dispatch: any, getState: any, { services }: any) => {
		dispatch({ type: AUTH_LOGIN });
	};
}
