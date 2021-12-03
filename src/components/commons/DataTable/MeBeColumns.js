import { Type } from 'react-bootstrap-table2-editor';

const KEY = 0;
const VALUE = 1;
const mapColumns = [
	['id','ID'],
	['text','Opinion'],
	['aspect0','Price'],
	['aspect1','Service'],
	['aspect2','Safety'],
	['aspect3','Quality'],
	['aspect4','Delivery'],
	['aspect5','Authenticity']
];

const reMapColumns = mapColumns.map(c => ({[c[0]] : {key: c[0], value: c[1]}}))

const aspectsInputColumn = [];
for (let i = 2; i < mapColumns.length; i++) {
	aspectsInputColumn.push({
		dataField: mapColumns[i][KEY],
		text: mapColumns[i][VALUE] || mapColumns[i][KEY],
		
		sort: true,
		sortCaret: () => null,
		
		editor: {
			type: Type.CHECKBOX,
			value: '1:0',
		},
		
		headerAlign: 'center',
		headerClasses: 'table-header',
		align: () => 'center',
		editCellStyle: () => ({ textAlign: 'center' }),
		
	});
}

const aspectsOutputColumn = [];
for (let i = 2; i < mapColumns.length; i++) {
	aspectsOutputColumn.push({
		dataField: mapColumns[i][KEY],
		text: mapColumns[i][VALUE] || mapColumns[i][KEY],

		headerAlign: 'center',
		align: () => 'center',
		editCellStyle: () => ({ textAlign: 'center' }),

		sort: true,
		sortCaret: () => null,
	});
}

const dataColumns = [
	{
		dataField: mapColumns[0][KEY],
		text: mapColumns[0][VALUE],
		headerAlign: 'center',
		align: () => 'center',
		headerClasses: 'table-header',
		sort: true,
		hidden: false,
		sortFunc: (a, b, order, dataField) => {
			let _a = parseInt(a, 10);
			let _b = parseInt(b, 10);
			return order === 'asc' ? _b - _a : _a - _b;
			
		  }
	},
	{
		dataField: mapColumns[1][KEY],
		text: mapColumns[1][VALUE],
		headerAlign: 'center',
		sortCaret: () => null,
		sort: true,
		editor: {
			type: Type.TEXTAREA,
		},
		editCellClasses: 'table-column__opinion-input',
		headerClasses: 'w-75 table-header',
		formatter: e => <div className="table-column__opinion">{e}</div>,
		sortFunc: (a, b, order, dataField) => {
			let _a = parseInt(a, 10);
			let _b = parseInt(b, 10);
			return order === 'asc' ? _b - _a : _a - _b;
		  }
	},
	...aspectsInputColumn,
];

const resultColumns = [
	{
		dataField: mapColumns[0][KEY],
		text: mapColumns[0][VALUE],
		align: () => 'center',
		headerAlign: 'center',
		headerClasses: 'table-header',
		sort: true,
		hidden: false,
		sortFunc: (a, b, order, dataField) => {
			let _a = parseInt(a, 10);
			let _b = parseInt(b, 10);
			return order === 'asc' ? _b - _a : _a - _b;
			
		  }
	},
	{
		dataField: mapColumns[1][KEY],
		text: mapColumns[1][VALUE],
		headerAlign: 'center',
		sortCaret: () => null,
		sort: true,
		headerClasses: 'w-75 table-header',
		formatter: e => <div className="table-column__opinion">{e}</div>,
	},
	...aspectsOutputColumn
];

export { dataColumns, resultColumns, reMapColumns, mapColumns};
