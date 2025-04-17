import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber } from "antd";

const OrderDetailModal = ({ form, open, handleSubmit, handleCancel }) => {

  const orderDetail = form.getFieldValue('items');
  // console.log("from order detail modal", [orderDetail]);


  return (
    <Modal
      title="Order detail"
      open={open}
      onOk={() => handleCancel()}
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
      <div className=" p-4 rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-black font-medium min-w-[120px]">Order ID:</span>
              <span className="text-black font-semibold">{form.getFieldValue('orderId') || 'N/A'}</span>
            </div>
            <div className="flex items-start">
              <span className="text-black font-medium min-w-[120px]">Receiver Name:</span>
              <span className="text-black">{form.getFieldValue('receiverName') || 'N/A'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-black font-medium min-w-[120px]">Receiver email:</span>
              <span className="text-black break-all">{form.getFieldValue('receiverEmail') || 'N/A'}</span>
            </div>
            <div className="flex items-start">
              <span className="text-black font-medium min-w-[120px]">Receiver phone:</span>
              <span className="text-black">{form.getFieldValue('receiverPhone') || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {orderDetail?.map((o, index) => (
        <div key={o.id} className="bg-blue-600 rounded-md p-4 text-white text-[16px] mb-2">
          <div className="font-medium mb-2">Ticket #{index + 1}</div>
          {/* <div className="font-medium mb-2">Event: { }</div> */}

          <div className="grid grid-cols-2 gap-2">
            <div>Order detail id: {o.id}</div>
            <div>Ticket id: {o.ticket?.ticketId}</div>
            <div>Ticket name: {o.ticket?.name}</div>
            <div>Event date: {o.ticket?.eventDate ? new Date(o.ticket.eventDate).toLocaleDateString() : 'N/A'}</div>
            <div>Price: {o.price?.toLocaleString('vi-VN')} đ</div>
            <div>Quantity: {o.quantity}</div>
            <div className="col-span-2 border-t pt-2 mt-2">
              Subtotal: {(o.price * o.quantity)?.toLocaleString('vi-VN')} đ
            </div>
          </div>
        </div>
      ))}

    </Modal>
  );
};

export default OrderDetailModal;