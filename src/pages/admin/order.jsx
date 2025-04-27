import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Grid } from 'antd';
import OrderModal from "../../components/admin/order/OrderModal";
import OrderDetailModal from "../../components/admin/order/OrderDetailModal";
import { callCreateOrder, callDeleteOrder, callOrders, callUpdateOrder } from "../../config/api";
import { toast, ToastContainer } from "react-toastify";
import EnumStatusOrder from "../../utils/EnumStatusOrder";


const OrderPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // for modal handle get ticket order
  const [items, setItems] = useState([]);


  const [orders, setOrders] = useState([]);
  // console.log(orders);

  // Fetch orders on component mount and whenever the refresh trigger changes
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger])

  // reload table after fetch 

  const refreshTable = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // useEffect(() => {
  //   console.log("Orders updated:", orders);
  // }, [orders]);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;


  // Columns cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      width: 70,
      responsive: ['md']
    },
    {
      title: 'User',
      render: (record) => <a className="text-blue-800">{record.user?.email}</a>,
      key: 'user',
      responsive: ['md'],
      width: 500,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      responsive: ['md'],
      render: (status) => {
        const color = status === 'CANCELED' ? 'volcano' : status === 'CONFIRMED' ? 'green' : 'orange';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: EnumStatusOrder.map((status) => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
      filterSearch: true,
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      responsive: ['md'],
      render: (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
        return `${formattedPrice} đ`;
      },
      defaultSortOrder: 'descend',
      sorter: (a, b) => parseInt(a.totalPrice) - parseInt(b.totalPrice),
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
          <Popconfirm
            title="Do you sure want to delete ?"
            onConfirm={() => handleDelete(record.orderId)}
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
      fixed: 'right',
      width: 100
    }
  ];

  // handle function 
  const handleEdit = (order) => {
    console.log("Check record to edit", order);
    // console.log(order.items[0].ticket.ticketId);


    form.setFieldsValue({
      ...order,
      items: order.items
    });

    // update items 
    setItems(order.items || []);

    setOpenModal(true);
  };


  // get detail order
  const handleGetInfo = (order) => {
    console.log(order);

    form.setFieldsValue(order);
    setOpenDetail(true);
  };

  const resetAll = () => {
    setItems([]);
    form.resetFields();
  };


  // CRUD

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await callOrders();
      // console.log(res.data.result);

      if (res && res.data) {
        setOrders(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Fetch failed';
      console.log({ errorMessage });
      // alert(errorMessage);
    }
  }

  const handleSubmit = async (values) => {
    console.log('All form values to create:', values);
    setIsSubmitting(true);

    try {
      const res = await callCreateOrder(values);
      console.log("Call create order value: ", res);
      if (res?.data) {
        resetAll();
        setOpenModal(false);

        toast.success("Create event successfully !", {
          position: "top-right",
        });
        refreshTable();
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        'Create failed!';

      // console.log("Full error object:", error.message);

      toast.error(errorMessage, {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleUpdate = async (values) => {
    console.log('All form values to update:', values);
    setIsSubmitting(true);

    try {
      const res = await callUpdateOrder(values);
      console.log("Call update order value: ", res);
      if (res?.data) {
        resetAll();
        setOpenModal(false);
        toast.success("Update event successfully !", {
          position: "top-right",
        });
        refreshTable();
      }
    } catch (error) {
      const errorMessage = error?.message || 'Update failed!';
      alert(errorMessage);

      // console.log({ errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (orderId) => {
    console.log('All form values:', orderId);
    try {
      const res = await callDeleteOrder(orderId);
      console.log("Call delete order: ", res.message);
      toast.success("Delete event successfully !", {
        position: "top-right",
      });
      refreshTable();

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Create failed!';
      toast.error({ errorMessage }, {
        position: "top-right",
      });
      refreshTable();
      console.log({ errorMessage });
    }
  }

  // CRUD end 

  const handleCancel = () => {
    resetAll();
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
            <Popconfirm
              title="Do you sure want to delete ?"
              onConfirm={() => handleDelete(record.orderId)}
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
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-full overflow-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of orders</h2>
        <Button icon={<PlusOutlined />} type="primary"
          onClick={() => { form.resetFields(); setOpenModal(true) }}>
          Add
        </Button>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {orders?.map((user) => (
            <div key={user.id}>{mobileRowRender(user)}</div>
          ))}
        </div>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="Order id"
          bordered
          scroll={{ x: true }}
          size="middle"
          pagination={{ pageSize: 7 }}
        />
      )}

      <OrderModal
        open={openModal}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
        items={items} setItems={setItems}
        form={form}
        isSubmitting={isSubmitting}
      />

      <OrderDetailModal
        open={openDetail}
        handleCancel={handleClose}
        handleSubmit={handleClose}
        form={form}
      />


    </div>

    // <div></div>
  )
}
export default OrderPage