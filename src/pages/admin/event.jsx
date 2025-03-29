import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import EventModal from "../../components/admin/event/EventModal";
import EventDetailModal from "../../components/admin/event/EventDetailModal";
import sampleData from "../../data/sampleData";

const EventPage = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);


  const events = sampleData.events;
  console.log(events);
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
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleGetInfo(record)}
            type="primary"
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

  // handle for detail
  const handleGetInfo = (order) => {
    console.log(order);

    form.setFieldsValue(order);
    setOpenDetail(true);
  };
  const handleClose = () => {
    setOpenDetail(false);
  }

  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of events</h2>
        <Button icon={<PlusOutlined />} type="primary"
          onClick={() => { form.resetFields(); setOpenModal(true) }}>
          Add
        </Button>
      </div>

      <Table dataSource={events} columns={columns} rowKey="id"
        bordered scroll={{ x: true }} size="middle" />

      <EventModal form={form} openModal={openModal} setOpenModal={setOpenModal} handleSubmit={handleSubmit} initialValues={form.getFieldValue()} />

      <EventDetailModal
        open={openDetail}
        handleCancel={handleClose}
        form={form}
      />
    </div>
  )
}
export default EventPage
