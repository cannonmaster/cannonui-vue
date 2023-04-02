import React, { useState } from 'react';
import { Table } from './table';

const TableDemo = () => {
  const [column1, setColumn1] = useState([
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '年龄',
      key: 'age',
    },
  ]);

  const [data1, setData1] = useState([
    {
      name: 'Tom',
      age: 10,
    },
    {
      name: 'Hi',
      age: 12,
    },
    {
      name: '小张',
      age: 16,
    },
  ]);
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        <Table columns={column1} data={data1}></Table>
      </div>
    </>
  );
};

export default TableDemo;
