import {
    Modal,
    Form,
    Input
} from "antd";



const OrganizerModal = ({ form, open, handleSubmit, handleCancel }) => {
    const requestType = form.getFieldValue("id") ? "put" : "post";
    return (
        <Modal
            title={form.getFieldValue("id") ? "Edit organizer" : "Add organizer"}
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
                    // console.log(values);
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
                    name="phone"
                    label="Phone"
                    rules={[
                        { required: true },
                        // { type: "phone", message: "Phone number is invalid" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        { required: false },
                        // { type: "phone", message: "Phone number is invalid" },
                    ]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>




            </Form>
        </Modal>
    );
};

export default OrganizerModal;
