import { Button, Form, Radio, Space, Switch } from "antd"
import CustomCheckbox from "./CustomCheckbox"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Filter = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    form.setFieldsValue(currentParams);
  }, []);

  // const handleSubmit = (values) => {
  //   // Tạo URLSearchParams object từ form values
  //   const params = new URLSearchParams();

  //   // Chỉ thêm những giá trị đã được chọn
  //   Object.entries(values).forEach(([key, value]) => {
  //     if (value) {
  //       params.append(key, value);
  //     }
  //   });

  //   // Navigate với params mới
  //   navigate({
  //     search: params.toString()
  //   });
  // };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="p-3 min-w-[300px] w-[450px] flex flex-col gap-3">

      <div className="border-b border-dashed border-slate-400 flex flex-col gap-2">
        <label className="font-semibold">Location</label>
        <Form.Item name="location">
          <Radio.Group >
            <Space direction="vertical" className="grid grid-cols-2 gap-x-4">
              <Radio value="all"> Across the country </Radio>
              <Radio value="Hanoi"> Ha Noi </Radio>
              <Radio value="HoChiMinh"> Ho Chi Minh city </Radio>
              <Radio value="Dalat"> Da Lat </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="border-b border-dashed border-slate-400 flex flex-col pb-2">
        <label className="font-semibold mb-1">Price</label>
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm">Free</span>
          <Form.Item name="price" valuePropName="checked" className="mb-0" >
            <Switch />
          </Form.Item>
        </div>
      </div>

      <div className="border-b border-dashed border-slate-400 flex flex-col gap-2">
        <label className="font-semibold">Category</label>
        <div className="flex flex-row gap-1">
          <Form.Item name="live" valuePropName="checked" className=" mt-2">
            <CustomCheckbox>Live music</CustomCheckbox>
          </Form.Item>

          <Form.Item name="stage" valuePropName="checked" className=" mt-2">
            <CustomCheckbox>Stage&Art</CustomCheckbox>
          </Form.Item>

          <Form.Item name="sport" valuePropName="checked" className=" mt-2">
            <CustomCheckbox>Sport</CustomCheckbox>
          </Form.Item>

          <Form.Item name="all" valuePropName="checked" className=" mt-2">
            <CustomCheckbox>All</CustomCheckbox>
          </Form.Item>

        </div>
      </div>

      <div className="border-slate-400 flex flex-col gap-2">
        <label className="font-semibold">Date</label>
        <div className="flex flex-row gap-1">
          <Form.Item name="allDay" valuePropName="checked" className="mb-2 mt-2">
            <CustomCheckbox>All</CustomCheckbox>
          </Form.Item>

          <Form.Item name="today" valuePropName="checked" className="mb-2 mt-2">
            <CustomCheckbox>Today</CustomCheckbox>
          </Form.Item>

          <Form.Item name="tomorrow" valuePropName="checked" className="mb-2 mt-2">
            <CustomCheckbox>Tomorrow</CustomCheckbox>
          </Form.Item>

          <Form.Item name="month" valuePropName="checked" className="mb-2 mt-2">
            <CustomCheckbox>This month</CustomCheckbox>
          </Form.Item>

        </div>
      </div>

      <div className="flex flex-row justify-center gap-3 w-full px-5">
        <Form.Item label={null} className="flex-1">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-5 bg-blue-700 hover:bg-blue-600 text-[20px]"
          >
            Reset form
          </Button>
        </Form.Item>
        <Form.Item label={null} className="flex-1">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-5 bg-blue-700 hover:bg-blue-600 text-[20px]"
          >
            Submit
          </Button>
        </Form.Item>
      </div>

    </Form>
  )
}
export default Filter