import MeterReadingsUitl from '../MeterReadingsUitl';
import * as moment from 'moment';
const readingsUtil = MeterReadingsUitl();

const testData_raw = [
	{
		cumulative: 17600,
		readingDate: '2017-03-31T00:00:00.000Z',
		unit: 'kWh'
	},
	{
		cumulative: 17859,
		readingDate: '2017-04-30T00:00:00.000Z',
		unit: 'kWh'
	}
];

const testData = [
	{
		cumulative: 17600,
		readingDate: moment.utc('2017-03-31T00:00:00.000Z'),
		unit: 'kWh'
	},
	{
		cumulative: 17859,
		readingDate: moment.utc('2017-04-30T00:00:00.000Z'),
		unit: 'kWh'
	}
];
const testData2 = [
	{
		cumulative: 17600,
		readingDate: moment.utc('2017-03-31T00:00:00.000Z'),
		unit: 'kWh'
	},
	{
		cumulative: 17700,
		readingDate: moment.utc('2017-04-30T00:00:00.000Z'),
		unit: 'kWh'
	},
	{
		cumulative: 18000,
		readingDate: moment.utc('2017-05-31T00:00:00.000Z'),
		unit: 'kWh'
	}
];

const testData3 = [
	{
		cumulative: 0,
		readingDate: moment.utc('2017-03-28T00:00:00.000Z'),
		unit: 'kWh'
	},
	{
		cumulative: 330,
		readingDate: moment.utc('2017-04-30T00:00:00.000Z'),
		unit: 'kWh'
	},
	{
		cumulative: 540,
		readingDate: moment.utc('2017-05-21T00:00:00.000Z'),
		unit: 'kWh'
	}
];
describe('MeterReadingsUitl.processRawReadings', () => {
	it('should parse date using moment', () => {
		let result = readingsUtil.processRawReadings(testData_raw);
		expect(result.length).toBe(2);
		expect(result[0].readingDate.format('YY-MM-DD')).toBe('17-03-31');
	});
});

describe('MeterReadingsUitl.calcMonthlyUsage', () => {
	it('calcMonthlyUsage should be able to handle single month', () => {
		let result = readingsUtil.calcMonthlyUsage(testData);
		expect(result.length).toBe(1);
		expect(result[0].date).toBe('04/17');
	});
});

describe('MeterReadingsUitl.calcMonthlyUsage', () => {
	it('calcMonthlyUsage should be able to handle random data', () => {
		let result = readingsUtil.calcMonthlyUsage(testData3);
		expect(result.length).toBe(2);
		expect(result[1].date).toBe('05/17');
		expect(result[1].energyUsage).toBe(310);
	});
});
