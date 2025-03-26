import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const EventPage = () => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [openModal, setOpenModal] = useState(false);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Công ty A',
      address: 'Hà Nội, Việt Nam',
      logo: 'https://picsum.photos/200/100?random=1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02'
    },
    {
      id: 2,
      name: 'Công ty B',
      address: 'TP.HCM, Việt Nam',
      logo: 'https://picsum.photos/200/100?random=2',
      createdAt: '2023-02-01',
      updatedAt: '2023-02-02'
    }
  ]);

  // Columns cho bảng
  const columns = [
    {
      title: 'STT',
      render: (text, record, index) => index + 1,
      width: 70,
      responsive: ['md'] // Chỉ hiển thị trên màn hình medium trở lên
    },
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs'] // Luôn hiển thị dù màn hình nhỏ
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      responsive: ['md']
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
      responsive: ['lg']
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
          />
        </Space>
      ),
      fixed: 'right',
      width: 100
    }
  ];

  // handle function 
  const handleEdit = (company) => {
    form.setFieldsValue(company);
    setOpenModal(true);
  };

  const handleSubmit = (values) => {
    message.success('Lưu thành công!');
    setOpenModal(false);
  };

  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of events</h2>
        <Button icon={<PlusOutlined />} type="primary"
          onClick={() => { form.resetFields(); setOpenModal(true) }}>
          Add
        </Button>
      </div>

      <Table dataSource={companies} columns={columns} rowKey="id"
        bordered scroll={{ x: true }} size="middle" />

      <Modal title={form.getFieldValue('id') ? "Edit event" : "Add event"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        width={800}
        styles={{
          body: {
            maxHeight: "60vh",
            overflowY: "auto",
            paddingRight: "8px"
          }
        }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical" className="max-h-[] overflow-y-auto">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item label="Event name" name="name" rules={[{ required: true, message: "Please in put name" }]}>
            <Input placeholder="Example: Event abc" />
          </Form.Item>

          <div className="grid grid-cols-2">
            <Form.Item className="w-[80%]" label="Category" rules={[{ required: true, message: "Please choose event category" }]}>
              <Select>
                <Select.Option value="demo">Nhạc kịch</Select.Option>
                <Select.Option value="demo">Thể thao</Select.Option>
                <Select.Option value="demo">Họp báo </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Event date">
              <RangePicker />
            </Form.Item>
          </div>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <div className="flex flex-row justify-start gap-4">
            <Form.Item label="Event information" name="logo">
              <Upload listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </div>

        </Form>
      </Modal>
    </div>
  )
}
export default EventPage