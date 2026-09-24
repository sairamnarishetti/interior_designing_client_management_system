import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Modal,
  Form,
  message,
  Space,
  Tag,
  Tooltip,
  Rate,
  Upload
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  StarOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/vendors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendors(response.data);
    } catch (error) {
      message.error('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (selectedVendor) {
        await axios.put(`/api/vendors/${selectedVendor._id}`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success({
          content: '✅ Vendor updated successfully!',
          duration: 3,
          style: {
            marginTop: '20vh',
            fontSize: '16px',
            padding: '10px 20px'
          }
        });
      } else {
        await axios.post('/api/vendors', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success({
          content: '✅ Vendor added successfully!',
          duration: 3,
          style: {
            marginTop: '20vh',
            fontSize: '16px',
            padding: '10px 20px'
          }
        });
      }
      setModalVisible(false);
      form.resetFields();
      fetchVendors();
    } catch (error) {
      message.error({
        content: 'Operation failed',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/vendors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success({
        content: '✅ Vendor removed successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
      fetchVendors();
    } catch (error) {
      message.error({
        content: 'Failed to remove vendor',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/vendors/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success({
        content: '✅ Status updated successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
      fetchVendors();
    } catch (error) {
      message.error({
        content: 'Failed to update status',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    }
  };

  const columns = [
    {
      title: 'Vendor Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span className="font-semibold">{text}</span>
          <Rate disabled defaultValue={record.rating} />
        </Space>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      )
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <div>{record.email}</div>
          <div>{record.phone}</div>
        </Space>
      )
    },
    {
      title: 'Products/Services',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <Space wrap>
          {products?.map(product => (
            <Tag key={product} color="green">{product}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          active: 'green',
          inactive: 'red',
          pending: 'orange'
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedVendor(record);
                form.setFieldsValue(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Vendor Management</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedVendor(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add Vendor
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={vendors}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={selectedVendor ? 'Edit Vendor' : 'Add New Vendor'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Vendor Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="furniture">Furniture</Option>
                <Option value="lighting">Lighting</Option>
                <Option value="flooring">Flooring</Option>
                <Option value="paint">Paint</Option>
                <Option value="fabrics">Fabrics</Option>
                <Option value="contractor">Contractor</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true },
                { type: 'email' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true }]}
            >
              <Rate />
            </Form.Item>
          </div>

          <Form.Item
            name="products"
            label="Products/Services"
            rules={[{ required: true }]}
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Add products or services">
              <Option value="custom_furniture">Custom Furniture</Option>
              <Option value="lighting_fixtures">Lighting Fixtures</Option>
              <Option value="floor_materials">Floor Materials</Option>
              <Option value="paint_supplies">Paint Supplies</Option>
              <Option value="fabrics_materials">Fabrics & Materials</Option>
              <Option value="installation">Installation</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="documents"
            label="Documents"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Documents</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedVendor ? 'Update' : 'Add'} Vendor
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorManagement;
