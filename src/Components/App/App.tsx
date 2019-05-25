import * as React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import * as meterReadingsData from '../../data/meterReadingsSample.json';
import ReadingsTable from '../ReadingsTable/ReadingsTable';
import UsageChart from '../UsageChart/UsageChart';
import BulbApi from '../../services/bulb';
import MeterReadingsUitl from '../../Utils/MeterReadingsUitl';
import { FullWithPane } from './Atoms';

const App = () => {
  const readingsUtil = MeterReadingsUitl();
  const [meterReadings, setMeterReadings] = React.useState([]);
  /*readingsUtil.processRawReadings(meterReadingsData.electricity)*/
  React.useEffect(() => {
    const bulbApi = BulbApi();
    const readings = bulbApi.getMeterReadings();
    readings.then(data => {
      setMeterReadings(data);
    });
  }, []);

  return (
    <div>
      <h2>Energy Usage</h2>
      <FullWithPane>
        <UsageChart meterReadings={meterReadings} />
      </FullWithPane>
      <h2>Meter Readings</h2>
      <FullWithPane>
        <ReadingsTable meterReadings={meterReadings} />
      </FullWithPane>
    </div>
  );
};
export default App;
