import axios from 'axios';
export const sendDataToBackEnd = async (data, dataid) => {
  const { name, email, message } = data;
  try {
    const response = await axios.post(
      'https://test-server-fortg.onrender.com/event-registration',
      {
        dataid,
        name,
        email,
        message,
      }
    );
  } catch (error) {
    console.error('Помилка при надсиланні:', error);
    throw error;
  }
};

export const sendCartDataToBackEnd = async arr => {
  try {
    const response = await axios.post(
      'https://test-server-fortg.onrender.com/cart',

      arr
    );
  } catch (error) {
    console.error('Помилка при надсиланні:', error);
    throw error;
  }
};
