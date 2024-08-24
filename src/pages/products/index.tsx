import { useEffect, useState } from "react";
import './style.scss';
import { useProductStore } from "@store";
import { AddProductModal, Table } from "@ui";
import { Button, Space, Tag } from "antd";
import { toast, ToastContainer } from "react-toastify";

function Products() {
  const { getProducts, removeProducts }: any = useProductStore();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [load, setLoad] = useState(false);

  async function getDatas() {
    setLoad(true);
    const payload = {
      skip: count,
      limit: 8
    };
    const response = await getProducts(payload);
    setData(response);
    setLoad(false);
  }

  async function deleteProducts(data: any) {
    const response = await removeProducts(data);
    if (response?.status === 200) {
      toast.success('Deleted products successfully');
      getDatas();
    } else {
      toast.error('Failed to delete products');
    }
  }

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => {
        const title = text.length > 32 ? text.slice(0, 32) + '...' : text;
        return <a>{title}</a>;
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (text: any) => <a>{text?.title}</a>,
    },
    {
      title: 'Photo',
      dataIndex: 'urls',
      key: 'urls',
      render: (text: any) => <img src={text[0]} alt="product-image" style={{ width: 40, height: 40, objectFit: 'cover' }} />,
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (text: number) => {
        if (text > 1000) {
          return <Tag color="red">{text}</Tag>;
        } else if (text > 500) {
          return <Tag color="blue">{text}</Tag>;
        } else {
          return <Tag color="green">{text}</Tag>;
        }
      },
    },
    {
      title: 'Old Price',
      key: 'oldPrice',
      dataIndex: 'oldPrice',
      render: (text: number) => {
        if (text > 1000) {
          return <Tag color="red">{text}</Tag>;
        } else if (text > 500) {
          return <Tag color="blue">{text}</Tag>;
        } else {
          return <Tag color="green">{text}</Tag>;
        }
      },
    },
    {
      title: 'CreatedAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text: string) => <a>{text?.slice(0, 10)}</a>
    },
    {
      title: 'units',
      key: 'units',
      dataIndex: 'units',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="default" 
            danger 
            onClick={() => deleteProducts(record?._id)}
            style={{ 
              borderRadius: '4px', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#FF6F6F'
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getDatas();
  }, [count]);

  return (
    <>
      <ToastContainer />
      <div className="product-modals">
        <AddProductModal requestData={getDatas} />
      </div>
      <Table load={load} data={data} columns={columns} />
      {
        data.length > 0 && <div className="pogination">
          <Button disabled={count === 1} onClick={() => setCount(count - 1)}>Prev</Button>
          <h4>{count}</h4>
          <Button disabled={data?.length !== 8} onClick={() => setCount(count + 1)}>Next</Button>
        </div>
      }
    </>
  );
}

export default Products;
