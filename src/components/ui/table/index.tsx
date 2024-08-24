import { Table } from 'antd';
import './style.scss';

function Index({ columns, data, load }: any) {
  return (
    <Table
      columns={columns}
      loading={load}
      dataSource={data}
      pagination={false}
      size='large'
      className='custom-table'
    />
  );
}

export default Index;
