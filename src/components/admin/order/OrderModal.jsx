import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber, Button, Card } from "antd";
import { useEffect, useState } from "react";
import TicketModal from "./TicketModal";
import { formatVND } from "../../share/function/formatterCurrency";
import EnumStatusOrder from "../../../utils/EnumStatusOrder";

const OrderModal = ({ form, open, handleSubmit, handleUpdate, handleCancel, items, setItems, isSubmitting }) => {

  console.log("Get items detail form order modal", items);


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
      <Form form={form} onFinish={form.getFieldValue('orderId') ? handleUpdate : handleSubmit} layout="vertical" disabled={isSubmitting}>
        <div className="grid grid-cols-2 gap-2 ">

          <Form.Item name="orderId" label="" hidden>
            <Input />
          </Form.Item>

          {
            form.getFieldValue('orderId') ?
              <Form.Item name="receiverEmail" label="Receiver email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]} >
                <Input readOnly />
              </Form.Item>
              :
              <Form.Item name="receiverEmail" label="Receiver email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
                <Input />
              </Form.Item>}

          <Form.Item name="receiverPhone" label="Receiver phone" rules={[
            { required: true, message: 'Phone number is required!' },
            { pattern: /^[0-9]{10,15}$/, message: 'Invalid phone number!' }
          ]}>
            <Input />
          </Form.Item>

          <Form.Item name="receiverName" label="Receiver name" rules={[
            { required: true, message: 'Name is required!' },
            { min: 2, message: 'Name too short!' },
            { max: 50, message: 'Name too long!' }
          ]}>
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

          {form.getFieldValue('orderId')
            &&
            <Form.Item label="Status" className="flex-1" name="status" >
              <Select >
                {
                  EnumStatusOrder.map(status => (
                    <Select.Option key={status} value={status}>{status}</Select.Option>
                  ))
                }

              </Select>
            </Form.Item>}
        </div>

        <TicketModal form={form} items={items} setItems={setItems} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />

      </Form>

      {/* ticket data part  */}




    </Modal>
  );
};

export default OrderModal;