import emailjs from "emailjs-com";

export const notifyUserEmail = async (params) => {
  try {
    await emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID_NOTIFY_USER,
      params,
      process.env.REACT_APP_USER_ID
    );
  } catch (error) {
    return false;
  }
  return true;
};

export const notifyAdminEmail = async (params) => {
  try {
    await emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID_NOTIFY_ADMIN,
      params,
      process.env.REACT_APP_USER_ID
    );
  } catch (error) {
    return false;
  }
  return true;
};
