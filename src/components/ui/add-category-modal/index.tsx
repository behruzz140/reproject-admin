import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useCategoryStore } from '@store';
import './style.scss'; // Import the stylesheet
import { toast } from 'react-toastify';

function Index(props: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addCategory }: any = useCategoryStore();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function handleSubmit(value: any) {
        const response = await addCategory(value);
        if (response.status === 201) {
            toast.success('Category added successfully');
            props.getData();
            handleCancel();
        } else {
            toast.error('Failed to add category');
        }
    }

    return (
        <>
            <Button type="default" onClick={showModal} className="open-modal-button">
                Add Category
            </Button>
            <Modal
                footer={false}
                title="Add Category"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="custom-modal"
            >
                <Form className="custom-form" onFinish={handleSubmit}>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the category title!' }]}
                        hasFeedback
                    >
                        <Input className="custom-input" placeholder="Enter Category Name" />
                    </Form.Item>
                    <Button type="default" htmlType="submit" className="submit-button">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    );
}

export default Index;
