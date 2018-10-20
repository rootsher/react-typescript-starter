import * as React from 'react';
import { connect } from 'react-redux';
import './home.css';
import addBucks from '../../../core/actions/addBucks.action';
import addUserBucks from '../../../core/actions/addUserBucks.action';

interface IProps {
	bucks: number;
	userBucks: number;
	dispatch: any;
}

const Home = ({ bucks, userBucks, dispatch }: IProps) => (
	<section className="route__home">
		<h2>home - react-typescript-starter</h2>
		<button onClick={() => dispatch(addBucks())}>{bucks}</button>
		<button onClick={() => dispatch(addUserBucks())}>{userBucks}</button>
	</section>
);

export default connect((state: any) => ({
	bucks: state.user.wallet.bucks,
	userBucks: state.app.user.wallet.bucks
}))(Home);
