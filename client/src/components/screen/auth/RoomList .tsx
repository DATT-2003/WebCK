import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import handleAPI from '../../../apis/handleAPI';

const RoomList = () => {
    const [rooms, setRooms] = useState<any[]>([]);  // State lưu danh sách phòng
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await handleAPI('/auth/list', null, 'get');
                // Kiểm tra dữ liệu có phải là mảng không trước khi lưu vào state
                if (Array.isArray(response.data.data)) {
                    setRooms(response.data.data);  // Cập nhật danh sách phòng
                } else {
                    console.log(response.data)
                    message.error('Dữ liệu không hợp lệ!');
                }
            } catch (error: any) {
                message.error('Failed to load rooms');
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    // Cấu hình các cột trong bảng
    const columns = [
        {
            title: 'Room Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: any) => (
                <Button onClick={() => handleEdit(record)} type="primary">
                    Edit
                </Button>
            ),
        },
        {
            title: 'AddBill',
            key: 'addbill',
            render: (text: any, record: any) => (
                <Button onClick={() => handleEdit(record)} type="primary">
                    Add Bill
                </Button>
            ),
        },
    ];

    const handleEdit = (record: any) => {
        // Điều hướng đến trang chỉnh sửa với ID phòng
        window.location.href = `/edit/${record._id}`;
    };

    return (
        <div>
            <Button type="primary" onClick={() => window.location.href = '/create'} style={{ marginBottom: '20px' }}>
                Create Room
            </Button>
            <Table
                columns={columns}
                dataSource={Array.isArray(rooms) ? rooms : []}  // Kiểm tra dữ liệu trước khi truyền vào Table
                rowKey="_id"
                loading={loading}
            />
        </div>
    );
};

export default RoomList;
