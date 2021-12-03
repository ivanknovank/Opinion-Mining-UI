import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
	PaginationProvider,
	PaginationTotalStandalone,
	PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';

export default function OpinionDataTable(props) {
	const defaultSorted = [
		{
			dataField: 'id',
			order: 'desc',
		},
	];
	const optionsPagination = {
		custom: true,
		totalSize: props.data.length
	}
	return (
		<Fragment>
			<PaginationProvider pagination={paginationFactory(optionsPagination)}>
				{({ paginationProps, paginationTableProps }) => (
					<Fragment>
						<div className="row">
							<div className="col-auto mr-auto">
								<PaginationTotalStandalone { ...paginationProps } />
							</div>
							<div className="col-auto">
								<PaginationListStandalone className="pull-right" {...paginationProps} />
							</div>
						</div>
						<BootstrapTable
							{...props}
							{...paginationTableProps}
							striped
							hover
							condensed
							defaultSorted={defaultSorted}
							noDataIndication="Data is empty"
						/>
					</Fragment>
				)}
			</PaginationProvider>
		</Fragment>
	);
}
