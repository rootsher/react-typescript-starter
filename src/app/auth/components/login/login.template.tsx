import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'formik';

import './login.css';

export default ({ errors, touched }: any) => (
	<section className="view__login">
		<Form>
			<div className="input-group">
				<Field name="email" type="email" placeholder="Enter e-mail" />
				{errors.email && touched.email ? <div>{errors.email}</div> : null}
			</div>
			<div className="input-group">
				<Field name="password" type="password" placeholder="Enter password" />
				{errors.password && touched.password ? <div>{errors.password}</div> : null}
			</div>
			<div>
				<button type="submit">Log in</button>
			</div>
		</Form>
	</section>
);
