import  * as React from 'react';
import  * as ReactDOM from 'react-dom';
import UsageChart from '../UsageChart';

describe('UsageChart', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
				<UsageChart meterReadings={[]} />,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
});
