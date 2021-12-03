import React from 'react';
import ReactDOM from 'react-dom';

// import css, scss
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/now-ui-dashboard.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'containers/App';
import 'utils.js';
function importAll(r) {
	r.keys().forEach(r);
}
importAll(require.context('./components', true, /\.scss$/));
importAll(require.context('./containers', true, /\.scss$/));


ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// ReactDOM.render(
// <React.StrictMode>
//   <App />
// </React.StrictMode>,
//   document.getElementById('root')
// );
