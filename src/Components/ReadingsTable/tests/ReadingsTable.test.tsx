import  * as React from 'react';
import  * as ReactDOM from 'react-dom';
import ReadingsTable from '../ReadingsTable';

describe('ReadingsTable', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
				<ReadingsTable meterReadings={[]} />,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
});
