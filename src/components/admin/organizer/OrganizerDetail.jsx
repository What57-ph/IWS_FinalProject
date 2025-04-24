import {
    Modal,
    Form,
    Input

} from "antd";


const OrganizerDetail = ({ form, open, handleCancel }) => {
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
                style={{ maxWidth: 810 }}
                layout="vertical"
                className="grid grid-cols-2 gap-x-8 gap-y-4"
            >
                {/* Row 1 - Basic Info */}
                <Form.Item
                    label="Organizer ID"
                    name="id"
                    className="font-semibold"
                    labelCol={{ span: 24 }}
                >
                    <Input className="font-normal h-10" disabled />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
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
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    className="font-semibold "
                    labelCol={{ span: 24 }}
                >
                    <Input className="font-normal h-10" disabled />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    className="font-semibold col-span-2"

                >
                    <Input.TextArea className="font-normal" rows={6} disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrganizerDetail;
