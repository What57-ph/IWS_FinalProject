import { toast } from "react-toastify";

import instance from "./axios-customize";

/**
 * 
Module User
 */

export const getUserList = async () => {
  const URL = `api/v1/users`;
  const response = await instance.get(URL);
  return response.data;
};
export const fetchUserByEmail = async (email) => {
  const URL = `/api/v1/user?email=${email}`;
  const res = await instance.get(URL);
  return (await res).data;
};
export const createNewUser = async (userData) => {
  const URL = `api/v1/users`;
  const res = await instance.post(URL, userData);
  if (res.status === 500) {
    console.log(res);
    toast.error("errorrrr");
  }
  return (await res).data;
};
export const updateUser = async (userData) => {
  const URL = `api/v1/users/update`;
  const res = await instance.put(URL, userData);
  return (await res).data;
};
export const deleteUser = async (id) => {
  const URL = `api/v1/users/delete/${id}`;
  const res = await instance.delete(URL);
  return (await res).data;
};

export const callTest = () => {
  return instance
    .get("https://catfact.ninja/fact")
    .then((response) => response.data);
};

/**
 * 
Module Auth
 */

export const callLogin = (username, password) => {
  return instance.post("/api/v1/auth/login", { username, password });
};

export const callRegister = (username, password) => {
  return instance.post("/api/v1/auth/register", { username, password });
};

export const callLogout = () => {
  return instance.post("/api/v1/auth/logout");
};

export const callAccount = () => {
  return instance.get("/api/v1/auth/account");
};

export const callRefresh = () => {
  return instance.get('/api/v1/auth/refresh')
}

export const callVerify = (email, verificationCode) => {
  return instance.post("/api/v1/auth/verify", { email, verificationCode });
}


export const callResend = (email) => {
  return instance.post(`/api/v1/auth/resend?email=${email}`);
}

export const callResetCodePassword = (email) => {
  return instance.post(`/api/v1/auth/reset_code?email=${email}`);
}

export const callResetPassword = (username, password) => {
  return instance.post("/api/v1/auth/reset", { username, password });
};
/**
 * 
Module Oder
 */

export const callCreateOrder = (order) => {
  return instance.post('/api/v1/orders', order)
}

export const callOrders = () => {
  return instance.get('/api/v1/orders')
}

export const callDeleteOrder = (orderId) => {
  return instance.delete(`/api/v1/orders/${orderId}`)
}

export const callUpdateOrder = (order) => {
  return instance.put('/api/v1/orders', order)
}

/**
 * 
Module Oder
 */


export const callEvents = () => {
  return instance.get('/api/v1/events')
}

export const callFilterEvents = (filter) => {
  const url = `/api/v1/events${filter}`;
  console.log('URL gốc đang gọi:', url);
  return instance.get(url);
};

//Module file
export const fetchImage = async (imgName) => {
  const URL = `/storage/${imgName}`;
  const res = await instance.get(URL);
  return (await res).data;
};
export const uploadSingleFile = async (imgInfo, folder) => {
  const URL = `api/v1/files`;
  const bodyForm = new FormData();
  bodyForm.append("file", imgInfo);
  bodyForm.append("folder", folder);
  const res = await instance.post(URL, bodyForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return (await res).data;
};
//Module event
export const fetchEventList = () => {
  return instance.get("/api/v1/events");
};
export const fetchEventById = async (id) => {
  const URL = `/api/v1/events/${id}`;
  const res = await instance.get(URL);
  return (await res).data;
};
export const deleteEvent = async (id) => {
  const URL = `/api/v1/event/${id}`;
  const res = await instance.delete(URL);
  return (await res).data;
};
export const createNewEvent = async (eventData) => {
  const URL = `api/v1/event`;
  const res = await instance.post(URL, eventData);
  if (res.status === 500) {
    toast.error("errorrrr");
  }
  return (await res).data;
};
export const updateEvent = async (eventData, id) => {
  const URL = `api/v1/event/${id}`;
  const res = await instance.put(URL, eventData);
  return (await res).data;
};

// Module payment
export const createVNPayPayment = async (amount) => {
  const URL = `api/v1/create_payment?amount=${amount}`;
  const res = await instance.get(URL);
  return (await res).data;
}


export const handleAfterPayment = async (orderId) => {
  const URL = "api/v1/update-payment-status";
  return await instance.put(URL, JSON.stringify(orderId), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchPayPalURL = async (amount) => {
  const URL = `api/v1/paypal/pay`;
  const formData = new URLSearchParams();
  formData.append("amount", amount);

  return await instance.post(URL, formData.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const confirmSuccessPayment = async (paymentId, payerId) => {
  const URL = `api/v1/paypal/success?paymentId=${paymentId}&PayerID=${payerId}`;
  const res = await instance.get(URL);
  return (await res).data;
}

//Module organizer
export const fetchOrganizerList = async () => {
  const res = await instance.get("/api/v1/organizers");
  return (await res).data;
};
export const fetchOrganizerById = async (id) => {
  const URL = `/api/v1/organizer/${id}`;
  const res = await instance.get(URL);
  return (await res).data;
};
export const deleteOrganizer = async (id) => {
  const URL = `/api/v1/organizer/${id}`;
  const res = await instance.delete(URL);
  return (await res).data;
};
export const createNewOrganizer = async (organizerData) => {
  const URL = `api/v1/organizer`;
  const res = await instance.post(URL, organizerData);
  if (res.status === 500) {
    toast.error("errorrrr");
  }
  return (await res).data;
};
export const updateOrganizer = async (organizerData) => {
  const URL = `api/v1/organizer`;
  const res = await instance.put(URL, organizerData);
  return (await res).data;
};
