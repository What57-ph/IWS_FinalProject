import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import EventModal from "../../components/admin/event/EventModal";

const EventPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Event A',
      address: 'Hà Nội, Việt Nam',
      logo: 'https://picsum.photos/200/100?random=1',
      date: '2025-01-05',
      organizer: "Ntpmm",
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02'
    },
    {
      id: 2,
      name: 'Event B',
      address: 'TP.HCM, Việt Nam',
      logo: 'https://picsum.photos/200/100?random=2',
      date: '2025-01-05',
      organizer: "Những thành phố mơ màng",
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
      responsive: ['md']
    },
    {
      title: 'Name Event',
      dataIndex: 'name',
      key: 'name',
      responsive: ['md']
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['md']
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      key: 'organizer',
      responsive: ['md']
    },
    {
      title: 'Day start',
      dataIndex: 'date',
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

      <EventModal form={form} openModal={openModal} setOpenModal={setOpenModal} handleSubmit={handleSubmit} initialValues={form.getFieldValue()} />
    </div>
  )
}
export default EventPage