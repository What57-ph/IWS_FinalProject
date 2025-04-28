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
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const title = (<h1 className="text-[16px] font-semibold">Address: </h1>)
  const [form] = Form.useForm();
  const [changePassword, setChangePassword] = useState(false);
  const [loading, setLoading] = useState(false)

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


  const onFinish = async (values) => {
    setLoading(true)
    
    try {
      
      const res = await updateUser(values)
      
      toast.success('Update information successfully!')
    } catch {
      toast.error('Fail! Something wrong on server')
    } finally {
      setLoading(false)
    }
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
      <h1 className="text-2xl font-bold pb-2">Account settings</h1>
      <hr />
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 500, margin: "0 auto" }}
        scrollToFirstError
      >
        <h1 className="mb-2 text-[16px] font-semibold">Your name:  </h1>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please type your name!" }]}>
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Full name" 
            style={inputStyle}
          />
        </Form.Item>

        <h1 className="mb-2 text-[16px] font-semibold">Phone number:  </h1>
        <Form.Item
          name="phone"
          rules={[ 
            { required: true, message: "Please enter your phone number!" },
            { min: 10, message: "Phone number must be at least 10 characters!" },
            { max: 16, message: "Phone number cannot be more than 16 characters!" },
          ]}>
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone number"
            style={{ ...inputStyle, width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "Invalid email!" },
            { required: true, message: "Please enter your email!" },
          ]}>
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Email" 
            style={inputStyle}
            disabled 
          />
        </Form.Item>

        <h1 className="mb-2 text-[16px] font-semibold">Birthday:  </h1>
        <Form.Item
          name="dob"
          rules={[{ required: true, message: "Please select your date of birth!" }]}>
          <DatePicker
            placeholder="Date of birth"
            style={{ ...inputStyle, width: "100%", height: "46px" }}
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <HandleLocation form={form} title={title}/>

        <div className="mb-6">
          <span className="text-[16px] font-semibold">Change password:  </span>
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
            { required: changePassword, message: "Please enter a password!" },
            changePassword ? { min: 6, message: "Password must be at least 6 characters!" } : {},
          ]}
          hasFeedback
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Password" 
            disabled={!changePassword}
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: changePassword, message: "Please confirm your password!" },
            changePassword ? ({
              validator(_, value) {
                if (!value || form.getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }) : {},
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm password"
            disabled={!changePassword}
            style={inputStyle}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
            style={{ height: "46px", fontSize: "16px" }}
          >
            Complete
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfilePage;
