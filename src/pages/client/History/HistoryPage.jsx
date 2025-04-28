import { Col, Divider, Modal, Row, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Ticket from "../../../components/client/Ticket/Ticket";
import sampleData from "../../../data/sampleData";
import { callHistory } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";
import { useRowStyle } from "antd/es/grid/style";

const HistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState();
  const [currentOrder, setCurrentOrder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callHistory(user.id)
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error fetching order history", err);
        setLoading(false);
      });
  }, []);
  console.log("orders", orders);
  console.log("current order", currentOrder);

  const openModal = (orderDetail) => {
    setCurrentOrder(orderDetail);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setCurrentOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold pb-2">Tickets purchased</h1>
      <hr />
      {loading && (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      )}

      {!orders && !loading && (
        <div className="flex justify-center items-center my-10 ">
          Thers's no ticket purchased yet!
        </div>
      )}

      {orders
        ?.filter((orderDetail) => orderDetail.status === "CONFIRMED")
        .map((orderDetail, index) => (
          <Ticket
            onClick={() => openModal(orderDetail)}
            data={orderDetail}
            key={index}
          />
        ))}

      {/* <Ticket onClick={openModal}/>
      <Ticket onClick={openModal}/> */}

      <Modal
        title="Order Detail"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <img
            src={currentOrder?.event.banner}
            alt=""
            className="mb-3 rounded"
          />
          <h1 className="font-bold text-lg mb-2">{currentOrder?.event.name}</h1>
          <h3 className="text-sm mb-1">Event Time</h3>
          <h1 className="text-md font-semibold mb-2">
            {new Date(currentOrder?.event.startDate).toLocaleString()} -{" "}
            {new Date(currentOrder?.event.endDate).toLocaleString()}
          </h1>
          <Divider />
          <h1 className="font-bold text-lg mb-3">Order Information</h1>
          <div className="flex justify-between mb-5">
            <h1>Order Date</h1>
            <h1>{new Date(currentOrder?.createdAt).toLocaleString()}</h1>
          </div>

          <Row className="my-3 font-semibold">
            <Col span={8}>Ticket Type</Col>
            <Col span={8} className="text-center">
              Quantity
            </Col>
            <Col span={8} className="text-right">
              Subtotal
            </Col>
          </Row>

          {currentOrder?.items?.map((item, index) => (
            <Row key={index} className="my-2">
              <Col span={8}>{item.ticket.name}</Col>
              <Col span={8} className="text-center">
                {item.quantity}
              </Col>
              <Col span={8} className="text-right">
                {item.subTotal.toLocaleString()} đ
              </Col>
            </Row>
          ))}

          <Divider />

          <Row className="my-3 font-semibold">
            <Col span={16}>Total Price</Col>
            <Col span={8} className="text-right">
              {currentOrder?.totalPrice.toLocaleString()} đ
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default HistoryPage;
