import Dashboard from 'layouts/Dashboard';
import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function App() {
	return (
		<Fragment>
			<Switch>
				<Route
					path="/dashboard"
					render={props => <Dashboard {...props} />}
				/>
				<Redirect to="/dashboard/" />
			</Switch>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div align="center">{'From NuA with <3'}</div>
		</Fragment>
	);
}
