/**
 * CFFR API Service
 * Handles all communication between the React frontend and the Node.js backend.
 */

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000, // 15 seconds before giving up
});

/**
 * Sends the student's answers to the backend and returns 3 career recommendations.
 * @param {object} answers - The student's 10 answers
 * @returns {object} - Full CFFR assessment result
 */
export const submitAssessment = async (answers) => {
  try {
    const response = await api.post("/api/assess", { answers });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Backend responded with an error
      throw new Error(
        error.response.data?.message || "Assessment failed. Please try again."
      );
    } else if (error.request) {
      // No response from backend at all
      throw new Error(
        "Could not reach the server. Please check your connection and try again."
      );
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

export default api;
