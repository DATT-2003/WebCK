import { Button, Card, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import handleAPI from '../../../apis/handleAPI';

const CreateRoom = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [from] = Form.useForm();

    const handleCreate = async (values: { name: string }) => {
        const api = `/auth/create`;
        setIsLoading(true);
        try {
            const res = await handleAPI(api, values, 'post');
            console.log(res);
            message.success('Room created successfully!');
        } catch (error: any) {
            message.error(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card style={{ width: '30%' }}>
                <Form layout='vertical' form={from} onFinish={handleCreate} disabled={isLoading} size='large'>
                    <Form.Item name={'name'} label='NameRoom'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Name!!'
                            }
                        ]}>
                        <Input placeholder='Enter your Name!' allowClear />
                    </Form.Item>
                    <Form.Item name={'description'} label='Description'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your description!!'
                            }
                        ]}>
                        <Input placeholder='Enter your description!' allowClear />
                    </Form.Item>
                    <Form.Item name={'address'} label='Address'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Address!!'
                            }
                        ]}>
                        <Input placeholder='Enter your Address!' allowClear />
                    </Form.Item>
                    <Form.Item name={'price'} label='Price'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Price!!'
                            }
                        ]}>
                        <Input placeholder='Enter your Price!' allowClear />
                    </Form.Item>
                    <Form.Item name={'status'} label='Status'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Status!!'
                            }
                        ]}>
                        <Input placeholder='Enter your Status!' />
                    </Form.Item>
                </Form>
                <div className="mt-5 mb-3">
                    <Button
                        loading={isLoading}
                        onClick={() => from.submit()}
                        type='primary'
                        style={{
                            width: '100%',
                        }}
                        size='large'>
                        Create
                    </Button>
                </div>
                <div className="mt-3">
                    <Link to="/">
                        <Button type="link" style={{ width: '100%' }}>
                            Back to List
                        </Button>
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default CreateRoom;
