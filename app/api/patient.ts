import axios from "axios";

export const getPatientData = async () => {
  const url = `https://fedskillstest.coalitiontechnologies.workers.dev`;

  const response = await axios.get(url, {
    auth: {
      username: 'coalition',
      password: 'skills-test'
    }
  });

  // Since response is already a promise-wrapped object in an async function,
  // you can just return response.data or the whole response.
  return response;
};
