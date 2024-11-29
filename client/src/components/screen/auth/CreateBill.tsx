import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import handleAPI from '../../../apis/handleAPI';

const CreateBill = () => {
    const { id } = useParams(); // Lấy ID phòng từ URL
    const navigate = useNavigate();
    const location = useLocation();  // Dùng để lấy state từ Router
    const [room, setRoom] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Nhận thông tin phòng từ state
    const { roomName, price } = location.state || {};  // Lấy thông tin phòng nếu có

    useEffect(() => {
        if (!roomName || !price) {
            message.error("Room details not found");
            navigate('/');
        } else {
            form.setFieldsValue({
                roomName,
                price,
                roomId: id,  // Gán ID phòng vào form
                daysBooked: 1,  // Số ngày mặc định là 1
            });
        }
    }, [roomName, price, id, form]);

    const handleCreateBill = async (values: any) => {
        setLoading(true);
        try {
            const response = await handleAPI('/bill/create', values, 'post');
            if (response.status === 200) {
                message.success('Bill created successfully!');
                navigate('/'); // Quay lại danh sách phòng
            }
        } catch (error) {
            message.error('Failed to create bill!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Create Bill</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateBill}
                initialValues={{
                    daysBooked: 1,
                }}
            >
                <Form.Item name="roomId" label="Room ID" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="roomName" label="Room Name">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: 'Please enter the customer name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="bookingDate" label="Booking Date">
                    <Input type="date" />
                </Form.Item>
                <Form.Item name="daysBooked" label="Number of Days" rules={[{ required: true, message: 'Please enter the number of days!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="price" label="Price per Day" initialValue={price}>
                    <Input disabled />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                        Create Bill
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateBill;
