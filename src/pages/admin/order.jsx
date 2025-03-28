import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space } from "antd";
import { useState } from "react";

const OrderPage = () => {
  const [form] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTicket = (values) => {
    setTickets([...tickets, values]);
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Danh sách các vé đã thêm */}
      <div className="mb-6 grid gap-4">
        {tickets.map((ticket, index) => (
          <Card
            key={index}
            title={`Ticket #${index + 1}`}
            className="shadow-md"
            actions={[
              <MinusCircleOutlined
                onClick={() => setTickets(tickets.filter((_, i) => i !== index))}
                className="text-red-500"
              />
            ]}
          >
            <div className="space-y-2">
              <p><strong>Type:</strong> {ticket.type}</p>
              <p><strong>Price:</strong> ${ticket.price}</p>
              <p><strong>Quantity:</strong> {ticket.quantity}</p>
              {ticket.description && <p><strong>Description:</strong> {ticket.description}</p>}
            </div>
          </Card>
        ))}
      </div>

      {/* Nút thêm vé mới */}
      <Button
        type="dashed"
        onClick={() => setIsModalVisible(true)}
        icon={<PlusOutlined />}
        block
        className="mb-6"
      >
        Add Ticket Type
      </Button>

      {/* Form thêm vé trong Modal */}
      <Modal
        title="Add New Ticket"
        visible={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
        }}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleAddTicket}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="type"
            label="Ticket Type"
            rules={[{ required: true, message: 'Please input ticket type!' }]}
          >
            <Input placeholder="VIP, Standard, etc." />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              name="price"
              label="Price"
              className="flex-1"
              rules={[{ required: true, message: 'Please input price!' }]}
            >
              <Input type="number" prefix="$" />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              className="flex-1"
              rules={[{ required: true, message: 'Please input quantity!' }]}
            >
              <Input type="number" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description (Optional)"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Nút submit cuối cùng */}
      {tickets.length > 0 && (
        <div className="text-right">
          <Button
            type="primary"
            size="large"
            onClick={() => console.log('Final submit:', tickets)}
          >
            Confirm Order ({tickets.length} tickets)
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;