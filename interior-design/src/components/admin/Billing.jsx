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
  Card,
  Statistic,
  DatePicker
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  DollarOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Static data for invoices
const staticInvoices = [
  {
    _id: '1',
    invoiceNumber: 'INV-2024-001',
    client: {
      name: 'John Smith',
      email: 'john.smith@email.com'
    },
    project: {
      name: 'Modern Living Room',
      type: 'residential'
    },
    amount: 15000,
    dueDate: '2024-04-15',
    status: 'pending',
    items: [
      { description: 'Design Consultation', amount: 2000 },
      { description: 'Furniture Selection', amount: 8000 },
      { description: 'Lighting Design', amount: 5000 }
    ]
  },
  {
    _id: '2',
    invoiceNumber: 'INV-2024-002',
    client: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com'
    },
    project: {
      name: 'Kitchen Renovation',
      type: 'residential'
    },
    amount: 25000,
    dueDate: '2024-04-20',
    status: 'paid',
    items: [
      { description: 'Kitchen Design', amount: 5000 },
      { description: 'Cabinetry', amount: 12000 },
      { description: 'Appliances', amount: 8000 }
    ]
  },
  {
    _id: '3',
    invoiceNumber: 'INV-2024-003',
    client: {
      name: 'Michael Chen',
      email: 'm.chen@email.com'
    },
    project: {
      name: 'Office Redesign',
      type: 'commercial'
    },
    amount: 35000,
    dueDate: '2024-03-30',
    status: 'overdue',
    items: [
      { description: 'Space Planning', amount: 8000 },
      { description: 'Furniture', amount: 20000 },
      { description: 'Lighting', amount: 7000 }
    ]
  }
];

const Billing = () => {
  const [invoices, setInvoices] = useState(staticInvoices);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState([moment().startOf('month'), moment()]);

  // Calculate summary statistics
  const summary = invoices.reduce((acc, invoice) => {
    if (invoice.status === 'paid') {
      acc.paid += invoice.amount;
    } else if (invoice.status === 'pending') {
      acc.pending += invoice.amount;
    } else if (invoice.status === 'overdue') {
      acc.overdue += invoice.amount;
    }
    return acc;
  }, { paid: 0, pending: 0, overdue: 0 });

  // Filter invoices based on search text, status, and date range
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         invoice.project.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    const matchesDate = moment(invoice.dueDate).isBetween(dateRange[0], dateRange[1], 'day', '[]');
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      if (selectedInvoice) {
        // Update existing invoice
        setInvoices(invoices.map(invoice => 
          invoice._id === selectedInvoice._id 
            ? { ...invoice, ...values }
            : invoice
        ));
        message.success({
          content: '✅ Invoice updated successfully!',
          duration: 3,
          style: {
            marginTop: '20vh',
            fontSize: '16px',
            padding: '10px 20px'
          }
        });
      } else {
        // Add new invoice
        const newInvoice = {
          _id: Date.now().toString(),
          invoiceNumber: `INV-${moment().format('YYYY')}-${String(invoices.length + 1).padStart(3, '0')}`,
          ...values,
          status: 'pending'
        };
        setInvoices([...invoices, newInvoice]);
        message.success({
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <span>New invoice created successfully!</span>
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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setInvoices(invoices.filter(invoice => invoice._id !== id));
      message.success({
        content: '✅ Invoice deleted successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    } catch (error) {
      message.error({
        content: 'Failed to delete invoice',
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

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      setInvoices(invoices.map(invoice => 
        invoice._id === id ? { ...invoice, status } : invoice
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
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedInvoice(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record._id)}
          />
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
    <div className="billing-management">
      <div className="summary-cards">
        <Card>
          <Statistic
            title="Total Revenue"
            value={summary.paid + summary.pending}
            precision={2}
            prefix={<DollarOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
          <div className="text-sm text-gray-500 mt-2">
            ↑ 12% from last month
          </div>
        </Card>
        <Card>
          <Statistic
            title="Paid Invoices"
            value={summary.paid}
            precision={2}
            prefix={<DollarOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
          <div className="text-sm text-gray-500 mt-2">
            ↑ 8% from last month
          </div>
        </Card>
        <Card>
          <Statistic
            title="Outstanding"
            value={summary.pending + summary.overdue}
            precision={2}
            prefix={<DollarOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
          <div className="text-sm text-gray-500 mt-2">
            ↓ 3 pending invoices
          </div>
        </Card>
      </div>

      <div className="filters">
        <Input
          placeholder="Search invoices..."
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
          <Option value="pending">Pending</Option>
          <Option value="paid">Paid</Option>
          <Option value="overdue">Overdue</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
        <RangePicker
          value={dateRange}
          onChange={setDateRange}
        />
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

      {filteredInvoices.length === 0 ? (
        <div className="no-invoices">
          <p>No invoices found</p>
          <p className="total-invoices">Total Invoices: 0</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredInvoices}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={selectedInvoice ? 'Edit Invoice' : 'Create Invoice'}
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
            status: 'pending'
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="client"
              label="Client"
              rules={[{ required: true, message: 'Please select client' }]}
            >
              <Select>
                <Option value="John Smith">John Smith</Option>
                <Option value="Sarah Johnson">Sarah Johnson</Option>
                <Option value="Michael Chen">Michael Chen</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="project"
              label="Project"
              rules={[{ required: true, message: 'Please select project' }]}
            >
              <Select>
                <Option value="Modern Living Room">Modern Living Room</Option>
                <Option value="Kitchen Renovation">Kitchen Renovation</Option>
                <Option value="Office Redesign">Office Redesign</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Please enter amount' }]}
            >
              <Input type="number" prefix="$" />
            </Form.Item>

            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: 'Please select due date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            name="items"
            label="Invoice Items"
            rules={[{ required: true, message: 'Please add at least one item' }]}
          >
            <Select mode="tags" placeholder="Add items">
              <Option value="Design Consultation">Design Consultation</Option>
              <Option value="Furniture Selection">Furniture Selection</Option>
              <Option value="Lighting Design">Lighting Design</Option>
              <Option value="Space Planning">Space Planning</Option>
              <Option value="Material Selection">Material Selection</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedInvoice ? 'Update' : 'Create'} Invoice
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Billing;
