const dummyData = [
  { time: '2020-01-01', value1: 0, value2: 2.6, value3: 3 },
  { time: '2020-01-01', value1: 0.5, value2: 3, value3: 4 },
  { time: '2021-01-01', value1: 1, value2: 7, value3: 5 },
  { time: '2021-01-01', value1: 2, value2: 2, value3: 6 },
  { time: '2021-01-01', value1: 3, value2: 4, value3: 7 },
  { time: '2021-01-01', value1: 3.2, value2: 5, value3: 8 },
  { time: '2021-01-01', value1: 3.3, value2: 8, value3: 9 },
  { time: '2021-01-02', value1: 3.2, value2: 7, value3: 10 },
  { time: '2021-01-02', value1: 3, value2: 6, value3: 9.5 },
  { time: '2021-01-02', value1: 2.7, value2: 5.5, value3: 9 },
  { time: '2021-01-02', value1: 2.6, value2: 2.6, value3: 8.5 },
  { time: '2021-01-02', value1: 2.7, value2: 3, value3: 8 },
  { time: '2021-01-02', value1: 3, value2: 3.5, value3: 7.5 },
  { time: '2021-01-02', value1: 4, value2: 4, value3: 7 },
  { time: '2021-01-03', value1: 4.1, value2: 4.5, value3: 6.5 },
  { time: '2021-01-03', value1: 4.3, value2: 5, value3: 6 },
  { time: '2021-01-04', value1: 4.5, value2: 6, value3: 5.5 },
  { time: '2021-01-04', value1: 4.3, value2: 6.5, value3: 4 },
  { time: '2021-01-04', value1: 4.1, value2: 7, value3: 3.5 },
  { time: '2021-01-04', value1: 3.7, value2: 6.5, value3: 4.5 },
  { time: '2021-01-05', value1: 3.5, value2: 6, value3: 5 },
  { time: '2021-01-06', value1: 3.7, value2: 5.5, value3: 6.5 },
  { time: '2021-01-06', value1: 4, value2: 5, value3: 7 },
  { time: '2021-01-06', value1: 5, value2: 4, value3: 7.5 },
  { time: '2021-01-06', value1: 6, value2: 3, value3: 6 },
  { time: '2022-01-06', value1: 7, value2: 2.5, value3: 5.5 },
  { time: '2022-01-07', value1: 8, value2: 2, value3: 5 },
  { time: '2022-01-07', value1: 9, value2: 1.5, value3: 4 },
  { time: '2022-01-07', value1: 10, value2: 1, value3: 4.5 },
]

const dummyMonthData = [
  { time: '2020-01-01', value1: 2615235, value2: 1100000, value3: 1300000 },
  { time: '2020-01-02', value1: 2613235, value2: 1102300, value3: 1400000 },
  { time: '2021-01-03', value1: 2618235, value2: 3102300, value3: 1500000 },
  { time: '2021-01-04', value1: 2622235, value2: 2102300, value3: 1600000 },
  { time: '2021-01-05', value1: 2626235, value2: 1000000, value3: 1700000 },
  { time: '2021-01-06', value1: 3155235, value2: 2000000, value3: 1800000 },
  { time: '2021-01-07', value1: 2855235, value2: 2000000, value3: 1900000 },
  { time: '2021-01-08', value1: 2908235, value2: 3000000, value3: 1100000 },
  { time: '2021-01-09', value1: 3255235, value2: 2100000, value3: 1110000 },
  { time: '2021-01-10', value1: 3555235, value2: 1000000, value3: 1120000 },
  { time: '2021-01-11', value1: 3355235, value2: 1100000, value3: 1130000 },
  { time: '2021-01-12', value1: 3755235, value2: 1200000, value3: 1140000 },
  { time: '2020-01-13', value1: 3609235, value2: 2600000, value3: 1150000 },
  { time: '2020-01-14', value1: 3755235, value2: 3000000, value3: 1400000 },
  { time: '2021-01-15', value1: 3555235, value2: 1600000, value3: 1500000 },
  { time: '2021-01-16', value1: 3455235, value2: 2000000, value3: 1600000 },
  { time: '2021-01-17', value1: 3755235, value2: 1700000, value3: 1700000 },
  { time: '2021-01-18', value1: 3655235, value2: 1000000, value3: 1800000 },
  { time: '2021-01-19', value1: 3455235, value2: 2000000, value3: 1900000 },
  { time: '2021-01-20', value1: 3600235, value2: 3000000, value3: 1000000 },
  { time: '2021-01-21', value1: 3855235, value2: 4000000, value3: 1100000 },
  { time: '2021-01-22', value1: 3955235, value2: 3400049, value3: 1800000 },
  { time: '2021-01-23', value1: 3861235, value2: 3212312, value3: 2099000 },
  { time: '2021-01-24', value1: 4012235, value2: 4000532, value3: 3000000 },
]

const dummyAllData = [
  { time: '2020-01-01', value1: 0, value2: 2655235, value3: 4655235 },
  { time: '2020-02-01', value1: 2655235, value2: 4655235, value3: 2655235 },
  { time: '2021-03-01', value1: 7674235, value2: 7, value3: 5 },
  { time: '2021-04-01', value1: 3155235, value2: 2, value3: 6 },
  { time: '2021-05-01', value1: 2655235, value2: 4, value3: 7 },
  { time: '2021-06-01', value1: 4655235, value2: 5, value3: 8 },
  { time: '2021-07-01', value1: 5655235, value2: 9655235, value3: 7655235 },
  { time: '2021-08-01', value1: 6655235, value2: 5, value3: 8 },
  { time: '2021-09-01', value1: 7655235, value2: 5, value3: 8 },
  { time: '2021-10-01', value1: 8655235, value2: 5, value3: 8 },
  { time: '2021-11-01', value1: 9655235, value2: 5, value3: 8 },
  { time: '2021-12-01', value1: 10655235, value2: 8655235, value3: 9655235 },
]

const dummyTodayData = [
  { time: '2021-01-01', value1: 0, value2: 2.6, value3: 1 },
  { time: '2021-01-01', value1: 0.5, value2: 3.2, value3: 2 },
  { time: '2021-01-01', value1: 1, value2: 2, value3: 1 },
  { time: '2021-01-01', value1: 2, value2: 2.5, value3: 2 },
  { time: '2021-01-01', value1: 3, value2: 3.1, value3: 1 },
  { time: '2021-01-01', value1: 3.2, value2: 2.8, value3: 2 },
  { time: '2021-01-01', value1: 3.3, value2: 1.2, value3: 1 },
]

export type LineChartData = {
  time: string
  value1: number
  value2: number
  value3: number
}
export default function getLineChartData(type: string): LineChartData[] {
  switch (type) {
    case 'today':
      return dummyTodayData
    case 'month':
      return dummyMonthData
    case 'all':
      return dummyAllData
  }
  return dummyData
}
