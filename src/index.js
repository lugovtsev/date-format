import './style';
import data from './assets/schedules';
// import { lightFormat } from 'date-fns';
import moment from 'moment';

const getRecord = (days, currentDay) => ({
    days: [currentDay],
    start: days[currentDay].start,
    end: days[currentDay].end
})

let unitedPeriods = [];

data.schedules.forEach(schedule => {
    let period = [];
    let previousDay = null;
    let j = 0;
    const { order, days } = schedule;
    
    // объединяем последовательные дни с одинаковым временем
    for (let i = 0; i < order.length; i++) {
        const currentDay = order[i];
        const isScheduledDay = currentDay in days;

        // если дня нет в расписании
        if (!isScheduledDay) {
            continue;
        }
    
        // первый день в расписании
        if (!previousDay && isScheduledDay) {
            period[j] = getRecord(days, currentDay);
            previousDay = order[i]
            continue;
        }
    
        // день идет сразу за предыдущим в порядке дней недели
        if (isScheduledDay && order.findIndex(el => el === previousDay) === i - 1) {
            // если время двух последовательных дней одинаково - добавляем этот день в текущую запись периода
            if (days[currentDay].start === days[previousDay].start && days[currentDay].end === days[previousDay].end) {
                period[j].days.push(currentDay);
            } else {
                // иначе создаем следующую запись периода
                j++
                period[j] = getRecord(days, currentDay);
            }
            previousDay = order[i]
            continue;
        }
    
        // день после пропуска в расписании
        j++
        period[j] = getRecord(days, currentDay)
        previousDay = order[i]
    }

    // форматируем дни и время в полученной записи
    const formattedPeriod =[]
    period.forEach(record => {
        const days = record.days.length === 1
            ? record.days[0].substr(0,3)
            : `${record.days[0].substr(0,3)} - ${record.days[record.days.length - 1].substr(0,3)}`

        const [ hStart, mStart ] = record.start.toString().split('.')
        const [ hEnd, mEnd ] = record.end.toString().split('.')
        const time = `${moment(`${hStart}:${Number('0.' + mStart) * 60}`, 'h:mm').format('h:mm A')} - ${moment(`${hEnd}:${Number('0.' + mEnd) * 60}`, 'h:mm').format('h:mm A')}`;
        formattedPeriod.push(`${days}: ${time}`)
    })

    unitedPeriods.push(formattedPeriod)
});





document.getElementById('box').innerHTML = `<pre>${JSON.stringify(unitedPeriods, null, '\t')}</pre>`

