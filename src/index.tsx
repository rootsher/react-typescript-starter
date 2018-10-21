import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import HotWire from 'hot-wire';
import { IntlProvider, addLocaleData } from 'react-intl';

import * as plLocaleData from 'react-intl/locale-data/pl';

import './assets/scss/style.css';

import pl from './app/core/i18n/pl';
// import en from './app/core/i18n/en';

// modules:
import { module as baseModule } from './app/base/base.module';
import { module as commonModule } from './app/common/common.module';
import { module as coreModule } from './app/core/core.module';

import App from './app/routing.component';
import registerServiceWorker from './registerServiceWorker';
import flattenObject from './app/core/utils/flettenObject';

addLocaleData(plLocaleData);

const { services: baseServices, reducers: baseReducers } = baseModule();
const { services: commonServices } = commonModule();
const { rootReducer, services: coreServices } = coreModule();

const history = createBrowserHistory({
	basename: '/'
});
const composeEnhancer = /*window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || */ compose;

const container = new HotWire().wire({
	services: {
		...baseServices,
		...commonServices,
		...coreServices
	}
});

const reducers = combineReducers({
	...baseReducers
});

container.then((services: any) => {
	const middlewares = [routerMiddleware(history), thunkMiddleware.withExtraArgument({ services })];

	if (process.env.NODE_ENV === 'development') {
		const { createLogger } = require('redux-logger');

		middlewares.push(createLogger());
	}

	const store = createStore(
		connectRouter(history)(rootReducer({ reducers })),
		composeEnhancer(applyMiddleware(...middlewares))
	);

	const render = (Component: any) =>
		ReactDOM.render(
			<Provider store={store}>
				<IntlProvider locale="pl" messages={flattenObject(pl)}>
					<ConnectedRouter history={history}>
						<Component />
					</ConnectedRouter>
				</IntlProvider>
			</Provider>,
			document.getElementById('root')
		);

	render(App);

	if (module.hot) {
		module.hot.accept('./app/routing.component', () => render(require('./app/routing.component').default));
		module.hot.accept('./app/core/reducers/root.reducer', () => {
			store.replaceReducer(connectRouter(history)(rootReducer));
		});
	}

	registerServiceWorker();
});
