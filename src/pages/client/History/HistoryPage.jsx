import { Col, Divider, Modal, Row, Tabs } from "antd";
import React, { useState } from "react";
import Ticket from "../../../components/client/Ticket/Ticket";
import sampleData from "../../../data/sampleData";

const HistoryPage = () => {
  const event = sampleData.events[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {setIsModalOpen(true)}
  const closeModal = () => {setIsModalOpen(false)}
  return (
    <div>
      <h1 className="text-2xl font-bold pb-2">Vé đã mua</h1>
      <hr />
      <Ticket onClick={openModal}/>
      <Ticket onClick={openModal}/>
      <Ticket onClick={openModal}/>

      <Modal title="Chi tiết vé" open={isModalOpen} onOk={closeModal} onCancel={closeModal}>
        <div>
          <img src={event.information} alt="" />
          <h1 className="font-bold text-lg mb-5">VIETNAM COLLEGIATE BASKETBALL CHAMPIONSHIP 2024</h1>
          <h3 className="text-sm">Loại vé</h3>
          <h1 className="text-md font-semibold mb-2">Standard</h1>
          <h3 className="text-sm">Thời gian</h3>
          <h1 className="text-md font-semibold mb-2">18:00 - 22:00 07/5/2025</h1>
          <hr />
          <h1 className="font-bold text-lg mb-5">Thông tin đơn hàng</h1>
          <div className="flex justify-between mb-5">
            <h1>Ngày đặt hàng</h1>
            <h1>18:54 22/04/2025</h1>
          </div>
          <Row className="my-3">
            <Col span={8} className="font-semibold">Loại vé</Col>
              
            <Col span={8} className="text-center font-semibold">Số lượng</Col>
              
            <Col span={8} className="text-right font-semibold">Thành tiền</Col>
          </Row>
          <Row className="my-3">
            <Col span={8}>STANDARD </Col>
            
            <Col span={8} className="text-center">1</Col>
            
            <Col span={8} className="text-right">0 đ</Col>
          </Row>
          <Row className="my-3">
            <Col span={16} className="font-semibold">Tổng tiền</Col>
            
            <Col span={8} className="text-right">0 đ</Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
    
};

export default HistoryPage;
