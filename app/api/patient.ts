import axios from "axios";

export const getPatientData = async () => {
  const url = `https://fedskillstest.coalitiontechnologies.workers.dev`;

  const response = await axios.get(url, {
    auth: {
      username: process.env.NEXT_PUBLIC_LOGIN_NAME || '',
      password: process.env.NEXT_PUBLIC_LOGIN_PASSWORD || '',
    }
  });

  // Since response is already a promise-wrapped object in an async function,
  // you can just return response.data or the whole response.
  return response;
};
