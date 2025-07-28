import axios from 'axios';
export const postDataToBot = async data => {
  const { name, email, message } = data;
  try {
    const response = await axios.post(
      'https://test-server-fortg.onrender.com/send-message',
      {
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
