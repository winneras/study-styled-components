import * as React from 'react';
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer
} from 'recharts';
import MeterReadingsUitl from '../../Utils/MeterReadingsUitl';
import * as moment from 'moment';

const UsageChart = ({ meterReadings }) => {
	const readingsUtil = MeterReadingsUitl();
	const energyUsageData = readingsUtil.calcMonthlyUsage(meterReadings);
	return (
		<ResponsiveContainer>
			<BarChart width={1400} height={400} data={energyUsageData}>
				<XAxis dataKey="date" />
				<YAxis dataKey="energyUsage" />
				<CartesianGrid horizontal={false} />
				<Tooltip />
				<Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default UsageChart;
