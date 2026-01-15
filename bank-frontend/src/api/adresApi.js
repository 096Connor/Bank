import axiosClient from "./axiosClient";

const API_URL = "/adresy";

// Validate adres data before sending
const validateAdresData = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Adres data must be a valid object");
  }

  // Check for required fields (miasto is required based on backend model)
  if (!data.miasto || typeof data.miasto !== "string" || data.miasto.trim() === "") {
    throw new Error("Miasto jest wymagane");
  }

  // Validate other fields if provided
  const stringFields = ["ulica", "nrDomu", "nrMieszkania", "kodPocztowy", "wojewodztwo", "kraj"];
  for (const field of stringFields) {
    if (data[field] !== null && data[field] !== undefined && typeof data[field] !== "string") {
      throw new Error(`${field} must be a string or null`);
    }
  }

  return true;
};

export const getAdresy = async () => {
  try {
    const response = await axiosClient.get(API_URL);
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - please try again");
    }
    if (!error.response) {
      throw new Error("Network error - please check your connection");
    }
    // Re-throw the error with more context
    throw new Error(`Failed to fetch addresses: ${error.response?.data?.message || error.message}`);
  }
};

export const createAdres = async (data) => {
  try {
    // Validate input data
    validateAdresData(data);

    const response = await axiosClient.post(API_URL, data);
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - please try again");
    }
    if (!error.response) {
      throw new Error("Network error - please check your connection");
    }
    // If it's our validation error, re-throw as is
    if (error.message.includes("jest wymagane") || error.message.includes("must be")) {
      throw error;
    }
    // Re-throw backend errors
    throw new Error(`Failed to create address: ${error.response?.data?.message || error.message}`);
  }
};
