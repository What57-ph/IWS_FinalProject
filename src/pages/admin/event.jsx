import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Grid, Image, Input, message, Modal, Popconfirm, Select, Space, Table, Upload } from "antd";
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


  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

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
      dataIndex: 'location',
      key: 'location',
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


  const mobileRowRender = (record) => (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-blue-600 text-white">
      <div className="grid grid-cols-1 gap-3"> {/* Đổi thành 1 cột */}
        <div>
          <div className="text-sm font-medium break-words whitespace-normal">Name event: </div>
          <div className="text-base break-all">{record.name}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Address: </div>
          <div className="text-base">{record.location}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Organizer: </div>
          <div className="text-base">{record.organizer}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Day start: </div>
          <div className="text-base">{record.date}</div>
        </div>
        <div className="flex justify-end mt-2"> {/* Bỏ col-span-2 */}
          <Space>
            <Button icon={<EditOutlined />} size="small" />
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Space>
        </div>
      </div>
    </div>
  );


  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of events</h2>
        <Button icon={<PlusOutlined />} type="primary"
          onClick={() => { form.resetFields(); setOpenModal(true) }}>
          Add
        </Button>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {events.map((user) => (
            <div key={user.id}>{mobileRowRender(user)}</div>
          ))}
        </div>
      ) : (

        <Table dataSource={events} columns={columns} rowKey="id"
          bordered scroll={{ x: true }} size="middle" />

      )
      }
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
