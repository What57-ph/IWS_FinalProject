import {
  Modal,
  Form,
  Input,
  DatePicker,
  Cascader,
  Select,
  message,
  Upload,
} from "antd";
import dayjs from "dayjs";
import HandleLocation from "../event/handleLocation";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { uploadSingleFile } from "../../../config/api";

const UserModal = ({ form, open, handleSubmit, handleCancel, initialValues, squareLogoFile, setSquareLogoFile }) => {
  const requestType = form.getFieldValue("id") ? "put" : "post";
  // const [squareLogoFile, setSquareLogoFile] = useState([]);
  //handle upload file
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" || file.type === "image/webp";;
    if (!isJpgOrPng) {
      // message.error("You can only upload JPG/PNG file!");
      toast.error("The file must have extension of webp, jpeg, png or jpg");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error("Image must smaller than 2MB!");
      toast.error("The size of file must smaller than 2MB");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleUploadInfoFile = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadSingleFile(file, "avatar");
      if (res && res.fileName) {
        setSquareLogoFile([
          {
            ...file,
            uid: file.uid,
            name: res.fileName,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${res.fileName
              }`, // tao moi local url de truyen sang blob data => tao duong dan anh bang localhost fe
          },
        ]);
        console.log("Img info file:", squareLogoFile);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      // onError(error);
      console.log("error", error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const renderUploadButton = (text, ratio, isSquare = true) => (
    <div
      className={`w-full
        h-full flex flex-col
    items-center justify-center rounded-lg
    `}
    >
      <UploadOutlined className="text-2xl mb-2 text-gray-500" />
      <span className="block font-medium">{text}</span>
      <span className="text-xs text-gray-500">({ratio} ratio)</span>
    </div>
  );

  const renderPreview = (fileList, file) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      const previewUrl =
        file.url ||
        file.thumbUrl ||
        (file.originFileObj ? URL.createObjectURL(file.originFileObj) : null);

      if (!previewUrl) {
        return <div className="text-red-500">Preview not available</div>;
      }

      return (
        <div className="relative w-full h-full">
          <img
            src={previewUrl}
            alt="preview"
            className="w-full h-[95%] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
        </div>
      );
    } else if (file) {
      return (
        <div className="relative w-full h-full">
          <img
            src={file}
            alt="preview"
            className="w-full h-[95%] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
        </div>
      )
    }
    return null;
  };
  return (
    <Modal
      title={form.getFieldValue("id") ? "Edit user" : "Add user"}
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      width={800}
      styles={{
        body: {
          maxHeight: "50vh",
          overflowY: "auto",
          padding: "16px",
        },
      }}
    >
      <Form
        form={form}
        className="grid grid-cols-2 gap-5"
        onFinish={(values) => {
          handleSubmit(values, requestType);
          console.log(values);
        }}
        layout="vertical"
      >
        <div className="col-span-1">
          <Form.Item
            name="email"
            label="Email"
            className=""
            rules={[
              { required: true },
              // { type: "email", message: "Email is invalid" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true },
              // { type: "name", message: "User name is invalid" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: false },
              // {
              //   type: "password",
              //   message: "Password is invalid",
              // },
            ]}
          >
            <Input disabled={requestType === "put" ? true : false} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true },
              // { type: "phone", message: "Phone number is invalid" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item name="avatar" label="Avatar">
          <Upload
            listType="picture-card"
            fileList={squareLogoFile}
            beforeUpload={beforeUpload}
            onChange={({ fileList }) => setSquareLogoFile(fileList.slice(-1))} // only 1 file
            accept="image/*"
            maxCount={1}
            showUploadList={false}
            className="custom-upload-event-info "
            customRequest={handleUploadInfoFile}
            defaultFileList={
              typeof squareLogoFile === "string"
                ? [
                  {
                    uid: uuidv4(),
                    name: squareLogoFile,
                    status: "done",
                    url: `${import.meta.env.VITE_BACKEND_URL
                      }/storage/info/${squareLogoFile}`,
                  },
                ]
                : []
            }
          >
            {squareLogoFile.length > 0 || (requestType === "put" && initialValues.imgEventInfo)
              ? renderPreview(squareLogoFile, initialValues.imgEventInfo)
              : renderUploadButton("Avatar", "1:1")}
          </Upload>
        </Form.Item>


        <div className="flex flex-row w-full gap-5 col-span-2">
          <Form.Item label="Role" className="flex-1" name="role">
            <Select disabled>
              <Select.Option value="2">USER</Select.Option>
              <Select.Option value="1">ADMIN</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date of birth"
            className="flex-1 w-full"
            name="dob"
            getValueProps={(value) => ({
              value: value ? dayjs(value) : null,
            })}
            getValueFromEvent={(date) =>
              date ? date.format("DD/MM/YYYY") : ""
            }
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </div>

        <HandleLocation form={form} />
      </Form>
    </Modal>
  );
};

export default UserModal;
