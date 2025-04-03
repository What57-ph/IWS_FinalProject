import {
  Modal,
  Form,
  Input,
  DatePicker,
  Cascader,
  Select,
  InputNumber,
  Card,
  Button,
} from "antd";
import dayjs from "dayjs";

const UserDetail = ({ form, open, handleCancel }) => {
  // const orderId = form.getFieldValue('id');
  // const orderDetail = sampleData.orderDetails.filter(o => o.order_id === orderId);
  // console.log(orderDetail);

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
          padding: "16px",
        },
      }}
    >
      <Form
        form={form}
        style={{ maxWidth: 800 }}
        layout="vertical"
        className="grid grid-cols-2 gap-x-8 gap-y-4"
      >
        {/* Row 1 - Basic Info */}
        <Form.Item
          label="User ID"
          name="id"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        {/* Row 2 - Role & Date */}
        <Form.Item
          label="Role"
          name="role"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Select className="font-normal h-10" disabled>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="USER">USER</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dob"
          className="font-semibold"
          labelCol={{ span: 24 }}
          getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
        >
          <DatePicker className="font-normal w-full h-10" disabled />
        </Form.Item>

        {/* Row 3 - Address Part 1 */}
        <Form.Item
          label="Province/City"
          name="province"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="District"
          name="district"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        {/* Row 4 - Address Part 2 */}
        <Form.Item
          label="Ward/Commune"
          name="ward"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="Street/House Number"
          name="houseNumber"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        {/* Row 5 - Phone (full width) */}
        <Form.Item
          label="Phone Number"
          name="phone"
          className="font-semibold col-span-2"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetail;
