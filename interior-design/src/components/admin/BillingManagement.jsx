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
  DatePicker,
  InputNumber,
  Tooltip
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FileTextOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const BillingManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [form] = Form.useForm();
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    fetchProjects();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/billing/invoices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInvoices(response.data);
    } catch (error) {
      message.error('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/clients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(response.data.clients);
    } catch (error) {
      message.error('Failed to fetch clients');
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
    } catch (error) {
      message.error('Failed to fetch projects');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (selectedInvoice) {
        await axios.put(`/api/billing/invoices/${selectedInvoice._id}`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Invoice updated successfully');
      } else {
        await axios.post('/api/billing/invoices', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('Invoice created successfully');
      }
      setModalVisible(false);
      form.resetFields();
      fetchInvoices();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/billing/invoices/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Status updated successfully');
      fetchInvoices();
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text) => <span className="font-mono">{text}</span>
    },
    {
      title: 'Client',
      dataIndex: ['client', 'name'],
      key: 'client'
    },
    {
      title: 'Project',
      dataIndex: ['project', 'name'],
      key: 'project'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="font-semibold">
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => moment(date).format('MMM DD, YYYY')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          pending: 'orange',
          paid: 'green',
          overdue: 'red',
          cancelled: 'gray'
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<FileTextOutlined />}
              onClick={() => {
                setSelectedInvoice(record);
                form.setFieldsValue(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
          >
            <Option value="pending">Pending</Option>
            <Option value="paid">Paid</Option>
            <Option value="overdue">Overdue</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Billing Management</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedInvoice(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Create Invoice
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={invoices}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={selectedInvoice ? 'Edit Invoice' : 'Create New Invoice'}
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
              name="client"
              label="Client"
              rules={[{ required: true }]}
            >
              <Select>
                {clients.map(client => (
                  <Option key={client._id} value={client._id}>
                    {client.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="project"
              label="Project"
              rules={[{ required: true }]}
            >
              <Select>
                {projects.map(project => (
                  <Option key={project._id} value={project._id}>
                    {project.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber
                prefix="$"
                style={{ width: '100%' }}
                min={0}
                step={0.01}
                precision={2}
              />
            </Form.Item>

            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="pending">Pending</Option>
                <Option value="paid">Paid</Option>
                <Option value="overdue">Overdue</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="paymentMethod"
              label="Payment Method"
            >
              <Select>
                <Option value="bank_transfer">Bank Transfer</Option>
                <Option value="credit_card">Credit Card</Option>
                <Option value="check">Check</Option>
                <Option value="cash">Cash</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedInvoice ? 'Update' : 'Create'} Invoice
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BillingManagement; 