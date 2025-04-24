import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Grid,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import EventModal from "../../components/admin/event/EventModal";
import EventDetailModal from "../../components/admin/event/EventDetailModal";
import sampleData from "../../data/sampleData";
import {
  createNewEvent,
  deleteEvent,
  fetchEventList,
  updateEvent,
} from "../../config/api";
import { toast } from "react-toastify";

const EventPage = () => {
  // sampleData.events
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [events, setEvents] = useState([]);
  const [isUpdatedEvent, setIsUpdatedEvent] = useState(false);
  const [requestType, setRequestType] = useState("post");
  useEffect(() => {
    const getEventListData = async () => {
      const data = await fetchEventList();
      setEvents(data.data.result);
    };
    getEventListData();
  }, [isUpdatedEvent]);
  console.log(events);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
      width: 70,
      responsive: ["md"],
    },
    {
      title: "Name Event",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
    },
    {
      title: "Address",
      dataIndex: "province",
      key: "province",
      responsive: ["md"],
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
      responsive: ["md"],
      render: (organizer) => organizer?.name || "N/A",
    },
    {
      title: 'Day start',
      dataIndex: 'startDate',
      render: (text) => {
        const currentDate = dayjs();
        const eventDate = dayjs(text);
        const daysLeft = eventDate.diff(currentDate, 'day');
        // console.log({ daysLeft });

        const textColor = daysLeft > 5
          ? '#FF7F50'
          : daysLeft >= 0
            ? 'green'
            : 'red';

        return (
          <Tag color={textColor} >
            {eventDate.format('DD/MM/YYYY')}
          </Tag>
        );
      },
      responsive: ['lg'],
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              handleEdit(record);
              setRequestType("put");
            }}
            size="small"
          />
          <Popconfirm
            title="Do you sure want to delete ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            placement="left"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"

            />
          </Popconfirm>

          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleGetInfo(record)}
            type="primary"
            size="small"
          />
        </Space>
      ),
      fixed: "right",
      width: 100,
    },
  ];

  // handle function
  const handleEdit = (company) => {
    form.setFieldsValue(company);
    setOpenModal(true);
  };
  // handle delete
  const handleDelete = async (id) => {
    const res = await deleteEvent(id);
    setEvents((prev) => prev.filter((item) => item.id != id));
  };
  const handleSubmit = async (values, eventId) => {
    try {
      // Transform data for backend
      const backendData = {
        ...values,
        organizerName: values.organizerName,
        organizerInfo: values.organizerInfo,
      };
      let response;
      if (requestType === "post") {
        response = await createNewEvent(backendData);
        setEvents((prev) => [...prev, response]);
        toast.success("Create event successfully");
      } else if (requestType === "put") {
        response = await updateEvent(backendData, eventId);
        setEvents((prev) => prev.map((u) => (u.id === eventId ? response : u)));
        toast.success("Update event successfully");
        setIsUpdatedEvent(!isUpdatedEvent);
      }

      message.success("Operation successful!");
      setOpenModal(false);
    } catch (error) {
      message.error("Operation failed!");
      if (error?.status === 500) {
        toast.error(error.message);
        return;
      }
      toast.error(error.message);
    }
  };

  // handle for detail
  const handleGetInfo = (order) => {
    console.log(order);

    form.setFieldsValue(order);
    setOpenDetail(true);
  };
  const handleClose = () => {
    setOpenDetail(false);
  };

  const mobileRowRender = (record) => (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-blue-600 text-white">
      <div className="grid grid-cols-1 gap-3">
        {" "}
        {/* Đổi thành 1 cột */ console.log("record from event:", record)}
        <div>
          <div className="text-sm font-medium break-words whitespace-normal">
            Name event:{" "}
          </div>
          <div className="text-base break-all">{record.name}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Address: </div>
          <div className="text-base">{record.province}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Organizer: </div>
          <div className="text-base">{record?.organizer?.name}</div>
        </div>
        <div>
          <div className="text-sm font-medium ">Day start: </div>
          <div className="text-base">{record.startDate}</div>
        </div>
        <div className="flex justify-end mt-2">
          {" "}
          {/* Bỏ col-span-2 */}
          <Space>
            <Button icon={<EditOutlined />} size="small" />
            <Popconfirm
              title="Do you sure want to delete ?"
              onConfirm={() => handleDelete(record.orderId)}
              okText="Có"
              cancelText="Không"
              placement="left"
            >
              <Button icon={<DeleteOutlined />} danger size="small" />
            </Popconfirm>

          </Space>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-full overflow-auto">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[25px] font-bold">List of events</h2>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            form.resetFields();
            setOpenModal(true);
            setRequestType("post");
          }}
        >
          Add
        </Button>
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {events &&
            events.map((event) => (
              <div key={event.id}>{mobileRowRender(event)}</div>
            ))}
        </div>
      ) : (
        <Table
          dataSource={events}
          columns={columns}
          rowKey="id"
          bordered
          scroll={{ x: true }}
          size="middle"
          pagination={{ pageSize: 7 }}
        />
      )}
      <EventModal
        form={form}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleSubmit}
        initialValues={form.getFieldValue()}
      />

      <EventDetailModal
        open={openDetail}
        handleCancel={handleClose}
        form={form}
      />
    </div>
  );
};
export default EventPage;
