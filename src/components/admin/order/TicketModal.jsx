import { Button, Card, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { formatVND } from "../../share/function/formatterCurrency";

const TicketModal = ({ form, items, setItems, totalPrice, setTotalPrice }) => {

  // get data for field ticket 

  const [localForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventId, setEventId] = useState(null);

  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const [subTotalPrice, setSubtotalPrice] = useState(0);

  useEffect(() => {
    const calculatedSubTotal = selectedTicketPrice * quantity;
    setSubtotalPrice(parseInt(calculatedSubTotal));
    // console.log("This is subtotal price:", subTotalPrice);

    localForm.setFieldsValue({ subTotal: calculatedSubTotal });
  }, [quantity, selectedTicketPrice]);


  // useEffect(() => {
  //   console.log(subTotalPrice);
  // }, [subTotalPrice])


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



  // data

  const { events } = useAuth();
  // console.log("Test get data events : ", events);

  const event = events.find(e => e.id === eventId);
  const tickets = event?.tickets || [];

  // console.log("Ticket name: ", tickets);

  // const getTicketName = (ticketId) => {
  //   const foundTicket = ticketName.find(ticket => ticket.id === ticketId);
  //   return foundTicket ? foundTicket.type : "Unknown Ticket";
  // };


  const getEventName = (eventId) => {
    const foundEvent = events.find(event => event.id === eventId);
    return foundEvent ? foundEvent.name : "Unknown Event";
  };


  const handleTicketTypeChange = (value) => {
    const selectedTicket = tickets.find(ticket => ticket.type === value);
    if (selectedTicket) {
      const price = parseFloat(selectedTicket.price);
      setSelectedTicketPrice(price);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
  };



  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Form.Item name="items" initialValue={[]} rules={[{ required: true, message: 'Vui lòng chọn ít nhất một sản phẩm' }]} noStyle>
        <Input hidden />
      </Form.Item>

      {/* Hiển thị lỗi */}
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

      <div className="mb-6 grid gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            title={`Ticket Type #${index + 1}`}
            className="shadow-md"
            actions={[
              form.getFieldValue('orderId') ?
                <EditOutlined
                  style={{ fontSize: '20px' }}
                // onClick={}
                />
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
            <div className="space-y-2 text-[13px] md:text-[17px]">
              <p><strong>Event:</strong> {getEventName(item.event)}</p>
              <p><strong>Ticket:</strong> {item.ticketType}</p>
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
              name="ticketType"
              label="Ticket"
              className="flex-1"
              rules={[{ required: true, message: 'Please choose ticket!' }]}
            >
              <Select onChange={handleTicketTypeChange}>
                {
                  tickets.map(ticket => (
                    <Select.Option key={ticket.type} value={ticket.type} >{ticket.type}</Select.Option>
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