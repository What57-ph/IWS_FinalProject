import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber, Card, Button } from "antd";
import dayjs from "dayjs";

const EventDetailModal = ({ form, open, handleCancel }) => {

  console.log(form.getFieldValue());
  const eventId = form.getFieldValue('id');
  return (
    <Modal
      title={`Event id: ${eventId}`}
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
      <Form
        form={form}
        style={{ maxWidth: 800 }}
        layout="vertical"
        className="grid grid-cols-2 gap-x-8 gap-y-4"
      >
        <Form.Item
          label="Event name"
          name="name"
          className="font-semibold col-span-2"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Select className="font-normal h-10" disabled>
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="USER">USER</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date start"
          name="date"
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
          name="house_number"
          className="font-semibold"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>

        <Form.Item
          label="Organizer"
          name="organizer"
          className="font-semibold col-span-2"
          labelCol={{ span: 24 }}
        >
          <Input className="font-normal h-10" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventDetailModal;