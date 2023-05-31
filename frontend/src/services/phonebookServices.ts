import axios from "axios";
import { fire } from "../fire";

const url = "http://localhost:3001/api/phones";

export const addToPhonebook = async (name: string, number: string) => {
  const header = await createFirebaseToken();

  const payload = {
    name,
    number,
  };
  try {
    const res = await axios.post(url, payload, header);
    return res.data;
  } catch (error) {
    console.log("Error in addToPhoneBook: ", error);
  }
};

const createFirebaseToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const getPhoneBookEntries = async () => {
  const header = await createFirebaseToken();

  try {
    const res = await axios.get(url, header);
    return res.data;
  } catch (error) {
    console.log("Error in getPhoneBookEntries: ", error);
  }
};
