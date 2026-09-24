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
  Avatar,
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
  UserOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

// Static data for team members
const staticTeamMembers = [
  {
    _id: '1',
    name: 'Emma Thompson',
    position: 'Senior Interior Designer',
    email: 'emma.thompson@design.com',
    phone: '(555) 123-4567',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    assignedProjects: [
      { _id: 'p1', name: 'Modern Living Room' },
      { _id: 'p2', name: 'Kitchen Renovation' }
    ],
    skills: ['Space Planning', 'Color Theory', 'Project Management'],
    experience: '8 years'
  },
  {
    _id: '2',
    name: 'Michael Chen',
    position: 'Interior Designer',
    email: 'michael.chen@design.com',
    phone: '(555) 987-6543',
    status: 'available',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    assignedProjects: [
      { _id: 'p3', name: 'Office Redesign' }
    ],
    skills: ['3D Modeling', 'Material Selection', 'Client Relations'],
    experience: '5 years'
  },
  {
    _id: '3',
    name: 'Sarah Johnson',
    position: 'Junior Designer',
    email: 'sarah.j@design.com',
    phone: '(555) 456-7890',
    status: 'busy',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    assignedProjects: [
      { _id: 'p4', name: 'Bathroom Remodel' },
      { _id: 'p5', name: 'Outdoor Space' }
    ],
    skills: ['AutoCAD', 'SketchUp', 'Material Research'],
    experience: '2 years'
  }
];

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState(staticTeamMembers);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filter team members based on search text and status
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      if (selectedMember) {
        // Update existing team member
        setTeamMembers(teamMembers.map(member => 
          member._id === selectedMember._id 
            ? { ...member, ...values }
            : member
        ));
        message.success({
          content: '✅ Team member updated successfully!',
          duration: 3,
          style: {
            marginTop: '20vh',
            fontSize: '16px',
            padding: '10px 20px'
          }
        });
      } else {
        // Add new team member
        const newMember = {
          _id: Date.now().toString(),
          ...values,
          avatar: `https://randomuser.me/api/portraits/${values.gender === 'female' ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`
        };
        setTeamMembers([...teamMembers, newMember]);
        message.success({
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>✅</span>
              <span>New team member "{values.name}" added successfully!</span>
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
      setTeamMembers(teamMembers.filter(member => member._id !== id));
      message.success({
        content: '✅ Team member deleted successfully!',
        duration: 3,
        style: {
          marginTop: '20vh',
          fontSize: '16px',
          padding: '10px 20px'
        }
      });
    } catch (error) {
      message.error({
        content: 'Failed to delete team member',
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
      setTeamMembers(teamMembers.map(member => 
        member._id === id ? { ...member, status } : member
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
      title: 'Member',
      key: 'member',
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <div>
            <div className="font-semibold">{record.name}</div>
            <div className="text-gray-500">{record.position}</div>
          </div>
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
      title: 'Projects',
      dataIndex: 'assignedProjects',
      key: 'projects',
      render: (projects) => (
        <Space wrap>
          {projects?.map(project => (
            <Tag key={project._id} color="blue">{project.name}</Tag>
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
          on_leave: 'orange',
          busy: 'red',
          available: 'blue'
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
                setSelectedMember(record);
                form.setFieldsValue(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this team member?"
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
            <Option value="active">Active</Option>
            <Option value="available">Available</Option>
            <Option value="busy">Busy</Option>
            <Option value="on_leave">On Leave</Option>
          </Select>
        </Space>
      )
    }
  ];

  return (
    <div className="team-management">
      <div className="header">
        <h2>Team Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedMember(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Add Team Member
        </Button>
      </div>

      <div className="filters">
        <Input
          placeholder="Search team members..."
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
          <Option value="active">Active</Option>
          <Option value="available">Available</Option>
          <Option value="busy">Busy</Option>
          <Option value="on_leave">On Leave</Option>
        </Select>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="no-members">
          <p>No team members found</p>
          <p className="total-members">Total Members: 0</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredMembers}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={selectedMember ? 'Edit Team Member' : 'Add Team Member'}
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
            status: 'active'
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: 'Please enter position' }]}
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
                <Option value="active">Active</Option>
                <Option value="available">Available</Option>
                <Option value="busy">Busy</Option>
                <Option value="on_leave">On Leave</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="experience"
              label="Experience"
              rules={[{ required: true, message: 'Please enter experience' }]}
            >
              <Input placeholder="e.g., 5 years" />
            </Form.Item>
          </div>

          <Form.Item
            name="skills"
            label="Skills"
            rules={[{ required: true, message: 'Please enter skills' }]}
          >
            <Select mode="tags" placeholder="Enter skills">
              <Option value="Space Planning">Space Planning</Option>
              <Option value="Color Theory">Color Theory</Option>
              <Option value="Project Management">Project Management</Option>
              <Option value="3D Modeling">3D Modeling</Option>
              <Option value="AutoCAD">AutoCAD</Option>
              <Option value="SketchUp">SketchUp</Option>
              <Option value="Material Selection">Material Selection</Option>
              <Option value="Client Relations">Client Relations</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {selectedMember ? 'Update' : 'Add'} Team Member
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamManagement;
