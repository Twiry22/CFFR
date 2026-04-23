/**
 * CFFR API Service
 * Handles all communication between the React frontend and the Node.js backend.
 *
 * FIX: Added explicit fallback logic so the correct Render URL is always used
 * in production. Set VITE_API_URL in your Render environment variables.
 */

import axios from "axios";

// In production on Render, VITE_API_URL must be set to your backend service URL
// e.g. https://cffr-api.onrender.com
// In local dev it falls back to localhost:4000
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000, // 30 seconds — Render free tier spins down, needs extra time to wake
});

/**
 * Sends the student's answers to the backend and returns career recommendations.
 * @param {object} answers - The student's 10 answers
 * @returns {object} - Full CFFR assessment result
 */
export const submitAssessment = async (answers) => {
  try {
    const response = await api.post("/api/assess", { answers });
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "The server took too long to respond. Please wait a moment and try again — it may be waking up."
      );
    }
    if (error.response) {
      // Backend responded with a 4xx / 5xx error
      const msg = error.response.data?.message;
      const errs = error.response.data?.errors;
      if (errs && errs.length > 0) {
        throw new Error(errs.join(" "));
      }
      throw new Error(msg || "Assessment failed. Please try again.");
    }
    if (error.request) {
      // Request was made but no response received
      throw new Error(
        "Could not reach the server. Please check your connection and try again."
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export default api;
