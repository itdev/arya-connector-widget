import React from 'react';
import styles from './styles.module.scss';

const data = [
  {
    date: '2/3/33',
    hours: '8.8',
    breaks: '2',
    pay: '2,000',
  },
  {
    date: '2/3/33',
    hours: '8.8',
    breaks: '2',
    pay: '2,000',
  },
  {
    date: '2/3/33',
    hours: '8.8',
    breaks: '2',
    pay: '2,000',
  },
  {
    date: '2/3/33',
    hours: '8.8',
    breaks: '2',
    pay: '2,000',
  },
];

const History = () => {
  const columns = [
    {
      title: 'Date',
      key: 'date',
    },
    {
      title: 'Total Hours',
      key: 'hours',
    },
    {
      title: 'Breaks',
      key: 'breaks',
    },
    {
      title: 'Pay',
      key: 'pay',
    },
  ];
  return (
    <table className={styles.history}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.hours}</td>
            <td>{row.breaks}</td>
            <td>{row.pay}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default History;
