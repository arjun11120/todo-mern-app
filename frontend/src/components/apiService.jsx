import axios from "axios";
import swal from 'sweetalert';

const API_BASE_URL = "/api";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const saveData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, data);
    swal({
      title: "Success!",
      text: response.data?.message ?? "Added Successfully",
      icon: "success",
      timer: 1000,
      buttons: false,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    swal({
      title: "Error!",
      text: "An error occurred while saving data.",
      icon: "error",
      timer: 1000,
      buttons: false,
    });
    throw error;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/delete`, { id: id });
    return response.id;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};
