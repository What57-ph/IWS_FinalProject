import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import HandleLocation from "./handleLocation";
import { UploadOutlined } from "@ant-design/icons";
import { uploadSingleFile } from "../../../config/api";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
const HandleBasicInfo = ({
  form,
  squareLogoFile,
  setSquareLogoFile,
  bannerFile,
  setBannerFile,
  organizerLogoFile,
  setOrganizerLogoFile,
  initialValues,
  requestType,
  descFile,
  setDescFile
}) => {
  const title = (<h1>Event address</h1>)
  const { RangePicker } = DatePicker;
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    if (requestType === "put" && initialValues) {
      form.setFieldsValue({
        eventDate: initialValues.startDate && initialValues.endDate
          ? [dayjs(initialValues.startDate), dayjs(initialValues.endDate)]
          : undefined,
        organizerName: initialValues.organizer?.name || undefined,
        organizerInfo: initialValues.organizer?.description || undefined,
      });
      if (initialValues.imgEventInfo) {
        setSquareLogoFile([
          {
            uid: uuidv4(),
            name: "Event Info",
            status: "done",
            url: initialValues.imgEventInfo,
          },
        ]);
      }
      if (initialValues.banner) {
        setBannerFile([
          {
            uid: uuidv4(),
            name: "Banner",
            status: "done",
            url: initialValues.banner,
          },
        ]);
      }
      if (initialValues.logo) {
        setOrganizerLogoFile([
          {
            uid: uuidv4(),
            name: "Logo",
            status: "done",
            url: initialValues.logo,
          },
        ]);
      }
      if (initialValues.descImg) {
        setDescFile([
          {
            uid: uuidv4(),
            name: "Description",
            status: "done",
            url: initialValues.descImg,
          },
        ]);
      }
    } else if (requestType === "post") {

      form.resetFields();
      form.setFieldsValue({
        eventDate: undefined,
        organizerName: undefined,
        organizerInfo: undefined,
      });
      setSquareLogoFile([]);
      setBannerFile([]);
      setOrganizerLogoFile([]);
      setDescFile([]);
    }
  }, [initialValues, requestType, form]);
  const onChange = (dates) => {
    if (dates) {
      const formattedStartDate = dates[0].format("YYYY-MM-DDTHH:mm:ss");
      const formattedEndDate = dates[1].format("YYYY-MM-DDTHH:mm:ss");
      console.log(formattedEndDate, formattedStartDate);
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
  const handleUploadInfoFile = async ({ file }) => {
    try {
      const res = await uploadSingleFile(file, "info");
      if (res && res.fileName) {
        // onSuccess({
        //   name: res.fileName,
        //   status: "done",
        //   url: `${import.meta.env.VITE_BACKEND_URL}/storage/logo/${
        //     res.fileName
        //   }`,
        // });
        setSquareLogoFile([
          {
            uid: file.uid,
            name: squareLogoFile,
            status: "done",
            // url: URL.createObjectURL(file),
            url: `${import.meta.env.VITE_BACKEND_URL}/storage/info/${res.fileName
              }`,
          },
        ]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      // onError(error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const handleUploadBannerFile = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadSingleFile(file, "banner");
      if (res && res.fileName) {
        // onSuccess({
        //   name: res.fileName,
        //   status: "done",
        //   url: `${import.meta.env.VITE_BACKEND_URL}/storage/logo/${
        //     res.fileName
        //   }`,
        // });
        setBannerFile([
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            // url: URL.createObjectURL(file),
            url: `${import.meta.env.VITE_BACKEND_URL}/storage/banner/${res.fileName
              }`,
          },
        ]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      // onError(error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const handleUploadLogoFile = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadSingleFile(file, "logo");
      if (res && res.fileName) {
        // onSuccess({
        //   name: res.fileName,
        //   status: "done",
        //   url: `${import.meta.env.VITE_BACKEND_URL}/storage/logo/${
        //     res.fileName
        //   }`,
        // });
        setOrganizerLogoFile([
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            // url: URL.createObjectURL(file),
            url: `${import.meta.env.VITE_BACKEND_URL}/storage/logo/${res.fileName
              }`,
          },
        ]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      // onError(error);
      toast.error("Oops! It happens some error when upload file.");
    }
  };
  const handleUploadDescFile = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadSingleFile(file, "description");
      if (res && res.fileName) {
        // onSuccess({
        //   name: res.fileName,
        //   status: "done",
        //   url: `${import.meta.env.VITE_BACKEND_URL}/storage/logo/${
        //     res.fileName
        //   }`,
        // });
        setDescFile([
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            // url: URL.createObjectURL(file),
            url: `${import.meta.env.VITE_BACKEND_URL}/storage/description/${res.fileName
              }`,
          },
        ]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      // onError(error);
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
  console.log("initial values", initialValues)
  return (
    <>
      {/* <Form form={form} onFinish={onFinish} layout="vertical" className="font-bold"> */}
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item label="Event name" name="name" className="w-full md:w-1/2">
          <Input placeholder="Example: Event ABC" />
        </Form.Item>
        <Form.Item label="Status" name="status" className="w-full md:w-1/2">
          <Select>
            <Select.Option value="CLOSED">Closed</Select.Option>
            <Select.Option value="OPEN">Open</Select.Option>
            <Select.Option value="SOLD_OUT">Sold out</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Form.Item className="w-full md:w-1/2" label="Category" name="category">
          <Select>
            <Select.Option value="Live music">Live music</Select.Option>
            <Select.Option value="Sport">Sport</Select.Option>
            <Select.Option value="Conference">Conference</Select.Option>
            <Select.Option value="Stage & Art">Stage & Art</Select.Option>
            <Select.Option value="Travel & Tour">Travel & Tour</Select.Option>
            <Select.Option value="Nightlife">Nightlife</Select.Option>
            <Select.Option value="Merchandise">Merchandise</Select.Option>

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
            onCalendarChange={(dates) => {
              setDateList(dates);

            }}

          />
        </Form.Item>
      </div>

      <HandleLocation form={form} title={title}/>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Upload Event Media</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item name="imgEventInfo" initialValue={requestType === "put" ? initialValues.imgEventInfo : null}>
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
                : renderUploadButton("Event info", "1:1")}
            </Upload>
          </Form.Item>
          <Form.Item name="descImg" initialValue={requestType === "put" ? initialValues.descImg : null}>
            <Upload
              listType="picture-card"
              fileList={descFile}
              beforeUpload={beforeUpload}
              onChange={({ fileList }) => setDescFile(fileList.slice(-1))} // only 1 file
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              className="custom-upload-event-info "
              customRequest={handleUploadDescFile}
              defaultFileList={
                typeof descFile === "string"
                  ? [
                    {
                      uid: uuidv4(),
                      name: descFile,
                      status: "done",
                      url: `${import.meta.env.VITE_BACKEND_URL
                        }/storage/description/${descFile}`,
                    },
                  ]
                  : []
              }
            >
              {descFile.length > 0 || (requestType === "put" && initialValues.descImg)
                ? renderPreview(descFile, initialValues.descImg)
                : renderUploadButton("Event info", "1:1")}
            </Upload>
          </Form.Item>

          <Form.Item name="banner" className="flex-1" initialValue={requestType === "put" ? initialValues.banner : null}>
            <Upload
              className="custom-upload-banner-info "
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
                      url: `${import.meta.env.VITE_BACKEND_URL
                        }/storage/banner/${bannerFile}`,
                    },
                  ]
                  : []
              }
            >
              {bannerFile.length > 0 || (requestType === "put" && initialValues.banner)
                ? renderPreview(bannerFile, initialValues.banner)
                : renderUploadButton("Event Banner", "16:9", false)}
            </Upload>
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Organizer Information</h3>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Form.Item name="logo" className="w-full md:w-1/4" initialValue={requestType === "put" ? initialValues.logo : null}>
            <Upload
              className="custom-upload-organizer-info"
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
                      url: `${import.meta.env.VITE_BACKEND_URL
                        }/storage/logo/${organizerLogoFile}`,
                    },
                  ]
                  : []
              }
            >
              {organizerLogoFile.length > 0 || (requestType === "put" && initialValues.logo) ? (
                renderPreview(organizerLogoFile, initialValues.logo)
              ) : (
                <div className="w-full h-[95%] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg">
                  <UploadOutlined className="text-xl" />
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
            // initialValue={requestType === "put" ? initOrganizerName : undefined}

            >
              <Input placeholder="Example: ABC Company" disabled={requestType === "put" ? true : false} />
            </Form.Item>

            <Form.Item label="Organizer Information" name="organizerInfo"
            // initialValue={requestType === "put" ? initOrganizerDesc : undefined}
            >
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
