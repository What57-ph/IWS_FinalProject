import { Button, Form, Radio, Space, Switch } from "antd"
import CustomCheckbox from "./CustomCheckbox"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Filter = ({ filterParam, setFilterParam, setOpen }) => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    form.setFieldsValue(currentParams);
  }, []);


  const handleReset = () => {
    form.resetFields();
  };

  const calculateDateRange = (dateType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let dateRange = {
      startDate: '',
      endDate: ''
    };

    // console.log(today.toISOString().split('T')[0]);


    if (dateType === 'today') {
      dateRange.startDate = today.toISOString().split('T')[0];
      dateRange.endDate = today.toISOString().split('T')[0];
    } else if (dateType === 'tomorrow') {
      let tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateRange.startDate = tomorrow.toISOString().split('T')[0];
      dateRange.endDate = tomorrow.toISOString().split('T')[0];
    } else if (dateType === 'month') {
      dateRange.startDate = today.toISOString().split('T')[0];
      dateRange.endDate = lastDayOfMonth.toISOString().split('T')[0];
    }

    return dateRange;
  };


  const getSelectedCategories = (values) => {
    const selectedCategory = [];
    if (values.live) selectedCategory.push('Live Music');
    if (values.stage) selectedCategory.push('Stage');
    if (values.sport) selectedCategory.push('Sport');
    if (values.all) selectedCategory.push('All');
    return selectedCategory;
  };


  const onFinish = (values) => {

    const selectedCategory = getSelectedCategories(values);
    const dateRange = calculateDateRange(values.date);

    const filterParts = [];

    if (values.location) {
      filterParts.push(`location ~ '${values.location}'`);
    }

    if (values.price) {
      filterParts.push(`tickets.price : '0'`);
    }

    if (selectedCategory.length > 0) {
      const categoryFilters = selectedCategory.map(cat => `category.name ~ '${cat}'`);
      if (categoryFilters.length > 1) {
        filterParts.push(`(${categoryFilters.join(' or ')})`);
      } else {
        filterParts.push(categoryFilters[0]);
      }
    }

    if (dateRange.startDate && dateRange.endDate) {
      if (values.date === 'month') {
        filterParts.push(`(startDate <: '${dateRange.endDate}' and endDate >: '${dateRange.startDate}')`);
      } else {
        filterParts.push(`(startDate <: '${dateRange.startDate}' and endDate >: '${dateRange.endDate}')`);
      }

      console.log(dateRange.startDate);
      console.log(dateRange.endDate);

    }

    const filterQuery = filterParts.length > 0 ? filterParts.join(' or ') : '';

    const params = new URLSearchParams({
      filter: filterQuery
    });

    setFilterParam(`?${params.toString()}`);
    setOpen(false);
    navigate({
      search: params.toString()
    });

    // console.log('Form values:', formattedData);
    console.log('url values:', params.toString());
  };




  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="p-3 min-w-[300px] w-full md:w-[450px] flex flex-col gap-3 text-base md:text-[20px]">

      <div className="border-b border-dashed border-slate-400 flex flex-col gap-2 w-full">
        <label className="font-semibold">Location</label>
        <Form.Item name="location">
          <Radio.Group>
            <Space direction="vertical" className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-4">
              <Radio value=""> Across the country </Radio>
              <Radio value="Hanoi"> Ha Noi </Radio>
              <Radio value="HoChiMinh"> Ho Chi Minh city </Radio>
              <Radio value="Dalat"> Da Lat </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="border-b border-dashed border-slate-400 flex flex-col pb-2 w-full">
        <label className="font-semibold mb-1">Price</label>
        <div className="flex flex-row justify-between items-center">
          <span className="text-xs md:text-sm">Free</span>
          <Form.Item name="price" valuePropName="checked" className="mb-0">
            <Switch />
          </Form.Item>
        </div>
      </div>

      <div className="border-b border-dashed border-slate-400 flex flex-col gap-2 w-full">
        <label className="font-semibold">Category</label>
        <div className="flex flex-row flex-wrap gap-2">
          <Form.Item name="live" valuePropName="checked" className="mt-2">
            <CustomCheckbox>Live music</CustomCheckbox>
          </Form.Item>

          <Form.Item name="stage" valuePropName="checked" className="mt-2">
            <CustomCheckbox>Stage&Art</CustomCheckbox>
          </Form.Item>

          <Form.Item name="sport" valuePropName="checked" className="mt-2">
            <CustomCheckbox>Sport</CustomCheckbox>
          </Form.Item>

          <Form.Item name="" valuePropName="checked" className="mt-2">
            <CustomCheckbox>All</CustomCheckbox>
          </Form.Item>
        </div>
      </div>

      <div className="border-slate-400 flex flex-col gap-2 w-full">
        <label className="font-semibold">Date</label>
        <Form.Item name="date" className="w-full">
          <Radio.Group className="w-full">
            <Space className="w-full flex flex-wrap gap-2">
              <Radio.Button value="all" className="flex-1 text-center">
                All days
              </Radio.Button>
              <Radio.Button value="today" className="flex-1 text-center">
                Today
              </Radio.Button>
              <Radio.Button value="tomorrow" className="flex-1 text-center">
                Tomorrow
              </Radio.Button>
              <Radio.Button value="month" className="flex-1 text-center">
                This month
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>
      </div>

      <div className="flex flex-row justify-center gap-2 w-full px-2 md:px-5">
        <Form.Item label={null} className="flex-1">
          <Button onClick={handleReset}
            type="primary"
            htmlType="submit"
            className="w-full py-2 md:py-5 bg-blue-700 hover:bg-blue-600 text-xs md:text-[20px]"
          >
            Reset form
          </Button>
        </Form.Item>
        <Form.Item label={null} className="flex-1">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-2 md:py-5 bg-blue-700 hover:bg-blue-600 text-xs md:text-[20px]"
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
export default Filter