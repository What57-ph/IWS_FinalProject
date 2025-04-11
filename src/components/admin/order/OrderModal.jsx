import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber, Button, Card } from "antd";
import { useEffect, useState } from "react";
import TicketModal from "./TicketModal";
import { formatVND } from "../../share/function/formatterCurrency";

const OrderModal = ({ form, open, handleSubmit, handleCancel, items, setItems, isSubmitting }) => {



  // data field end 

  // for total price
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    form.setFieldsValue({
      totalPrice: totalPrice
    });
  }, [totalPrice, form]);

  // total price calculator end 

  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + parseInt(item.subTotal), 0);
    setTotalPrice(sum);
  }, [items])


  return (
    <Modal
      title={form.getFieldValue('orderId') ? "Edit order" : "Add order"}
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      width={800}
      styles={{
        body: {
          maxHeight: "50vh",
          overflowY: "auto",
          padding: "16px",
        }
      }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical" disabled={isSubmitting}>
        <div className="grid grid-cols-2 gap-2 ">

          <Form.Item name="receiverEmail" label="Receiver email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="receiverPhone" label="Receiver phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="receiverName" label="Receiver name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true }]}>
            <Input
              style={{ width: '100%' }}
              readOnly
              value={parseInt(totalPrice)}
              placeholder={formatVND(totalPrice)}
            />
          </Form.Item>

          {/* <Form.Item label="Status" className="flex-1" name="status" >
            <Select>
              <Select.Option value="Pending">PENDING</Select.Option>
              <Select.Option value="SENDING">SENDING</Select.Option>
            </Select>
          </Form.Item> */}
        </div>

        <TicketModal form={form} items={items} setItems={setItems} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />

      </Form>

      {/* ticket data part  */}




    </Modal>
  );
};

export default OrderModal;