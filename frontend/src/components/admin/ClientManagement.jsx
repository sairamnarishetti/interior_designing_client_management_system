import React, { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  message,
  Space,
  Tag,
  Popconfirm,
  Tooltip
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

// Static data for clients
const staticClients = [
  {
    _id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    status: 'active',
    projectDetails: {
      type: 'residential',
      budget: 25000,
      timeline: '3 months',
      requirements: ['furniture', 'lighting']
    },
    lastContact: {
      date: '2024-03-15',
      notes: 'Initial consultation completed',
      method: 'meeting'
    }
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 987-6543',
    status: 'lead',
    projectDetails: {
      type: 'commercial',
      budget: 50000,
      timeline: '6 months',
      requirements: ['renovation', 'custom']
    },
    lastContact: {
      date: '2024-03-10',
      notes: 'Sent proposal',
      method: 'email'
    }
  },
  {
    _id: '3',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '(555) 456-7890',
    status: 'completed',
    projectDetails: {
      type: 'residential',
      budget: 35000,
      timeline: '4 months',
      requirements: ['kitchen', 'bathroom']
    },
    lastContact: {
      date: '2024-02-28',
      notes: 'Project completed',
      method: 'meeting'
    }
  }
];

const ClientManagement = () => {
  const [clients, setClients] = useState(staticClients);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter clients based on search text and status
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      if (selectedClient) {
        // Update existing client
        setClients(clients.map(client => 
          client._id === selectedClient._id 
            ? { ...client, ...values, projectDetails: { ...values.projectDetails, budget: Number(values.projectDetails.budget) } }
            : client
        ));
        message.success({
          content: 'Client updated successfully!',
          duration: 3,
          style: {
            marginTop: '20vh',
            fontSize: '16px',
            padding: '10px 20px'
          }
        });
      } else {
        // Add new client
        const newClient = {
          _id: Date.now().toString(),
          ...values,
          projectDetails: {
            ...values.projectDetails,
            budget: Number(values.projectDetails.budget)
          },
          lastContact: {
            date: new Date().toISOString(),
            notes: 'Initial contact',
            method: 'email'
          }
        };
        setClients([...clients, newClient]);
        message.success({
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <span>New client "{values.name}" added successfully!</span>
            </div>
          ),
          duration: 4,
          style: {
            marginTop: '20vh',
            fontSize: '18px',
            padding: '15px 25px',
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }
        });
      }
      setModalVisible(false);
      form.resetFields();
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
    } finally {
      setLoading(false);
    }
  };

  // Handle client deletion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setClients(clients.filter(client => client._id !== id));
      message.success({
        content: '✅ Client deleted successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    } catch (error) {
      message.error({
        content: 'Failed to delete client',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      setClients(clients.map(client => 
        client._id === id ? { ...client, status } : client
      ));
      message.success({
        content: '✅ Status updated successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
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
    } finally {
      setLoading(false);
    }
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    const colors = {
      lead: 'blue',
      active: 'green',
      completed: 'purple',
      inactive: 'gray'
    };
    return colors[status] || 'default';
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
        </Space>
      )
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <MailOutlined />
            <a href={`mailto:${record.email}`}>{record.email}</a>
          </Space>
          <Space>
            <PhoneOutlined />
            <span>{record.phone}</span>
          </Space>
        </Space>
      )
    },
    {
      title: 'Project',
      dataIndex: ['projectDetails', 'type'],
      key: 'projectType',
      render: (text) => text?.replace('_', ' ').toUpperCase()
    },
    {
      title: 'Last Contact',
      dataIndex: ['lastContact', 'date'],
      key: 'lastContact',
      render: (date) => (
        <Space>
          <ClockCircleOutlined />
          {date ? moment(date).fromNow() : 'No contact'}
        </Space>
      )
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
                setSelectedClient(record);
                form.setFieldsValue({
                  ...record,
                  projectDetails: {
                    ...record.projectDetails,
                    budget: record.projectDetails?.budget?.toString()
                  }
                });
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this client?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
          >
            <Option value="lead">Lead</Option>
            <Option value="active">Active</Option>
            <Option value="completed">Completed</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Space>
      )
    }
  ];

  return (
    <div className="client-management">
      <div className="header">
        <h2>Client Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedClient(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add New Client
        </Button>
      </div>

      <div className="filters">
        <Input
          placeholder="Search clients..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 150 }}
          allowClear
        >
          <Option value="lead">Lead</Option>
          <Option value="active">Active</Option>
          <Option value="completed">Completed</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </div>

      {filteredClients.length === 0 ? (
        <div className="no-clients">
          <p>No clients found</p>
          <p className="total-clients">Total Clients: 0</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredClients}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={selectedClient ? 'Edit Client' : 'Add New Client'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'lead',
            projectDetails: {
              type: 'residential'
            }
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select>
                <Option value="lead">Lead</Option>
                <Option value="active">Active</Option>
                <Option value="completed">Completed</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Project Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name={['projectDetails', 'type']}
                label="Project Type"
                rules={[{ required: true, message: 'Please select project type' }]}
              >
                <Select>
                  <Option value="residential">Residential</Option>
                  <Option value="commercial">Commercial</Option>
                  <Option value="renovation">Renovation</Option>
                  <Option value="new_construction">New Construction</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={['projectDetails', 'budget']}
                label="Budget"
                rules={[{ required: true, message: 'Please enter budget' }]}
              >
                <Input type="number" prefix="$" />
              </Form.Item>

              <Form.Item
                name={['projectDetails', 'timeline']}
                label="Timeline"
                rules={[{ required: true, message: 'Please enter timeline' }]}
              >
                <Input placeholder="e.g., 3 months" />
              </Form.Item>

              <Form.Item
                name={['projectDetails', 'requirements']}
                label="Requirements"
              >
                <Select mode="tags" placeholder="Enter requirements">
                  <Option value="furniture">Furniture</Option>
                  <Option value="lighting">Lighting</Option>
                  <Option value="flooring">Flooring</Option>
                  <Option value="paint">Paint</Option>
                  <Option value="custom">Custom</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name={['projectDetails', 'description']}
              label="Project Description"
              rules={[{ required: true, message: 'Please enter project description' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name={['address', 'street']}
                label="Street"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={['address', 'city']}
                label="City"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={['address', 'state']}
                label="State"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={['address', 'zipCode']}
                label="ZIP Code"
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedClient ? 'Update' : 'Add'} Client
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClientManagement;
