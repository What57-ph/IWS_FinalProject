import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber } from "antd";
import sampleData from "../../../data/sampleData";

const OrderDetailModal = ({ form, open, handleSubmit, handleCancel }) => {

  console.log(form.getFieldValue('id'));
  const orderId = form.getFieldValue('id');
  const orderDetail = sampleData.orderDetails.filter(o => o.order_id === orderId);
  console.log(orderDetail);


  return (
    <Modal
      title="Order detail"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      width={800}
      styles={{
        body: {
          maxHeight: "50vh",
          overflowY: "auto",
          padding: "16px"
        }
      }}
    >

      {orderDetail.map(o => (
        <div className="bg-blue-600 rounded-md p-4 text-white text-[16px] mb-2">
          <div>Order detail id: {o.id}</div>
          <div>Order id: {o.order_id}</div>
          <div>Ticket id: {o.ticket_id}</div>
        </div>
      ))}

    </Modal>
  );
};

export default OrderDetailModal;