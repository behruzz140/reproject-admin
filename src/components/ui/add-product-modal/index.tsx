import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useCategoryStore } from "@store";
import { InboxOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import './style.scss'; // Import the stylesheet

function Index(props: any) {
  const { Dragger } = Upload;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCategories }: any = useCategoryStore();
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getDatas() {
    const response = await getCategories();
    setData(response);
  }

  useEffect(() => {
    getDatas();
  }, []);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
      if (key !== 'photos') {
        formData.append(key, values[key]);
      }
    });

    fileList.forEach(file => {
      formData.append('photos', file.originFileObj);
    });

    try {
      const response = await fetch('https://trade.namtech.uz/product', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const result = await response.json();
      if (result.variant === "success") {
        toast.success('Product created successfully', { autoClose: 1200 });
        props?.requestData();
      } else {
        toast.error('Error creating product', { autoClose: 1200 });
      }
      handleOk();
    } catch (error) {
      toast.error('Error creating product', { autoClose: 1200 });
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      setFileList(info.fileList);
    }
  };

  return (
    <>
      <Button type="default" onClick={showModal} className="open-modal-button">
        Add Product
      </Button>
      <Modal
        footer={false}
        title="Add Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal"
      >
        <Form onFinish={onFinish} className="custom-form">
          <Form.Item
            name={"title"}
            rules={[
              { required: true, message: "Please input product title!" },
            ]}
            hasFeedback
          >
            <Input className="custom-input" placeholder="Product Title" />
          </Form.Item>

          <Form.Item
            name={"price"}
            rules={[
              { required: true, message: "Please input product price!" },
            ]}
            hasFeedback
          >
            <Input className="custom-input" type="number" placeholder="Price" />
          </Form.Item>

          <Form.Item
            name={"oldPrice"}
            rules={[
              { required: true, message: "Please input product old price!" },
            ]}
            hasFeedback
          >
            <Input className="custom-input" type="number" placeholder="Old Price" />
          </Form.Item>

          <Form.Item
            name={"categoryId"}
            rules={[
              { required: true, message: "Please select product category!" },
            ]}
            hasFeedback
          >
            <Select className="custom-select" placeholder={"Select Category"}>
              {data?.map((e: any, i: any) => (
                <Select.Option key={i} value={e._id}>
                  {e.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name={"units"}
            rules={[
              { required: true, message: "Please input product units!" },
            ]}
            hasFeedback
          >
            <Input className="custom-input" placeholder="Units (e.g., kg)" />
          </Form.Item>

          <Form.Item
            name={"desc"}
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
            hasFeedback
          >
            <Input.TextArea className="custom-textarea" placeholder="Description" />
          </Form.Item>

          <Form.Item name={"photos"}>
            <Dragger
              multiple={true}
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleChange}
              className="custom-dragger"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drag files here or click to upload</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="default" className="submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Index;
