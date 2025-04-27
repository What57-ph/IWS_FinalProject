import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space } from "antd";
import { useEffect, useState } from "react";

const HandleTicketType = ({ form, initialValues, requestType }) => {
  const [localForm] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const existingTickets = form.getFieldValue('tickets') || [];
    setTickets(existingTickets);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ tickets });
  }, [tickets, form]);

  const handleAddTicket = (values) => {
    const newTickets = [...tickets, values];
    setTickets(newTickets);
    localForm.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Form.Item name="tickets" hidden>
        <Input />
      </Form.Item>

      <div className="mb-6 grid gap-4">
        {(requestType === "put" ? initialValues.tickets : tickets).map((ticket, index) => (
          <Card
            key={index}
            title={`Ticket Type #${index + 1}`}
            className="shadow-md"
            actions={[
              <MinusCircleOutlined
                onClick={() => {
                  const newTickets = tickets.filter((_, i) => i !== index);
                  setTickets(newTickets);
                }}
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

      <Button
        type="dashed"
        onClick={() => setIsModalVisible(true)}
        icon={<PlusOutlined />}
        block
        className="mb-6"
      >
        Add Ticket Type
      </Button>

      <Modal
        title="Add New Ticket"
        open={isModalVisible}
        onCancel={() => {
          localForm.resetFields();
          setIsModalVisible(false);
        }}
        onOk={() => localForm.submit()}
        destroyOnClose
      >
        <Form
          form={localForm}
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
    </div>
  );
};

export default HandleTicketType;