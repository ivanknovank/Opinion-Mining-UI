import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Input, Row, Button } from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import XLSX from 'xlsx';

import PanelHeader from 'components/containers/PanelHeader/PanelHeader';
import OpinionDataTable from 'containers/OpinionData/OpinionDataTable';
import AddOpinionModel from 'containers/OpinionData/AddOpinionModel';
import CaptionElement from 'components/commons/layout/Caption';
import ClearDataDialog from 'containers/OpinionData/ClearDataDialog';

import { dataColumns } from 'components/commons/DataTable/MeBeColumns';
import LocalStorageManage from 'LocalStorageManage';
import { createCSVBuffer } from 'utils.js';
import getResult from 'API/getResult';
import { uuid as genUUID } from 'uuidv4';
import { toast } from 'react-toastify';
import { csvTextToJSON } from 'utils';
import { mapColumns } from 'components/commons/DataTable/MeBeColumns';

export default function OpinionData() {
	const [addOpinionModal, setAddOpinionModal] = useState(false);
	const [clearDataDialog, setClearDataDialog] = useState(false);
	const [columns] = useState(dataColumns);
	const [opinions, setOpinions] = useState(LocalStorageManage.getOpinionData());
	const [_, setUUID] = useState(genUUID())
	const maxID = useRef(
		opinions.length === 0 ? 0 : Math.max(...opinions.map(o => +o.id))
	);

	const addOpinion = opinion => {
		maxID.current++;
		opinion.id = '' + maxID.current;
		const _opinions = [...opinions];
		_opinions.unshift(opinion);
		LocalStorageManage.addIdUpdate(maxID.current);
		LocalStorageManage.setOpinions(_opinions)
		setOpinions(_opinions);
		toast.success("Add success");
	};

	const clearData = () => {
		maxID.current = 0;
		setOpinions([]);
		LocalStorageManage.clearData();
		toast.success("Removed all done.")
	};

	const processData = dataString => {
		let list = csvTextToJSON(dataString);
		// prepare columns list from headers
		// const columns = headers.map(c => ({
		// 	name: c,
		// 	selector: c,
		// }));
		LocalStorageManage.clearData();
		setOpinions([...list]);
		const _opinions = [...list].sort((a, b) => +a.id - +b.id);
		maxID.current = _opinions.length === 0 ? 0 : Math.max(..._opinions.map(o => +o.id))
		LocalStorageManage.setOpinions(_opinions);
		LocalStorageManage.setIdUpdate(_opinions.map(o => o.id));
		toast.success("Load csv done.");
	};

	const importFromCSV = e => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = evt => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: 'binary' });
			const ws = wb.Sheets[wb.SheetNames[0]];
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
			processData(data);
			e.target.value = null;
		};
		reader.readAsBinaryString(file);
	};

	const createCSVDownload = () => {
		const _opinions = [...opinions].sort((a, b) => a.id - b.id);
		const sheet = XLSX.utils.json_to_sheet(_opinions);
		const csv = XLSX.utils.sheet_to_csv(sheet);
		const universalBOM = '\uFEFF';
		const a = window.document.createElement('a');
		a.setAttribute(
			'href',
			'data:text/csv; charset=utf-8,' +
				encodeURIComponent(universalBOM + csv)
		);
		a.setAttribute('download', 'opinion-data.csv');
		window.document.body.appendChild(a);
		a.click();
		a.remove();
		toast.success("Export successfully.")
	};


	useEffect(() => {
		// console.log(opinions.filter(o => (!o.aspect0 && !o.aspect2 && !o.aspect3 && !o.aspect4 && !o.aspect5)));
		const opinionUpdates = opinions.filter(o =>
			LocalStorageManage.getIdUpdate().includes(o.id)
		);
		if (opinionUpdates.length > 0) {
			let buffer = createCSVBuffer(opinionUpdates);
			LocalStorageManage.setIdUpdate([]);
			getResult(buffer).then(response => {
				
				const csvResponse = response.data;
				
				let data = csvTextToJSON(csvResponse);

				//hot fix name
				let aliasName = data.map(d => {
					const obj = {...d}
					mapColumns.forEach(k => {
						if(d[k[1]]) {
							obj[k[0]] = d[k[1]]
						}
					})
					return obj;
				})

				const mapResponse = aliasName.reduce(
					(obj, item) => Object.assign(obj, { [item.id]: item }),
					{}
				);
				const result = LocalStorageManage.getOpinionResult().reduce(
					(obj, item) => Object.assign(obj, { [item.id]: item }),
					{}
				);

				const merge = Object.values({
					...result,
					...mapResponse,
				});
				console.log(merge);
				LocalStorageManage.setResult(merge);
				// LocalStorageManage.setIdUpdate(resultKey.subtract(responseKey));
				setUUID(genUUID());
			
				// console.log(resultKey.subtract(responseKey));
			}).catch(err => {
				console.log(err);
				toast.error("Something when wrong, try again!!!");
			});
			LocalStorageManage.setIdUpdate([]);
		}
	}, [LocalStorageManage.getIdUpdate()]);

	return (
		<Fragment>
			<ToolkitProvider
				keyField="id"
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
										{/* <Button className="btn-primary">
										Import
									</Button> */}
										<label
											htmlFor="csv-import"
											className="mr-2"
										>
											<div className="btn btn-primary">
												Read from CSV
											</div>
										</label>
										<Input
											type="file"
											id="csv-import"
											style={{
												opacity: 0,
												position: 'absolute',
												zIndex: -1,
											}}
											onChange={importFromCSV}
										/>
										{/* <ExportCSVButton className="btn-primary" {...props.csvProps}>
										Export to CSV!!
									</ExportCSVButton> */}
										<Button
											className="btn-success mr-2"
											onClick={createCSVDownload}
										>
											Export to CSV
										</Button>
										<Button
											className="btn-danger"
											onClick={() => setClearDataDialog(true)}
										>
											Clear data
										</Button>
										<Button
											onClick={() => setAddOpinionModal(true) }
											className="btn-info pull-right"
										>
											Add
										</Button>
										<hr />
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
												Opinion data
											</CaptionElement>
										</CardHeader>
										<CardBody>
											<OpinionDataTable
												{...props.baseProps}
												cellEdit={cellEditFactory({
													mode: 'click',
													blurToSave: true,
													afterSaveCell: (oldValue, newValue, row, column ) => {
														// console.log(column)
														if (oldValue !== newValue) {
															const opinion_ = [...opinions];
															const changeOpinion = opinion_.filter(o => o.id === row.id)[0]
															changeOpinion[column.dataField] = newValue;
															LocalStorageManage.addIdUpdate(changeOpinion.id);
															setOpinions( opinion_);
														}
													},
												})}
											/>
										</CardBody>
									</Card>
								</Col>
							</Row>
							<AddOpinionModel
								modal={addOpinionModal}
								setModal={setAddOpinionModal}
								submit={addOpinion}
							/>
						</div>
						<ClearDataDialog
							modal={clearDataDialog}
							setModal={setClearDataDialog}
							submit={clearData}
						/>
					</Fragment>
				)}
			</ToolkitProvider>
		</Fragment>
	);
}
