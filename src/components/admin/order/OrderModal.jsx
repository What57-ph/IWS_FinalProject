import { EditOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Input, DatePicker, Cascader, Select, InputNumber, Button, Card } from "antd";
import { useEffect, useState } from "react";
import sampleData from "../../../data/sampleData";

const OrderModal = ({ form, open, handleSubmit, handleCancel, items, setItems, isSubmitting }) => {

  // get data for field ticket 

  const [localForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    localForm.resetFields();
    setIsModalVisible(false);
  };

  // data field end 

  // for total price
  const [totalPrice, setTotalPrice] = useState(500);
  useEffect(() => {
    form.setFieldsValue({
      total_price: totalPrice
    });
  }, [totalPrice, form]);

  // total price calculator end 



  // dataSample 

  const events = sampleData.events.map(event => ({
    id: event.id,
    name: event.name
  }));
  // console.log(events);

  const [eventId, setEventId] = useState(null);

  // useEffect(() => {
  //   console.log("event id:", eventId);
  // }, [eventId])

  const ticketName = sampleData.ticket.filter((ticket) => ticket.event_id === eventId)
    .map(ticket => ({
      id: ticket.id,
      type: ticket.type
    }))

  const getTicketName = (ticketId) => {
    const foundTicket = ticketName.find(ticket => ticket.id === ticketId);
    // console.log("check ticket id : ", ticketId);
    // console.log(ticketName);

    return foundTicket ? foundTicket.type : "Unknown Ticket";
  };


  const getEventName = (eventId) => {
    const foundEvent = events.find(event => event.id === eventId);
    return foundEvent ? foundEvent.name : "Unknown Event";
  };




  // console.log(ticketName);

  // data sample end 

  // handle edit for items 

  // const handleEditItem = (item) => {
  //   console.log("Check record to edit", item);
  //   // console.log(order.items[0].ticket.ticketId);
  //   form.setFieldsValue(item);

  //   // update items 

  //   setIsModalVisible(true);
  // };


  return (
    <Modal
      title={form.getFieldValue('orderId') ? "Edit order" : "Add order"}
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      width={800}
      styles={{
        body: {
          maxHeight: "50vh",
          overflowY: "auto",
          padding: "16px",
        }
      }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical" disabled={isSubmitting}>
        <div className="grid grid-cols-2 gap-2 ">

          <Form.Item name="receiverEmail" label="Receiver email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="receiverPhone" label="Receiver phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="receiverName" label="Receiver name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true }]}>
            <InputNumber

              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* <Form.Item label="Status" className="flex-1" name="status" >
            <Select>
              <Select.Option value="Pending">PENDING</Select.Option>
              <Select.Option value="SENDING">SENDING</Select.Option>
            </Select>
          </Form.Item> */}
        </div>


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
                  <p><strong>Ticket:</strong> {getTicketName(item.ticketId)}</p>
                  <p><strong>Price:</strong> ${item.subTotal}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  {item.description && <p><strong>Description:</strong> {item.description}</p>}
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
                  <Select value={eventId}>
                    {
                      ticketName.map(ticket => (
                        <Select.Option key={ticket.id} value={ticket.id}>{ticket.type}</Select.Option>
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
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="subTotal"
                  label="Subtotal"
                  className="flex-1"
                >
                  <Input type="number" onChange={(value) => setTotalPrice(value)} />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>


      </Form>

      {/* ticket data part  */}




    </Modal>
  );
};

export default OrderModal;