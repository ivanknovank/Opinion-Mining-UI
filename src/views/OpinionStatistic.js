import CaptionElement from 'components/commons/layout/Caption';
import PanelHeader from 'components/containers/PanelHeader/PanelHeader';
import React, { Fragment, useRef } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { mapColumns } from 'components/commons/DataTable/MeBeColumns';
import LocalStorageManage from 'LocalStorageManage';
import ReactApexChart from 'react-apexcharts';

export default function OpinionStatistic() {
	const data = useRef(LocalStorageManage.getOpinionResult());
	const series = [
		{
			name: 'Positive',
			data: count(data.current, 1),
		},
		{
			name: 'Negative',
			data: count(data.current, -1),
		},
	];

	const options = {
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			stackType: '100%',
		},
		plotOptions: {
			bar: {
				horizontal: true,
			},
		},
		stroke: {
			width: 1,
			colors: ['#fff'],
		},
		title: {
			text: 'Statistic',
		},
		xaxis: {
			categories: [...mapColumns].splice(2).map(c => c[1]),
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val + ' comments';
				},
			},
		},
		fill: {
			opacity: 1,
		},
		legend: {
			position: 'top',
			horizontalAlign: 'left',
			offsetX: 40,
		},
	};
	return (
		<Fragment>
			<PanelHeader
				size="sm"
				content={
					<div className="panel-header__content">
						<div></div>
					</div>
				}
			/>
			<div className="content opinion-data-table">
				<Row>
					<Col xs={12}>
						<Card>
							<CardHeader>
								<CaptionElement>
									Opinion Statistic
								</CaptionElement>
							</CardHeader>
							<CardBody>
								<ReactApexChart
									options={options}
									series={series}
									type="bar"
									height={600}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</Fragment>
	);
}
function count(res, stt) {
	res = [...res];
	return [...mapColumns]
		.slice(2)
		.map(c => c[0])
		.map(aspect => res.filter(r => r[aspect] === stt).length);
}
