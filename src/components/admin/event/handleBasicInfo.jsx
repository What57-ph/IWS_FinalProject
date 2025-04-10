import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import HandleLocation from "./handleLocation";
import { UploadOutlined } from "@ant-design/icons";
import { uploadSingleFile } from "../../../config/api";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
const HandleBasicInfo = ({
  form,
  squareLogoFile,
  setSquareLogoFile,
  bannerFile,
  setBannerFile,
  organizerLogoFile,
  setOrganizerLogoFile,
}) => {
  const { RangePicker } = DatePicker;

  const onChange = (dates) => {
    if (dates) {
      const formattedStartDate = dates[0].format("YYYY-MM-DDTHH:mm:ss");
      const formattedEndDate = dates[1].format("YYYY-MM-DDTHH:mm:ss");
      form.setFieldsValue({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } else {
      form.setFieldsValue({
        startDate: null,
        endDate: null,
      });
    }
  };
  //handle upload file
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      // message.error("You can only upload JPG/PNG file!");
      toast.error("The file must have extension of jpeg, png or jpg");
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
      const res = await uploadSingleFile(file, "info");
      if (res && res.fileName) {
        onSuccess({
          name: res.fileName,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/storage/info/${
            res.fileName
          }`,
        });
        setSquareLogoFile([res.fileName]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      onError(error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const handleUploadBannerFile = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadSingleFile(file, "banner");
      if (res && res.fileName) {
        onSuccess({
          name: res.fileName,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/storage/banner/${
            res.fileName
          }`,
        });
        setBannerFile([res.fileName]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      onError(error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const handleUploadLogoFile = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadSingleFile(file, "logo");
      if (res && res.fileName) {
        onSuccess({
          name: res.fileName,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/storage/logo/${
            res.fileName
          }`,
        });
        setOrganizerLogoFile([res.fileName]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      onError(error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const renderUploadButton = (text, ratio, isSquare = true) => (
    <div
      className={`w-full ${
        isSquare ? "aspect-square" : "aspect-video"
      } flex flex-col 
    items-center justify-center bg-gray-50 hover:bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg
    
    `}
    >
      <UploadOutlined className="text-2xl mb-2 text-gray-500" />
      <span className="block font-medium">{text}</span>
      <span className="text-xs text-gray-500">({ratio} ratio)</span>
    </div>
  );

  const renderPreview = (fileList) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      return (
        <div className="relative w-full h-full">
          <img
            src={
              file.thumbUrl ||
              (file.originFileObj && URL.createObjectURL(file.originFileObj))
            }
            alt="preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* <Form form={form} onFinish={onFinish} layout="vertical" className="font-bold"> */}
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>

      <Form.Item label="Event name" name="name">
        <Input placeholder="Example: Event ABC" />
      </Form.Item>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item className="w-full md:w-1/2" label="Category" name="category">
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
          <RangePicker
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onChange}
          />
        </Form.Item>
      </div>

      <HandleLocation form={form} />

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Upload Event Media</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item name="squareLogo" className="flex-1">
            <Upload
              listType="picture-card"
              fileList={squareLogoFile}
              beforeUpload={beforeUpload}
              onChange={({ fileList }) => setSquareLogoFile(fileList.slice(-1))} // only 1 file
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              className="custom-upload-event-info"
              customRequest={handleUploadInfoFile}
              defaultFileList={
                squareLogoFile && typeof squareLogoFile === "string"
                  ? [
                      {
                        uid: uuidv4(),
                        name: squareLogoFile,
                        status: "done",
                        url: `${
                          import.meta.env.VITE_BACKEND_URL
                        }/storage/info/${squareLogoFile}`,
                      },
                    ]
                  : []
              }
            >
              {squareLogoFile.length > 0
                ? renderPreview(squareLogoFile)
                : renderUploadButton("Event info", "1:1")}
            </Upload>
          </Form.Item>

          <Form.Item name="banner" className="flex-1">
            <Upload
              listType="picture-card"
              fileList={bannerFile}
              beforeUpload={beforeUpload}
              onChange={({ fileList }) => setBannerFile(fileList.slice(-1))}
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              customRequest={handleUploadBannerFile}
              defaultFileList={
                bannerFile && typeof bannerFile === "string"
                  ? [
                      {
                        uid: uuidv4(),
                        name: bannerFile,
                        status: "done",
                        url: `${
                          import.meta.env.VITE_BACKEND_URL
                        }/storage/info/${bannerFile}`,
                      },
                    ]
                  : []
              }
            >
              {bannerFile.length > 0
                ? renderPreview(bannerFile)
                : renderUploadButton("Event Banner", "16:9", false)}
            </Upload>
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Organizer Information</h3>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Form.Item name="organizerLogo" className="w-full md:w-1/4">
            <Upload
              listType="picture-card"
              fileList={organizerLogoFile}
              beforeUpload={beforeUpload}
              onChange={({ fileList }) =>
                setOrganizerLogoFile(fileList.slice(-1))
              }
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              customRequest={handleUploadLogoFile}
              defaultFileList={
                organizerLogoFile && typeof organizerLogoFile === "string"
                  ? [
                      {
                        uid: uuidv4(),
                        name: organizerLogoFile,
                        status: "done",
                        url: `${
                          import.meta.env.VITE_BACKEND_URL
                        }/storage/info/${organizerLogoFile}`,
                      },
                    ]
                  : []
              }
            >
              {organizerLogoFile.length > 0 ? (
                renderPreview(organizerLogoFile)
              ) : (
                <div className="w-full aspect-square flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg">
                  <UploadOutlined className="text-xl mr-2" />
                  <span>Organizer Logo</span>
                </div>
              )}
            </Upload>
          </Form.Item>

          <div className="flex flex-col gap-2 w-full md:w-3/4">
            <Form.Item
              label="Organizer Name"
              name="organizerName"
              rules={[
                { required: true, message: "Please input organizer name" },
              ]}
            >
              <Input placeholder="Example: ABC Company" />
            </Form.Item>

            <Form.Item label="Organizer Information" name="organizerInfo">
              <Input.TextArea rows={4} />
            </Form.Item>
          </div>
        </div>
      </div>
      {/* </Form> */}
    </>
  );
};
export default HandleBasicInfo;
