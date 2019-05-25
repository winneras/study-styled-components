import * as moment from 'moment';

/**
 * Check whether a moment object is the end of the month.
 * Ignore the time part.
 * @param {moment} mmt
 */
const isEndOfMonth = mmt => {
	// startOf allows to ignore the time component
	// we call moment(mmt) because startOf and endOf mutate the momentj object.
	return moment
		.utc(mmt)
		.startOf('day')
		.isSame(
			moment
				.utc(mmt)
				.endOf('month')
				.startOf('day')
		);
};

/**
 * Returns the difference between two moment objects in number of days.
 * @param {moment} mmt1
 * @param {moment} mmt2
 */
const getDiffInDays = (mmt1, mmt2) => {
	return mmt1.diff(mmt2, 'days');
};

/**
 * Return the number of days between the given moment object
 * and the end of the month of this moment object.
 * @param {moment} mmt
 */
const getDaysUntilMonthEnd = mmt => {
	return getDiffInDays(moment.utc(mmt).endOf('month'), mmt);
};

const MeterReadingsUitl = () => {
	const sortByReadingDate = (a, b) => {
		if (a.readingDate.isBefore(b.readingDate)) {
			return -1;
		} else if (a.readingDate.isSame(b.readingDate)) {
			return 0;
		}
		return 1;
	};

	const getMonthEndEstList = readings => {
		let total = readings.length;
		let dailyUsage = 0;
		let estMonthEnd;
		let endMonth;
		let result = [];
		let days;
		let energyUsage;
		let daysUnitlMonthEnd;
		for (let i = 0; i < total - 1; i++) {
			energyUsage = readings[i + 1].cumulative - readings[i].cumulative;
			days = getDiffInDays(
				readings[i + 1].readingDate,
				readings[i].readingDate
			);
			dailyUsage = energyUsage / days;
			estMonthEnd =
				readings[i].cumulative +
				getDaysUntilMonthEnd(readings[i].readingDate) * dailyUsage;
			endMonth = readings[i].readingDate.endOf('month');
			result.push({
				cumulative: estMonthEnd,
				readingDate: endMonth
			});
		}
		if (result.length < readings.length) {
			estMonthEnd =
				readings[total - 1].cumulative +
				getDaysUntilMonthEnd(readings[total - 1].readingDate) * dailyUsage;
			endMonth = readings[total - 1].readingDate.endOf('month');
			result.push({
				cumulative: estMonthEnd,
				readingDate: endMonth
			});
		}

		return result;
	};
	return {
		processRawReadings: readings => {
			let result = readings.map(item => {
				let newItem = { ...item };
				newItem.readingDate = moment.utc(item.readingDate);
				return newItem;
			});
			return result;
		},
		calcMonthlyUsage: processedReadings => {
			if (processedReadings.length <= 0) {
				return [];
			}
			let readings = processedReadings.slice(0);
			readings.sort(sortByReadingDate);
			let estMonthEndReadings = getMonthEndEstList(readings);
			const energyUsageData = [];
			for (let i = 0; i < estMonthEndReadings.length - 1; i++) {
				const energyUsage =
					estMonthEndReadings[i + 1].cumulative -
					estMonthEndReadings[i].cumulative;
				energyUsageData.push({
					date: estMonthEndReadings[i + 1].readingDate.format('MM/YY'),
					energyUsage: Math.round(energyUsage)
				});
			}
			return energyUsageData;
		}
	};
};

export default MeterReadingsUitl;
