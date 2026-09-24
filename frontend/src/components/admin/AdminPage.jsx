import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import { UserOutlined, DollarOutlined, TeamOutlined, ProjectOutlined } from '@ant-design/icons';
import './styles/AdminPage.css';

// Static data for statistics
const statistics = {
  totalClients: 12,
  totalRevenue: 125000,
  activeProjects: 8,
  teamMembers: 6,
  recentClients: [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', status: 'active', joinDate: '2024-03-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', status: 'active', joinDate: '2024-03-10' },
    { id: 3, name: 'Michael Chen', email: 'm.chen@email.com', status: 'inactive', joinDate: '2024-02-28' },
    { id: 4, name: 'Emma Thompson', email: 'e.thompson@email.com', status: 'active', joinDate: '2024-03-01' },
    { id: 5, name: 'David Wilson', email: 'd.wilson@email.com', status: 'active', joinDate: '2024-03-05' }
  ],
  projectStatus: {
    completed: 15,
    inProgress: 8,
    pending: 5,
    cancelled: 2
  },
  revenueByCategory: [
    { category: 'Residential', amount: 75000, percentage: 60 },
    { category: 'Commercial', amount: 35000, percentage: 28 },
    { category: 'Consultation', amount: 15000, percentage: 12 }
  ]
};

const AdminPage = () => {
  const recentClientsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <Row gutter={[16, 16]} className="statistics-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clients"
              value={statistics.totalClients}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={statistics.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={statistics.activeProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Team Members"
              value={statistics.teamMembers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-content">
        <Col xs={24} lg={16}>
          <Card title="Recent Clients" className="recent-clients">
            <Table
              dataSource={statistics.recentClients}
              columns={recentClientsColumns}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Project Status" className="project-status">
            <div className="status-item">
              <span>Completed</span>
              <Progress percent={Math.round((statistics.projectStatus.completed / 30) * 100)} status="success" />
              <span>{statistics.projectStatus.completed} projects</span>
            </div>
            <div className="status-item">
              <span>In Progress</span>
              <Progress percent={Math.round((statistics.projectStatus.inProgress / 30) * 100)} status="active" />
              <span>{statistics.projectStatus.inProgress} projects</span>
            </div>
            <div className="status-item">
              <span>Pending</span>
              <Progress percent={Math.round((statistics.projectStatus.pending / 30) * 100)} status="normal" />
              <span>{statistics.projectStatus.pending} projects</span>
            </div>
            <div className="status-item">
              <span>Cancelled</span>
              <Progress percent={Math.round((statistics.projectStatus.cancelled / 30) * 100)} status="exception" />
              <span>{statistics.projectStatus.cancelled} projects</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-content">
        <Col span={24}>
          <Card title="Revenue by Category" className="revenue-category">
            {statistics.revenueByCategory.map((item, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <span>{item.category}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
                <Progress percent={item.percentage} showInfo={false} />
                <div className="category-footer">
                  <span>{item.percentage}% of total revenue</span>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage; 