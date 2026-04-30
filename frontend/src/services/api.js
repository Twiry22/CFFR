/**
 * CFFR API Service
 * Handles all communication between the React frontend and the Node.js backend.
 */

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

/**
 * Sends the student's answers to the backend and returns career recommendations.
 */
export const submitAssessment = async (answers) => {
  try {
    const response = await api.post("/api/assess", { answers });
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "The server took too long to respond. Please wait a moment and try again."
      );
    }
    if (error.response) {
      const msg  = error.response.data?.message;
      const errs = error.response.data?.errors;
      if (errs && errs.length > 0) throw new Error(errs.join(" "));
      throw new Error(msg || "Assessment failed. Please try again.");
    }
    if (error.request) {
      throw new Error(
        "Could not reach the server. Please check your connection and try again."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export default api;
