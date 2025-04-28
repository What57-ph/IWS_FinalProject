import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchEventById } from "../config/api";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => {
    // Retrieve the order from localStorage if it exists
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : undefined;
  });
  const [event, setEvent] = useState();
  const [eventId, setEventId] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank-transfer");
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  useEffect(() => {
    setTotalAmount(selectedTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0))

  }, [selectedTickets]);
  useEffect(() => {
    const fetchEventDataById = async (id) => {
      if (!id) return;
      const data = await fetchEventById(id);
      setEvent(data);
    };
    fetchEventDataById(eventId);

  }, [eventId]);
  useEffect(() => {
    setCurrentStep(0);
  }, []);
  useEffect(() => {
    if (order) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);

  return (
    <OrderContext.Provider
      value={{ order, setOrder, event, setEvent, eventId, setEventId, currentStep, setCurrentStep, selectedTickets, setSelectedTickets, totalAmount, selectedMethod, setSelectedMethod, fullName, setFullName, email, setEmail, phone, setPhone }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => useContext(OrderContext);
