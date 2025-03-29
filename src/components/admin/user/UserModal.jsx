import { Modal, Form, Input, DatePicker, Cascader, Select } from "antd";
import dayjs from 'dayjs';
import HandleLocation from "../event/handleLocation";

const UserModal = ({ form, open, handleSubmit, handleCancel }) => {
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
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <div className="flex flex-row w-full gap-5">
          <Form.Item label="Select" className="flex-1" name="role" >
            <Select>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="DatePicker" className="flex-1" name="dob" getValueProps={(value) => ({ value: value ? dayjs(value) : null })}>
            <DatePicker />
          </Form.Item>
        </div>

        <HandleLocation form={form} />

      </Form>
    </Modal>
  );
};

export default UserModal;