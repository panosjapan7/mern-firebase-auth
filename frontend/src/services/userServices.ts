import axios from "axios";
import { fire } from "../fire";

const url = "http://localhost:3001/api/users";

export const addUserToMongo = async (
  uid: string | undefined,
  email: string,
  displayName?: string | undefined,
  roles?: string[],
  createdAt?: string
) => {
  const header = await createFirebaseToken();
  const user = fire.auth().currentUser;

  const payload = {
    uid: user?.uid,
    email: user?.email,
    displayName: user?.displayName,
    roles: ["user"],
    createdAt: user?.metadata.creationTime,
  };

  try {
    const res = await axios.post(url, payload, header);
    return res.data;
  } catch (error) {
    console.log("Error in addUserToMongo: ", error);
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

export const getUsersFromMongo = async () => {
  const header = await createFirebaseToken();
  try {
    const res = await axios.get(url, header);
    return res.data;
  } catch (error) {
    console.log("Error in getUsersFromMongo: ", error);
  }
};

export const getUserFromMongo = async (uid: string) => {
  const header = await createFirebaseToken();
  try {
    const res = await axios.get(`${url}/${uid}`, header);
    return res.data;
  } catch (error) {
    console.log(
      "Error from getUserFromMongo(): User uid not found in MongoDB: ",
      error
    );
    return null;
  }
};

export const getUserRolesFromMongo = async (uid: string) => {
  try {
    const user = await getUserFromMongo(uid);
    if (user) {
      return user.roles;
    }
  } catch (error) {
    console.log("Error from getUserRoleFromMongo: ", error);
  }
};
