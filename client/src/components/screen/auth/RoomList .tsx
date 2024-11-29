import React, { useEffect, useState } from 'react';
import { Table, Button, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import handleAPI from '../../../apis/handleAPI';

const RoomList = () => {
    const [rooms, setRooms] = useState<any[]>([]);  // State lưu danh sách phòng
    const [loading, setLoading] = useState(false);
    const [searchMinPrice, setSearchMinPrice] = useState<number | string>('');  // State lưu giá tối thiểu tìm kiếm
    const [searchMaxPrice, setSearchMaxPrice] = useState<number | string>('');  // State lưu giá tối đa tìm kiếm
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await handleAPI('/auth/list', null, 'get');
                if (Array.isArray(response.data.data)) {
                    setRooms(response.data.data);
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

    // Hàm lọc phòng theo giá
    const filterRoomsByPrice = () => {
        let filteredRooms = rooms;

        if (searchMinPrice) {
            filteredRooms = filteredRooms.filter((room) => room.price >= Number(searchMinPrice));
        }

        if (searchMaxPrice) {
            filteredRooms = filteredRooms.filter((room) => room.price <= Number(searchMaxPrice));
        }

        return filteredRooms;
    };

    // Cập nhật giá tối thiểu khi người dùng nhập
    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMinPrice(e.target.value);
    };

    // Cập nhật giá tối đa khi người dùng nhập
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMaxPrice(e.target.value);
    };

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
                <Button onClick={() => handleAddbill(record)} type="primary">
                    Add Bill
                </Button>
            ),
        },
    ];

    const handleEdit = (record: any) => {
        window.location.href = `/edit/${record._id}`;
    };

    const handleAddbill = (record: any) => {
        navigate(`/create-bill/${record._id}`, {
            state: {
                roomName: record.name,
                price: record.price,
            },
        });
    };

    return (
        <div>
            {/* Phần tìm kiếm theo giá */}
            <div style={{ marginBottom: '20px' }}>
                <Input
                    type="number"
                    placeholder="Min Price"
                    value={searchMinPrice}
                    onChange={handleMinPriceChange}
                    style={{ marginRight: '10px', width: '200px' }}
                />
                <Input
                    type="number"
                    placeholder="Max Price"
                    value={searchMaxPrice}
                    onChange={handleMaxPriceChange}
                    style={{ marginRight: '10px', width: '200px' }}
                />
                <Button onClick={() => setRooms(filterRoomsByPrice())} type="primary">
                    Search
                </Button>
            </div>

            <Button type="primary" onClick={() => window.location.href = '/create'} style={{ marginBottom: '20px' }}>
                Create Room
            </Button>

            <Table
                columns={columns}
                dataSource={filterRoomsByPrice()}  // Sử dụng dữ liệu đã lọc theo giá
                rowKey="_id"
                loading={loading}
            />
        </div>
    );
};

export default RoomList;
