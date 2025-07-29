import axios from 'axios';
export const sendDataToBackEnd = async (data, dataid) => {
  const { name, email, message } = data;
  try {
    const response = await axios.post(
      'https://test-server-fortg.onrender.com/send-message',
      {
        dataid,
        name,
        email,
        message,
      }
    );

    console.log('Відповідь сервера:', response.data);
  } catch (error) {
    console.error('Помилка при надсиланні:', error);
  }
};
