import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  DatePicker,
  Select,
  Statistic,
  Progress,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Tag
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// Static financial data
const staticFinancialData = {
  revenue: 125000,
  expenses: 75000,
  profit: 50000,
  pendingPayments: 25000,
  transactions: [
    {
      _id: '1',
      date: '2024-03-15',
      type: 'income',
      amount: 15000,
      description: 'Project completion payment - Modern Living Room',
      category: 'project_payment',
      status: 'completed'
    },
    {
      _id: '2',
      date: '2024-03-14',
      type: 'expense',
      amount: 5000,
      description: 'Furniture purchase for client project',
      category: 'materials',
      status: 'completed'
    },
    {
      _id: '3',
      date: '2024-03-13',
      type: 'income',
      amount: 8000,
      description: 'Initial consultation fee',
      category: 'consultation',
      status: 'completed'
    },
    {
      _id: '4',
      date: '2024-03-12',
      type: 'expense',
      amount: 3000,
      description: 'Office supplies and materials',
      category: 'supplies',
      status: 'completed'
    },
    {
      _id: '5',
      date: '2024-03-11',
      type: 'income',
      amount: 25000,
      description: 'Kitchen renovation project payment',
      category: 'project_payment',
      status: 'pending'
    }
  ]
};

const FinancialManagement = () => {
  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialData] = useState(staticFinancialData);
  const [dateRange, setDateRange] = useState([moment().startOf('month'), moment()]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Filter transactions based on date range
  const filteredTransactions = financialData.transactions.filter(transaction => {
    const transactionDate = moment(transaction.date);
    return transactionDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
  });

  // Calculate filtered totals
  const filteredTotals = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.revenue += transaction.amount;
    } else {
      acc.expenses += transaction.amount;
    }
    return acc;
  }, { revenue: 0, expenses: 0 });

  filteredTotals.profit = filteredTotals.revenue - filteredTotals.expenses;

  const handleTransactionSubmit = async (values) => {
    try {
      setLoading(true);
      const newTransaction = {
        _id: Date.now().toString(),
        date: values.date.format('YYYY-MM-DD'),
        ...values,
        status: 'completed'
      };
      
      setFinancialData(prev => ({
        ...prev,
        transactions: [newTransaction, ...prev.transactions],
        revenue: values.type === 'income' ? prev.revenue + values.amount : prev.revenue,
        expenses: values.type === 'expense' ? prev.expenses + values.amount : prev.expenses,
        profit: values.type === 'income' ? prev.profit + values.amount : prev.profit - values.amount
      }));

      message.success({
        content: '✅ Transaction recorded successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error({
        content: 'Failed to record transaction',
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('MMM DD, YYYY')
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'income' ? 'green' : 'red'}>
          {type === 'income' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {type.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category.replace('_', ' ').toUpperCase()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      )
    }
  ];

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Financial Management</h1>
              <Space>
                <RangePicker
                  value={dateRange}
                  onChange={setDateRange}
                />
                <Button
                  type="primary"
                  icon={<FileTextOutlined />}
                  onClick={() => setModalVisible(true)}
                >
                  Record Transaction
                </Button>
              </Space>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={filteredTotals.revenue}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress
              percent={Math.round((filteredTotals.revenue / (filteredTotals.revenue + filteredTotals.expenses)) * 100)}
              status="active"
              strokeColor="#52c41a"
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={filteredTotals.expenses}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
            <Progress
              percent={Math.round((filteredTotals.expenses / (filteredTotals.revenue + filteredTotals.expenses)) * 100)}
              status="active"
              strokeColor="#f5222d"
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Net Profit"
              value={filteredTotals.profit}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: filteredTotals.profit >= 0 ? '#52c41a' : '#f5222d' }}
            />
            <Progress
              percent={Math.abs(Math.round((filteredTotals.profit / filteredTotals.revenue) * 100))}
              status={filteredTotals.profit >= 0 ? 'success' : 'exception'}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Pending Payments"
              value={financialData.pendingPayments}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Transaction History">
            <Table
              columns={columns}
              dataSource={filteredTransactions}
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Record Transaction"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleTransactionSubmit}
        >
          <Form.Item
            name="type"
            label="Transaction Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              prefix="$"
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="project_payment">Project Payment</Option>
              <Option value="consultation">Consultation</Option>
              <Option value="materials">Materials</Option>
              <Option value="supplies">Supplies</Option>
              <Option value="utilities">Utilities</Option>
              <Option value="rent">Rent</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Record Transaction
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FinancialManagement; 