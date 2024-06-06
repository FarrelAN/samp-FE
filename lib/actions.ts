import axios from "axios";
import { CaseType, ResponseType } from "./types";

const apiBaseUrl = process.env.API_BASE_URL || "";

export const getCase = async (): Promise<CaseType[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/case`);
    return response.data.filter(
      (caseItem: CaseType) => caseItem.case_status.toLowerCase() !== "closed"
    );
  } catch (error: any) {
    console.error(`Error getting cases`, error.message);
    return null as unknown as CaseType[];
  }
};
export const getCaseByID = async (id: string): Promise<CaseType | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/case/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error getting case with ID ${id}`, error.message);
    return null;
  }
};

export const getIAMCase = async (): Promise<CaseType[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/case`);
    return response.data.filter(
      (caseItem: CaseType) =>
        caseItem.case_status.toLowerCase() !== "closed" &&
        ["on progress", "review"].includes(caseItem.case_status.toLowerCase())
    );
  } catch (error: any) {
    console.error(`Error getting cases`, error.message);
    return null as unknown as CaseType[];
  }
};

export const updateCaseStatus = async (
  caseId: string,
  status: string
): Promise<CaseType | null> => {
  try {
    const response = await axios.patch(`${apiBaseUrl}/case/${caseId}`, {
      case_status: status,
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error updating case status`, error.message);
    return null;
  }
};

export const handleSendToResolver = async (caseId: string) => {
  try {
    const response = await axios.patch(`http://localhost:8000/case/${caseId}`, {
      case_status: "ON PROGRESS",
    });
    if (response.status === 200) {
      alert("Case status updated to ON PROGRESS");
      window.location.reload(); // Reload the page
    }
  } catch (error) {
    console.error("Error updating case status:", error);
    alert("Failed to update case status");
  }
};

export const handleCaseClosed = async (caseId: string) => {
  try {
    const response = await axios.patch(`http://localhost:8000/case/${caseId}`, {
      case_status: "CLOSED",
    });
    if (response.status === 200) {
      alert("Case status updated to CLOSED");
      window.location.reload(); // Reload the page
    }
  } catch (error) {
    console.error("Error updating case status:", error);
    alert("Failed to update case status");
  }
};

export const handleCaseReview = async (caseId: string) => {
  try {
    const response = await axios.patch(`http://localhost:8000/case/${caseId}`, {
      case_status: "REVIEW",
    });
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    console.error("Error updating case status:", error);
    alert("Failed to update case status");
  }
};

export const getAllResponse = async (): Promise<ResponseType[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/feedbacks`);

    return response.data.filter(
      (responseItem: ResponseType) =>
        responseItem.user_ad && // Check if user_ad exists and is not empty
        responseItem.user_ad.trim() !== "" &&
        responseItem.nama_lengkap &&
        responseItem.nama_lengkap.trim() !== ""
    );
  } catch (error: any) {
    console.error("Error getting responses:", error.message);
    return []; // Return an empty array in case of an error
  }
};

export const getResponseByID = async (
  id: string
): Promise<ResponseType | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/feedbacks/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error getting user response with ID ${id}`, error.message);
    return null;
  }
};

export const sendMessage = async (toNumber: string, message: string) => {
  try {
    const response = await axios.post(`http://localhost:8000/message`, {
      to_number: toNumber,
      message,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error sending message`, error.message);
    return null;
  }
};

export const analyzeFeedbacks = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `http://localhost:8000/feedbacks/analyze`
    );
    return response.data.analysis;
  } catch (error: any) {
    console.error("Error analyzing feedbacks", error.message);
    throw new Error("Failed to analyze feedbacks");
  }
};
