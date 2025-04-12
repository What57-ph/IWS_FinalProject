import { Button, Card, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { formatVND } from "../../share/function/formatterCurrency";

const TicketModal = ({ form, items, setItems, totalPrice, setTotalPrice }) => {

  console.log("Get items detail form ticket modal", items);

  // data

  const { events } = useAuth();
  // console.log("Test get data events : ", events);



  // console.log("Ticket name: ", tickets);
  // console.log("Events name: ", events);

  // get data for field ticket 

  const [localForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventId, setEventId] = useState(null);

  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [subTotalPrice, setSubtotalPrice] = useState(0);

  const event = events.find(e => e.id === eventId);
  const tickets = event?.tickets || [];

  // calculate sub price 

  useEffect(() => {
    const calculatedSubTotal = selectedTicketPrice * quantity;
    setSubtotalPrice(parseInt(calculatedSubTotal));
    // console.log("This is subtotal price:", subTotalPrice);

    localForm.setFieldsValue({ subTotal: calculatedSubTotal });
  }, [quantity, selectedTicketPrice]);

  const handleTicketTypeChange = (value) => {
    const selectedTicket = tickets.find(ticket => ticket.id === value);
    console.log("Selected ticket: ", selectedTicket);
    if (selectedTicket) {
      console.log("Get price", selectedTicket.price);
      const price = parseFloat(selectedTicket.price);
      setSelectedTicketPrice(price);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
  };

  // calculate end 

  // Add new items or update existing items 
  useEffect(() => {
    const existingTickets = form.getFieldValue('items') || [];
    setItems(existingTickets);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ items });
  }, [items, form]);

  const handleAddTicket = (values) => {
    const newTickets = [...items, values];
    setItems(newTickets);
    console.log(newTickets);

    localForm.resetFields();
    setIsModalVisible(false);
  };

  // end 

  // Get name for event and ticket 

  const getEventName = (eventId) => {
    const foundEvent = events.find(event => event.id === eventId);
    return foundEvent ? foundEvent.name : "Unknown Event";
  };

  const getTicketName = (ticketId) => {
    const foundTicket = events.find(event => event.tickets.some(ticket => ticket.id === ticketId))
    console.log(foundTicket);
    const ticketName = foundTicket.tickets.find(ticket => ticket.id === ticketId);
    return ticketName ? ticketName.type : "null";
  }

  // end 

  // handle edit items 

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Form.Item name="items" initialValue={[]} rules={[{ required: true, message: 'Vui lòng chọn ít nhất một sản phẩm' }]} noStyle>
        <Input hidden />
      </Form.Item>

      {/* Hiển thị lỗi */}
      {!form.getFieldValue('orderId') &&
        <>
          <Form.Item shouldUpdate>
            {({ getFieldError }) => (
              <div style={{ color: 'red' }}>
                {getFieldError('items')?.join(', ')}
              </div>
            )}
          </Form.Item>

          <Button
            type="dashed"
            onClick={() => setIsModalVisible(true)}
            icon={<PlusOutlined />}
            block
            className="mb-6"
          >
            Add Ticket Type
          </Button>
        </>
      }

      <div className="mb-3 grid gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            title={`Ticket Type #${index + 1}`}
            className="shadow-md"
            actions={[
              form.getFieldValue('orderId') ?
                <></>
                :
                <MinusCircleOutlined
                  style={{ fontSize: '20px', color: 'lightCoral' }}
                  onClick={() => {
                    const newTickets = items.filter((_, i) => i !== index);
                    setItems(newTickets);
                  }}
                />
            ]}
          >
            <div className="space-y-1 text-[13px] md:text-[17px]">
              <p><strong>Event:</strong> {form.getFieldValue('orderId') ? item?.ticket?.event : getEventName(eventId)}</p>
              <p><strong>Ticket:</strong> {form.getFieldValue('orderId') ? item?.ticket?.name : getTicketName(item.ticketId)}</p>
              <p><strong>Price:</strong> {formatVND(item.subTotal)}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              {item.description && <p><strong>Description:</strong> {item.description}</p>}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title="Add New Ticket"
        open={isModalVisible}
        onCancel={() => {
          localForm.resetFields();
          setIsModalVisible(false);
        }}
        onOk={() => localForm.submit()}
        width={750}
        destroyOnClose
      >
        <Form
          form={localForm}
          onFinish={handleAddTicket}
          layout="vertical"
          className="mt-4"
        >
          <div className="flex gap-4">
            <Form.Item
              name="event"
              label="Event"
              className="flex-1"
              rules={[{ required: true, message: 'Please choose event!' }]}
            >
              <Select value={eventId} onChange={(value) => setEventId(value)}>
                {
                  events.map(event => (
                    <Select.Option key={event.id} value={event.id}>{event.name}</Select.Option>
                  ))
                }

              </Select>
            </Form.Item>
            <Form.Item
              name="ticketId"
              label="Ticket"
              className="flex-1"
              rules={[{ required: true, message: 'Please choose ticket!' }]}
            >
              <Select onChange={handleTicketTypeChange}>
                {
                  tickets.map(ticket => (
                    <Select.Option key={ticket.id} value={ticket.id} >{ticket.type}</Select.Option>
                  ))
                }

              </Select>
            </Form.Item>
          </div>
          <div className="flex gap-4">
            <Form.Item
              name="quantity"
              label="Quantity"
              className="flex-1"
              rules={[{ required: true, message: 'Please input quantity!' }]}
            >
              <Input type="number" onChange={handleQuantityChange} />
            </Form.Item>

            <Form.Item
              name="subTotal"
              label="Subtotal"
              className="flex-1"
            >
              <Input type="number" value={subTotalPrice} placeholder={formatVND(subTotalPrice)}
                onChange={(value) => setTotalPrice(value)} readOnly />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
export default TicketModal