import React, { Fragment, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";

import OpinionDataTable from 'containers/OpinionData/OpinionDataTable';
import CaptionElement from 'components/commons/layout/Caption';
import PanelHeader from 'components/containers/PanelHeader/PanelHeader';
import { resultColumns } from 'components/commons/DataTable/MeBeColumns';
import LocalStorageManage from 'LocalStorageManage';
import XLSX from 'xlsx';
import getResult from 'API/getResult';
import { createCSVBuffer } from 'utils';
import { toast } from 'react-toastify';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function mapOpinion(opinion, result) {
	let _opinion = opinion
		.filter(
			o =>
				o.aspect0 === '1' ||
				o.aspect1 === '1' ||
				o.aspect2 === '1' ||
				o.aspect3 === '1' ||
				o.aspect4 === '1' ||
				o.aspect5 === '1' ||
				o.text === ''
		)
		.map(o => ({ id: o.id, text: o.text }));
	const mapResult = result.reduce(
		(obj, item) => Object.assign(obj, { [item.id]: item }),
		{}
	);
	//merge
	_opinion = _opinion.map(o => Object.assign(o, mapResult[o.id]));
	return _opinion;
}

export default function OpinionResult() {
	const [opinions, setOpinions] = useState(
		mapOpinion(
			LocalStorageManage.getOpinionData(),
			LocalStorageManage.getOpinionResult()
		)
	);
	const [columns] = useState(resultColumns);

	const [loading, setLoading] = useState(false);
	const createCSVDownload = () => {
		const _opinions = [...opinions].sort((a, b) => a.id - b.id);
		const sheet = XLSX.utils.json_to_sheet(_opinions);
		sheet.B1.v = 'Opinion';
		sheet.C1.v = 'Price';
		sheet.D1.v = 'Service';
		sheet.E1.v = 'Safety';
		sheet.F1.v = 'Quality';
		sheet.G1.v = 'Delivery';
		sheet.H1.v = 'Authenticity';
		const csv = XLSX.utils.sheet_to_csv(sheet);
		console.log(sheet);
		const universalBOM = '\uFEFF';
		const a = window.document.createElement('a');
		a.setAttribute(
			'href',
			'data:text/csv; charset=utf-8,' +
				encodeURIComponent(universalBOM + csv)
		);
		a.setAttribute('download', 'opinion-result.csv');
		window.document.body.appendChild(a);
		a.click();
		a.remove();
	};

	const refresh = () => {
		setLoading(true);
		const opinionData = LocalStorageManage.getOpinionData();
		getResult(createCSVBuffer(opinionData)).then((response => {
			const result = Object.values(response.data.data.reduce(
				(obj, item) => Object.assign(obj, { [item.id]: item }),
				{}
			));
			LocalStorageManage.setResult(result);
			setOpinions(mapOpinion(opinionData ,result));
			setLoading(false);
			toast.success("Refresh success.")
		})).catch(err => {
			console.log(err);
			toast.error("Something when wrong, try again.");
		})
	}

	return (
		<ToolkitProvider
			keyField="ID"
			data={opinions}
			columns={columns}
			bootstrap4
		>
			{props => (
				<Fragment>
					<PanelHeader
						size="sm"
						content={
							<div className="panel-header__content">
								<div>
									<Button
										className="btn-success mr-2"
										onClick={createCSVDownload}
									>
										Export to CSV
									</Button>
								
								</div>
							</div>
						}
					/>
					<div className="content opinion-data-table">
						<Row>
							<Col xs={12}>
								<Card>
									<CardHeader>
										<CaptionElement>
											Opinion result
										</CaptionElement>
									</CardHeader>
									<CardBody>
										{loading ? (
											<div style={{height: "10rem"}}>
												<RingLoader color={"#36D7B7"} loading={loading} css={override} size={100} />
											</div>
										) : (
											<OpinionDataTable
												{...props.baseProps}
											/>
										)}
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
				</Fragment>
			)}
		</ToolkitProvider>
	);
}
