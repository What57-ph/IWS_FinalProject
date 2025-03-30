import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Space, Table } from "antd";
import { useState } from "react";
import sampleData from "../../data/sampleData";
import { Grid } from 'antd';
import UserModal from "../../components/admin/user/UserModal";
import OrderModal from "../../components/admin/order/OrderModal";
import OrderDetailModal from "../../components/admin/order/OrderDetailModal";


const OrderPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [orders, setOrders] = useState(sampleData.orders);
  console.log(orders);

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
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      responsive: ['md'],
      width: 500
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      responsive: ['md']
    },
    {
      title: 'Total price',
      dataIndex: 'total_price',
      key: 'role',
      responsive: ['md'],
      render: (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
        return `${formattedPrice} đ`;
      }
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
  const handleEdit = (order) => {
    console.log(order);

    form.setFieldsValue(order);
    setOpenModal(true);
  };

  // get detail order
  const handleGetInfo = (order) => {
    console.log(order);

    form.setFieldsValue(order);
    setOpenDetail(true);
  };

  const handleSubmit = (values) => {
    console.log('All form values:', values);
    message.success('Lưu thành công!');
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  // for order detail
  const handleClose = () => {
    setOpenDetail(false);
  }

  const mobileRowRender = (record) => (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-blue-600 text-white">
      <div className="grid grid-cols-1 gap-3"> {/* Đổi thành 1 cột */}
        <div className="flex flex-row gap-2">
          <div className="text-sm font-medium ">Id: </div>
          <div className="text-base">{record.id}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-sm font-medium ">User: </div>
          <div className="text-base">{record.user}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-sm font-medium ">Status: </div>
          <div className="text-base">{record.status}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-sm font-medium ">Total price: </div>
          <div className="text-base">{record.total_price}</div>
        </div>
        <div className="flex justify-end mt-2"> {/* Bỏ col-span-2 */}
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
              size="small"
            />
          </Space>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of orders</h2>
        <Button icon={<PlusOutlined />} type="primary"
          onClick={() => { form.resetFields(); setOpenModal(true) }}>
          Add
        </Button>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {orders.map((user) => (
            <div key={user.id}>{mobileRowRender(user)}</div>
          ))}
        </div>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="id"
          bordered
          scroll={{ x: true }}
          size="middle"
        />
      )}

      <OrderModal
        open={openModal}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        form={form}
      />

      <OrderDetailModal
        open={openDetail}
        handleCancel={handleClose}
        form={form}
      />


    </div>
  )
}
export default OrderPage