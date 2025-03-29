import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Space, Table } from "antd";
import { useState } from "react";
import sampleData from "../../data/sampleData";
import { Grid } from 'antd';
import UserModal from "../../components/admin/user/UserModal";
import UserDetail from "../../components/admin/user/UserDetail";


const UserPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);


  const [users, setUsers] = useState(sampleData.user);
  // console.log(users);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;


  // Columns cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 70,
      responsive: ['md']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'name',
      responsive: ['md'],
      width: 500
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'address',
      responsive: ['md']
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      responsive: ['md']
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}   // pass current value
            size="small"
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
          />
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleGetInfo(record)}
            type="primary"
            size="small"
          />
        </Space>
      ),
      fixed: 'right',
      width: 100
    }
  ];

  // handle function 
  const handleEdit = (user) => {
    console.log(user);

    form.setFieldsValue(user);
    setOpenModal(true);
  };

  const handleSubmit = (values) => {
    console.log('All form values:', values);
    message.success('Lưu thành công!');
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  // get detail order
  const handleGetInfo = (order) => {
    console.log(order);

    form.setFieldsValue(order);
    setOpenDetail(true);
  };
  const handleClose = () => {
    setOpenDetail(false);
  }

  const mobileRowRender = (record) => (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-blue-600 text-white">
      <div className="grid grid-cols-1 gap-3"> {/* Đổi thành 1 cột */}
        <div>
          <div className="text-sm font-medium ">Email</div>
          <div className="text-base">{record.email}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Phone</div>
          <div className="text-base">{record.phone}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Role</div>
          <div className="text-base">{record.role}</div>
        </div>
        <div className="flex justify-end mt-2"> {/* Bỏ col-span-2 */}
          <Space>
            <Button icon={<EditOutlined />} size="small" />
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Space>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of events</h2>
        <Button icon={<PlusOutlined />} type="primary"
          onClick={() => { form.resetFields(); setOpenModal(true) }}>
          Add
        </Button>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id}>{mobileRowRender(user)}</div>
          ))}
        </div>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          bordered
          scroll={{ x: true }}
          size="middle"
        />
      )}

      <UserModal
        open={openModal}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        form={form}
      />

      <UserDetail
        open={openDetail}
        handleCancel={handleClose}
        form={form}
      />
    </div>
  )
}
export default UserPage