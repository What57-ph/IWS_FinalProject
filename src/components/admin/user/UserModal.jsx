import {
  Modal,
  Form,
  Input,
  DatePicker,
  Cascader,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import HandleLocation from "../event/handleLocation";

const UserModal = ({ form, open, handleSubmit, handleCancel }) => {
  const requestType = form.getFieldValue("id") ? "put" : "post";
  return (
    <Modal
      title={form.getFieldValue("id") ? "Edit user" : "Add user"}
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
        onFinish={(values) => {
          handleSubmit(values, requestType);
          console.log(values);
        }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true },
            // { type: "email", message: "Email is invalid" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true },
            // { type: "name", message: "User name is invalid" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true },
            // {
            //   type: "password",
            //   message: "Password is invalid",
            // },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true },
            // { type: "phone", message: "Phone number is invalid" },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex flex-row w-full gap-5">
          <Form.Item label="Select" className="flex-1" name="role">
            <Select>
              <Select.Option value="2">USER</Select.Option>
              <Select.Option value="1">ADMIN</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="DatePicker"
            className="flex-1"
            name="dob"
            getValueProps={(value) => ({
              value: value ? dayjs(value) : null,
            })}
            getValueFromEvent={(date) =>
              date ? date.format("DD/MM/YYYY") : ""
            }
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </div>

        <HandleLocation form={form} />
      </Form>
    </Modal>
  );
};

export default UserModal;
