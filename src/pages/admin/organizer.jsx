import {
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, message, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";

import { Grid } from "antd";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import OrganizerModal from "../../components/admin/organizer/OrganizerModal";
import OrganizerDetail from "../../components/admin/organizer/OrganizerDetail";
import { createNewOrganizer, deleteOrganizer, fetchOrganizerList, updateOrganizer } from "../../config/api";

const OrganizerPage = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [requestType, setRequestType] = useState("post");
    const [organizers, setOrganizers] = useState([]);
    const [isUpdatedOrganizer, setIsUpdatedOrganizer] = useState(false);
    // console.log(users);

    const antStep = document.querySelectorAll(".ant-popconfirm-inner-content");
    antStep.forEach((item, index) => {
        item.className += " p-2";
    });
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    useEffect(() => {

        const getOrganizerListData = async () => {
            try {
                const data = await fetchOrganizerList();
                setOrganizers(data);
            } catch (error) {
                console.error("Error fetching organizers:", error);
                toast.error(error);
            }
        };
        getOrganizerListData();
    }, [isUpdatedOrganizer]);
    // Columns cho bảng
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: 70,
            responsive: ["md"],
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 300,
            responsive: ["md"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            responsive: ["md"],
            width: 300,
            render: (email) => <span className="">{email ? email : 'No data'}</span>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            responsive: ["md"],
            render: (text) => (
                <div className="truncate overflow-hidden whitespace-nowrap max-w-[50px] md:max-w-[120px] lg:max-w-[300px]">
                    {text ? text : 'No data'}
                </div>
            ),
            ellipsis: true,
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        size="small"
                    />
                    <Popconfirm
                        title="Do you sure want to delete ?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
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
    const handleEdit = (organizer) => {
        console.log(organizer);
        setRequestType("put");
        form.setFieldsValue(organizer);
        setOpenModal(true);
    };
    const handleDelete = async (id) => {
        try {
            const res = await deleteOrganizer(id);
            setOrganizers((prev) => prev.filter((item) => item.id != id));
            toast.success("delete successfully.")
        } catch (error) {
            // console.log("organization error:", error)
            toast.error("Cannot delete this organizer " + error?.message);
        }

    };
    const handleSubmit = async (values) => {
        try {
            let response;
            if (requestType === "post") {
                response = await createNewOrganizer(values);
                setOrganizers((prev) => [...prev, response]);
                toast.success("Create organizer successfully");
            } else if (requestType === "put") {

                response = await updateOrganizer(values);
                setOrganizers((prev) =>
                    prev.map((u) => (u.id === values.id ? response : u))
                );
                toast.success("Update organizer successfully");
                setIsUpdatedOrganizer(!isUpdatedOrganizer);
            }

            message.success("Operation successful!");
            setOpenModal(false);
        } catch (error) {
            message.error("Operation failed!");
            if (error?.status === 500) {
                toast.error(error.message);
                return;
            }
            error?.message.map((m) => {
                toast.error(m);
            })
            console.log("submit organizer error:", error)

        }
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    // get detail order
    const handleGetInfo = (order) => {
        // console.log(order);

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
                {/* Đổi thành 1 cột */}
                <div>
                    <div className="text-sm font-medium break-words whitespace-normal">
                        Name
                    </div>
                    <div className="text-base break-all">{record.name}</div>
                </div>
                <div>
                    <div className="text-sm font-medium ">Email</div>
                    <div className="text-base">{record.email}</div>
                </div>
                <div>
                    <div className="text-sm font-medium ">Phone</div>
                    <div className="text-base">{record.phone}</div>
                </div>
                <div className="flex justify-end mt-2">
                    {" "}
                    {/* Bỏ col-span-2 */}
                    <Space>
                        <Button icon={<EditOutlined />} size="small" />

                        <Popconfirm
                            title="Do you sure want to delete ?"
                            onConfirm={() => handleDelete(record.id)}
                            okText="Có"
                            placement="left"
                            cancelText="Không"
                        >
                            <Button
                                icon={<DeleteOutlined />}
                                danger
                                size="small"
                            />
                        </Popconfirm>
                    </Space>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 max-w-full overflow-auto">
            <div className="flex justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-[25px] font-bold">List of organizers</h2>
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
                    {organizers.map((o) => (
                        <div key={o.id}>{mobileRowRender(o)}</div>
                    ))}
                </div>
            ) : (
                <Table
                    dataSource={organizers}
                    columns={columns}
                    rowKey="id"
                    bordered
                    scroll={{ x: true }}
                    size="middle"
                    pagination={{ pageSize: 7 }}
                />
            )}

            <OrganizerModal
                open={openModal}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                form={form}
            />

            <OrganizerDetail open={openDetail} handleCancel={handleClose} form={form} />
        </div>
    );
};
export default OrganizerPage;
