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
  { time: '2020-01-01', value1: 3, value2: 2.6, value3: 3 },
  { time: '2020-01-02', value1: 2, value2: 3, value3: 4 },
  { time: '2021-01-03', value1: 5, value2: 7, value3: 5 },
  { time: '2021-01-04', value1: 4, value2: 2, value3: 6 },
  { time: '2021-01-05', value1: 6, value2: 4, value3: 7 },
  { time: '2021-01-06', value1: 3, value2: 5, value3: 8 },
  { time: '2021-01-07', value1: 6, value2: 5, value3: 8 },
  { time: '2021-01-08', value1: 4, value2: 5, value3: 8 },
  { time: '2021-01-09', value1: 2, value2: 5, value3: 8 },
  { time: '2021-01-10', value1: 7, value2: 5, value3: 8 },
  { time: '2021-01-11', value1: 8, value2: 5, value3: 8 },
  { time: '2021-01-12', value1: 10, value2: 5, value3: 8 },
  { time: '2020-01-13', value1: 0, value2: 2.6, value3: 3 },
  { time: '2020-01-14', value1: 4, value2: 3, value3: 4 },
  { time: '2021-01-15', value1: 1, value2: 7, value3: 5 },
  { time: '2021-01-16', value1: 4, value2: 2, value3: 6 },
  { time: '2021-01-17', value1: 6, value2: 4, value3: 7 },
  { time: '2021-01-18', value1: 8, value2: 5, value3: 8 },
  { time: '2021-01-19', value1: 6, value2: 5, value3: 8 },
  { time: '2021-01-20', value1: 4, value2: 5, value3: 8 },
  { time: '2021-01-21', value1: 5, value2: 5, value3: 8 },
  { time: '2021-01-22', value1: 7, value2: 5, value3: 8 },
  { time: '2021-01-23', value1: 8, value2: 5, value3: 8 },
  { time: '2021-01-24', value1: 10, value2: 5, value3: 8 },
]

const dummyAllData = [
  { time: '2020-01-01', value1: 0, value2: 2.6, value3: 3 },
  { time: '2020-02-01', value1: 2655235, value2: 3, value3: 4 },
  { time: '2021-03-01', value1: 7674235, value2: 7, value3: 5 },
  { time: '2021-04-01', value1: 3155235, value2: 2, value3: 6 },
  { time: '2021-05-01', value1: 2655235, value2: 4, value3: 7 },
  { time: '2021-06-01', value1: 4655235, value2: 5, value3: 8 },
  { time: '2021-07-01', value1: 5655235, value2: 5, value3: 8 },
  { time: '2021-08-01', value1: 6655235, value2: 5, value3: 8 },
  { time: '2021-09-01', value1: 7655235, value2: 5, value3: 8 },
  { time: '2021-10-01', value1: 8655235, value2: 5, value3: 8 },
  { time: '2021-11-01', value1: 9655235, value2: 5, value3: 8 },
  { time: '2021-12-01', value1: 10655235, value2: 5, value3: 8 },
]

export default function getLineChartData(type: string) {
  switch (type) {
    case 'month':
      return dummyMonthData
    case 'all':
      return dummyAllData
  }
  return dummyData
}
