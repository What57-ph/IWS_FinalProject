import { useState } from "react";
import data from "dvhcvn";
import { Col, Form, Input, Row, Select } from "antd";

const HandleLocation = ({ form }) => {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // console.log(data);

  const provinces = data.level1s.map((province) => ({
    value: province.name,
    label: province.name,
    code: province.id,
  }));

  const handleProvinceChange = (value, option) => {
    const selectedProvince = data.level1s.find((p) => p.id === option.code);
    if (selectedProvince) {
      setDistricts(
        selectedProvince.children.map((district) => ({
          value: district.name,
          label: district.name,
          code: district.id,
          parentCode: selectedProvince.id,
        }))
      );
    }
    setWards([]);
  };

  const handleDistrictChange = (value, option) => {
    const selectedProvince = data.level1s.find(
      (p) => p.id === option.parentCode
    );
    if (selectedProvince) {
      const selectedDistrict = selectedProvince.children.find(
        (d) => d.id === option.code
      );
      if (selectedDistrict) {
        setWards(
          selectedDistrict.children.map((ward) => ({
            value: ward.name,
            label: ward.name,
            code: ward.id,
          }))
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Event address</h1>
      <Row gutter={12}>
        {/* <Col span={24}>
          <Form.Item name="location">
            <Input placeholder="Event address" />
          </Form.Item>
        </Col> */}

        <Col span={12}>
          <Form.Item
            name="province"
            rules={[{ required: true, message: "Chọn tỉnh/thành" }]}
          >
            <Select
              placeholder="Tỉnh/Thành"
              options={provinces}
              onChange={handleProvinceChange}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="district"
            rules={[{ required: true, message: "Chọn quận/huyện" }]}
          >
            <Select
              placeholder="Quận/Huyện"
              options={districts}
              onChange={handleDistrictChange}
              disabled={!districts.length}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="ward"
            rules={[{ required: true, message: "Chọn phường/xã" }]}
          >
            <Select
              placeholder="Phường/Xã"
              options={wards}
              disabled={!wards.length}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="houseNumber"
            rules={[{ required: true, message: "Nhập số nhà/đường" }]}
          >
            <Input placeholder="Số nhà, tên đường" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
export default HandleLocation;
