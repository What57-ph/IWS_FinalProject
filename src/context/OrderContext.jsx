import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchEventById } from "../config/api";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState();
  const [event, setEvent] = useState();
  const [eventId, setEventId] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTickets, setSelectedTickets] = useState([]);
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
  return (
    <OrderContext.Provider
      value={{ order, setOrder, event, setEvent, eventId, setEventId, currentStep, setCurrentStep, selectedTickets, setSelectedTickets }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => useContext(OrderContext);
