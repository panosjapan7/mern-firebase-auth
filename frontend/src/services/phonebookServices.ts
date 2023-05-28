import axios from "axios";

const url = "http://localhost:3001/api";
export const addToPhonebook = (name: string, number: string) => {
  const payload = {
    name,
    number,
  };
  axios.post(url, payload).then((response) => console.log(response));
};
