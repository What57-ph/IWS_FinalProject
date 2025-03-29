import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber } from "antd";
import HandleLocation from "../event/handleLocation";

const OrderModal = ({ form, open, handleSubmit, handleCancel }) => {
  return (
    <Modal
      title={form.getFieldValue('id') ? "Edit user" : "Add user"}
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
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="user" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="total_price" label="Total Price" rules={[{ required: true }]}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
            parser={(value) => value.replace(/\đ\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Status" className="flex-1" name="status" >
          <Select>
            <Select.Option value="Pending">PENDING</Select.Option>
            <Select.Option value="SENDING">SENDING</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderModal;