import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Radio, Button, Select, Switch } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import HandleLocation from "../../../components/admin/event/handleLocation";
import dayjs from "dayjs";
import { updateUser } from "../../../config/api";

const { Option } = Select;

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const title = (<h1 className="text-[16px] mb-2">Address: </h1>)
  const [form] = Form.useForm();
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        dob: currentUser.dob ? dayjs(currentUser.dob) : null, 
        province: currentUser.province,
        district: currentUser.district,
        ward: currentUser.ward,
        houseNumber: currentUser.houseNumber,
      });
    }
  }, [currentUser, form]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const response = updateUser(values)
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }} defaultValue="+84">
  //       <Option value="+84">+84</Option>
  //       <Option value="+1">+1</Option>
  //     </Select>
  //   </Form.Item>
  // );

  // Style chung cho các input
  const inputStyle = {
    padding: "10px 12px",
    fontSize: "16px",
    height: "46px",
  };

  return (
    <>
      <h1 className="text-2xl font-bold pb-2">Cài đặt tài khoản</h1>
      <hr />
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 500, margin: "0 auto" }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Họ và tên" 
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { min: 10, message: "Số điện thoại phải có ít nhất 10 ký tự!" },
            { max: 16, message: "Số điện thoại không được quá 16 ký tự!" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Số điện thoại"
            style={{ ...inputStyle, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "Email không hợp lệ!" },
            { required: true, message: "Vui lòng nhập email!" },
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Email" 
            style={inputStyle}
            disabled 
          />
        </Form.Item>

        <Form.Item
          name="dob"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker
            placeholder="Ngày tháng năm sinh"
            style={{ ...inputStyle, width: "100%", height: "46px" }}
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <HandleLocation form={form} title={title}/>

        <div className="mb-6">
          <span className="text-[16px]">Thay đổi mật khẩu:  </span>
          <Switch 
            checked={changePassword} 
            onChange={(checked) => {
              setChangePassword(checked);
              if (!checked) {
                form.setFieldsValue({
                  password: undefined,
                  confirm: undefined
                });
              }
            }} 
          />
        </div>

        <Form.Item
          name="password"
          rules={[
            { required: changePassword, message: "Vui lòng nhập mật khẩu!" },
            changePassword ? { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" } : {},
          ]}
          hasFeedback
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Mật khẩu" 
            disabled={!changePassword}
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: changePassword, message: "Vui lòng xác nhận mật khẩu!" },
            changePassword ? ({
              validator(_, value) {
                if (!value || form.getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }) : {},
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Xác nhận mật khẩu"
            disabled={!changePassword}
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            style={{ height: "46px", fontSize: "16px" }}
          >
            Hoàn thành
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfilePage;