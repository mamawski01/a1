import axios from "axios";
import connectWithSocketServer from "../feIo/feIo";

export async function getUsers() {
  try {
    connectWithSocketServer();
    return await axios.get("http://localhost:7000/api/users");
  } catch (exception) {
    return { error: true, exception };
  }
}

export async function registerUser(data) {
  try {
    return await axios.post("/api/registerUser", data);
  } catch (exception) {
    return { error: true, exception };
  }
}
