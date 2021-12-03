import OpinionData from 'views/OpinionData';
import OpinionResult from 'views/OpinionResult';
import OpinionStatistic from 'views/OpinionStatistic';

var dashRoutes = [
	// {
	//   path: "/",
	//   name: "Name",
	//   icon: "icon",
	//   component: Dashboard,
	//   layout: "dashboard",
	// },

	{
		path: '/data',
		name: 'Data',
		icon: 'design_bullet-list-67',
		component: OpinionData,
		layout: '/dashboard',
	},
	{
		path: '/result',
		name: 'Result',
		icon: 'design_app',
		component: OpinionResult,
		layout: '/dashboard',
	},
	{
		path: '/statistic',
		name: 'Statistic',
		icon: 'business_chart-bar-32',
		component: OpinionStatistic,
		layout: '/dashboard',
	},
];
export default dashRoutes;
