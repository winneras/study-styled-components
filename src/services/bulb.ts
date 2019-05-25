import MeterReadingsUitl from '../Utils/MeterReadingsUitl';
const API = 'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json';

const BulbApi = () => {
	const readingsUtil = MeterReadingsUitl();
	return {
		getMeterReadings: async ()=> {
			let respone = await fetch(API);
			let readings = await respone.json();
			
			return readingsUtil.processRawReadings(readings.electricity);
		}
	}
};

export default BulbApi;