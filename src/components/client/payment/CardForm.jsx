import { Button, Checkbox, Form, Input, Select } from "antd";

const CardForm = ({ openButton2 }) => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      style={{ maxWidth: 600, padding: '10px' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className={`overflow-hidden transition-all duration-500 ease-in-out ${openButton2 ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} mb-7`}
    >
      <Form.Item
        label="Card number"
        name="cardnumber"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="Expiry Date"
          name="expirydate"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CVN"
          name="cnv"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="First name"
          name="firstname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item
        label="Email address"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phone"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="payment" label="Select">
        <Select disabled defaultValue="payment" value={"payment"} >
          <Select.Option value="payment">Pay all</Select.Option>
        </Select>
      </Form.Item>

      <div className="flex justify-center">
        <Form.Item label={null} >
          <Button type="primary" htmlType="submit" className="rounded-lg w-[10vw] h-[5vh] min-w-28 min-h-10 bg-gray-500/70 text-[18px]">
            Pay now
          </Button>
        </Form.Item>
      </div>


    </Form>
  )
}
export default CardForm