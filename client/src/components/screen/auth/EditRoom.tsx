import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, message, Popconfirm } from 'antd';
import handleAPI from '../../../apis/handleAPI';

const EditRoom = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Fetch thông tin phòng khi trang được tải
    useEffect(() => {
        const fetchRoomDetails = async () => {
            setLoading(true);
            try {
                const response = await handleAPI(`/auth/room/${id}`, null, 'get');
                if (response.data.data) {
                    form.setFieldsValue(response.data.data); // Đặt dữ liệu vào form
                } else {
                    message.error('Room not found!');
                }
            } catch (error: any) {
                message.error('Failed to fetch room details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRoomDetails();
        }
    }, [id, form]);

    // Lưu lại thông tin phòng
    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            const response = await handleAPI(`/auth/update/${id}`, values, 'put');
            if (response.status === 200) {
                message.success('Room updated successfully!');
                navigate('/'); // Quay lại danh sách phòng
            }
        } catch (error: any) {
            message.error('Failed to update room!');
        } finally {
            setLoading(false);
        }
    };

    // Xóa phòng
    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await handleAPI(`/auth/delete/${id}`, null, 'delete');
            if (response.status === 200) {
                message.success('Room deleted successfully!');
                navigate('/'); // Quay lại danh sách phòng
            }
        } catch (error: any) {
            message.error('Failed to delete room!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Edit Room</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{ name: '', description: '', address: '', price: '', status: '' }}
            >
                <Form.Item label="Room Name" name="name" rules={[{ required: true, message: 'Please enter the room name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter the address!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price!' }]}>
                    <Input type="number" />
                </Form.Item>

                <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please enter the status!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Save Changes
                    </Button>
                    <Button onClick={() => navigate('/')}>Back to list</Button>
                </Form.Item>
            </Form>

            {/* Nút Delete */}
            <Popconfirm
                title="Xóa phòng này ?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button type="primary" danger style={{ marginTop: '20px' }}>
                    Delete Room
                </Button>
            </Popconfirm>
        </div>
    );
};

export default EditRoom;
