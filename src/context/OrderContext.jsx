import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchEventById } from "../config/api";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState();
  const [event, setEvent] = useState();
  const [eventId, setEventId] = useState();
  useEffect(() => {
    const fetchEventDataById = async (id) => {
      if (!id) return;
      const data = await fetchEventById(id);
      setEvent(data);
    };
    fetchEventDataById(eventId);
  }, [eventId]);
  return (
    <OrderContext.Provider
      value={{ order, setOrder, event, setEvent, eventId, setEventId }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => useContext(OrderContext);
