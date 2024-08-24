import { useEffect, useState } from "react";
import './style.scss';
import { useCategoryStore } from "@store";
import { Table } from "@ui";
import { Button, Space } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { AddCategoryModal } from "@ui";

function Categories() {
  const { getCategories, removeCategory }: any = useCategoryStore();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [load, setLoad] = useState(false);

  async function getDatas() {
    setLoad(true);
    const response = await getCategories();
    setData(response);
    setLoad(false);
  }

  async function handleDelete(id: string) {
    const response = await removeCategory(id);
    if (response.status === 200) {
      toast.success("Category deleted successfully");
      getDatas();
    } else {
      toast.error("Failed to delete category");
    }
  }

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => {
        const title = text.length > 32 ? text.slice(0, 32) + '...' : text;
        return <a>{title}</a>;
      },
    },
    {
      title: 'CreatedAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text: string) => <a>{text?.slice(0, 10)}</a>
    },
    {
      title: 'UpdatedAt',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text: string) => <a>{text?.slice(0, 10)}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="primary" 
            danger 
            onClick={() => handleDelete(record?._id)}
            style={{ 
              borderRadius: '4px', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#FF6F6F',
              backgroundColor: 'transparent', /* Transparent background to emphasize text color */
              border: '1px solid #FF6F6F', /* Border color for consistency */
              transition: 'background-color 0.3s, color 0.3s' /* Smooth transition for hover effect */
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    }
  ];

  useEffect(() => {
    getDatas();
  }, [count]);

  return (
    <>
      <ToastContainer />
      <div className="product-modals">
        <AddCategoryModal getData={getDatas} />
      </div>
      <Table load={load} data={data} columns={columns} />
      {
        data?.length > 0 && <div className="pogination">
          <Button disabled={count === 1} onClick={() => setCount(count - 1)}>Prev</Button>
          <h4>{count}</h4>
          <Button disabled={data?.length !== 8} onClick={() => setCount(count + 1)}>Next</Button>
        </div>
      }
    </>
  );
}

export default Categories;
