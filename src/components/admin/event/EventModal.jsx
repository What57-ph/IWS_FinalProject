import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from 'react';
import HandleLocation from "./handleLocation";

const EventModal = ({ openModal, setOpenModal, handleSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [squareLogoFile, setSquareLogoFile] = useState([]);
  const [bannerFile, setBannerFile] = useState([]);
  const [organizerLogoFile, setOrganizerLogoFile] = useState([]);

  useEffect(() => {
    if (openModal) {
      form.resetFields();
      setSquareLogoFile([]);
      setBannerFile([]);
      setOrganizerLogoFile([]);

      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [openModal, initialValues]);

  const onFinish = (values) => {
    const formData = {
      ...values,
      squareLogo: squareLogoFile[0]?.originFileObj,
      banner: bannerFile[0]?.originFileObj,
      organizerLogo: organizerLogoFile[0]?.originFileObj
    };
    handleSubmit(formData);
    setOpenModal(false);
  };

  return (
    <Modal
      title={form.getFieldValue('id') ? "Edit event" : "Add event"}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      onOk={() => form.submit()}
      width={1000}
      styles={{
        body: {
          maxHeight: "60vh",
          overflowY: "auto",
          padding: "16px"
        }
      }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="font-bold">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Event name"
          name="eventName"
          rules={[{ required: true, message: "Please input event name" }]}
        >
          <Input placeholder="Example: Event ABC" />
        </Form.Item>

        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            className="w-full md:w-1/2"
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please choose category" }]}
          >
            <Select>
              <Select.Option value="music">Nhạc kịch</Select.Option>
              <Select.Option value="sport">Thể thao</Select.Option>
              <Select.Option value="conference">Họp báo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="w-full md:w-1/2"
            label="Event date"
            name="eventDate"
          >
            <RangePicker showTime className="w-full" />
          </Form.Item>
        </div>

        <HandleLocation form={form} />

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Upload Event Media</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item
              name="squareLogo"
              className="flex-1"
              rules={[{ required: true, message: "Please upload square logo" }]}
            >
              <Upload
                listType="picture"
                fileList={squareLogoFile}
                beforeUpload={() => false}
                onChange={({ fileList }) => setSquareLogoFile(fileList)}
                accept="image/*"
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  className="w-full aspect-square max-h-[300px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100"
                >
                  <span className="block font-medium">Square Logo</span>
                  <span className="text-xs text-gray-500">(1:1 ratio)</span>
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="banner"
              className="flex-2"
              rules={[{ required: true, message: "Please upload banner" }]}
            >
              <Upload
                listType="picture"
                fileList={bannerFile}
                beforeUpload={() => false}
                onChange={({ fileList }) => setBannerFile(fileList)}
                accept="image/*"
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  className="w-full aspect-video max-h-[200px] md:max-h-[300px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100"
                >
                  <span className="block font-medium">Event Banner</span>
                  <span className="text-xs text-gray-500">(16:9 ratio)</span>
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Organizer Information</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item
              name="organizerLogo"
              className="w-full md:w-1/4"
              rules={[{ required: true, message: "Please upload organizer logo" }]}
            >
              <Upload
                listType="picture"
                fileList={organizerLogoFile}
                beforeUpload={() => false}
                onChange={({ fileList }) => setOrganizerLogoFile(fileList)}
                accept="image/*"
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  className="w-full aspect-square max-h-[200px] flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                >
                  <span className="text-center">Organizer Logo</span>
                </Button>
              </Upload>
            </Form.Item>

            <div className="flex flex-col gap-4 w-full md:w-3/4">
              <Form.Item
                label="Organizer Name"
                name="organizerName"
                rules={[{ required: true, message: "Please input organizer name" }]}
              >
                <Input placeholder="Example: ABC Company" />
              </Form.Item>

              <Form.Item
                label="Organizer Information"
                name="organizerInfo"
                rules={[{ required: true, message: "Please input organizer information" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default EventModal;