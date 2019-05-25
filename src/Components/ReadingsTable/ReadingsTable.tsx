import * as React from 'react';
import * as moment from 'moment';
import MeterReadingsUitl from '../../Utils/MeterReadingsUitl';
import { Table, ThDate, TdDate, TdShort } from './Atoms';

const ReadingsTable = ({meterReadings}) => {
	const readingsUtil = MeterReadingsUitl();
	let res = readingsUtil.calcMonthlyUsage(meterReadings);
	const meterReadingsRows = meterReadings.map(reading => (
		<tr key={reading.readingDate.format('YYYYMMDD')}>
			<TdDate>{reading.readingDate.format('DD/MM/YYYY')}</TdDate>
			<TdShort>{reading.cumulative}</TdShort>
			<TdShort>{reading.unit}</TdShort>
		</tr>
	));
	return (
		<Table>
			<tbody>
				<tr>
					<ThDate>Date</ThDate>
					<th>Reading</th>
					<th>Unit</th>
				</tr>
				{meterReadingsRows}
			</tbody>
		</Table>
	);
};

export default ReadingsTable;