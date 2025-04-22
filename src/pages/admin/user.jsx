import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, message, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import sampleData from "../../data/sampleData";
import { Grid } from "antd";
import UserModal from "../../components/admin/user/UserModal";
import UserDetail from "../../components/admin/user/UserDetail";
import {
  createNewUser,
  deleteUser,
  getUserList,
  updateUser,
} from "../../config/api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const UserPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [requestType, setRequestType] = useState("post");
  const [users, setUsers] = useState(sampleData.user);
  const [isUpdatedUser, setIsUpdatedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: [],
    name: [],
    password: [],
    phone: [],
  });
  // console.log(users);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  useEffect(() => {
    const getUserListData = async () => {
      const data = await getUserList();
      setUsers(data);
    };
    getUserListData();
  }, [isUpdatedUser]);

  // Columns cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 70,
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "name",
      responsive: ["md"],
      width: 500,
      render: (name) => <span className="text-blue-500">{name}</span>
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "address",
      responsive: ["md"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      responsive: ["md"],
      render: (status) => {
        const color = status === 'admin' ? 'blue' : 'green';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: 'ADMIN',
          value: 'ADMIN',
        },
        {
          text: 'USER',
          value: 'USER',
        },
      ],
      onFilter: (value, record) => record.role === value,
      filterSearch: true,
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)} // pass current value
            size="small"
          />
          <Popconfirm
            title="Do you sure want to delete ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            placement="left"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"
            />
          </Popconfirm>

          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleGetInfo(record)}
            type="primary"
            size="small"
          />
        </Space>
      ),
      fixed: "right",
      width: 100,
    },
  ];

  // handle function
  const handleEdit = (user) => {
    console.log(user);
    setRequestType("put");
    form.setFieldsValue(user);
    setOpenModal(true);
  };
  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    setUsers((prev) => prev.filter((item) => item.id != id));
  };
  const handleSubmit = async (values) => {
    try {
      // Transform data for backend
      const backendData = {
        ...values,
        role: Number(values.role),
        dob: dayjs(values.dob).format("YYYY-MM-DD"),
      };

      let response;
      if (requestType === "post") {
        response = await createNewUser(backendData);
        setUsers((prev) => [...prev, response]);
        toast.success("Create user successfully");
      } else if (requestType === "put") {
        backendData.id = values.id;
        response = await updateUser(backendData);
        setUsers((prev) =>
          prev.map((u) => (u.id === backendData.id ? response : u))
        );
        toast.success("Update user successfully");
        setIsUpdatedUser(!isUpdatedUser);
      }

      message.success("Operation successful!");
      setOpenModal(false);
    } catch (error) {
      message.error("Operation failed!");
      if (error?.status === 500) {
        toast.error(error.message);
        return;
      }
      error?.message?.map((err) => toast.error(err));
    }
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
  };

  const mobileRowRender = (record) => (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-blue-600 text-white">
      <div className="grid grid-cols-1 gap-3">
        {" "}
        {/* Đổi thành 1 cột */}
        <div>
          <div className="text-sm font-medium break-words whitespace-normal">
            Email
          </div>
          <div className="text-base break-all">{record.email}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Phone</div>
          <div className="text-base">{record.phone}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Role</div>
          <div className="text-base">{record.role}</div>
        </div>
        <div className="flex justify-end mt-2">
          {" "}
          {/* Bỏ col-span-2 */}
          <Space>
            <Button icon={<EditOutlined />} size="small" />

            <Popconfirm
              title="Do you sure want to delete ?"
              onConfirm={() => handleDelete(record.id)}
              okText="Có"
              placement="left"
              cancelText="Không"
            >
              <Button
                icon={<DeleteOutlined />}
                danger
                size="small"
              />
            </Popconfirm>
          </Space>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of events</h2>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            form.resetFields();
            setOpenModal(true);
            setRequestType("post");
          }}
        >
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
          pagination={{ pageSize: 7 }}
        />
      )}

      <UserModal
        open={openModal}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        form={form}
      />

      <UserDetail open={openDetail} handleCancel={handleClose} form={form} />
    </div>
  );
};
export default UserPage;
