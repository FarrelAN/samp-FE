import axios from "axios";
import { CaseType } from "./types";

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
      alert("Case status updated to REVIEW");
      window.location.reload(); // Reload the page
    }
  } catch (error) {
    console.error("Error updating case status:", error);
    alert("Failed to update case status");
  }
};

export const getAllResponse = async (): Promise<CaseType[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/feedback`);
    return response.data.filter(
      (caseItem: CaseType) => caseItem.case_status.toLowerCase() !== "closed"
    );
  } catch (error: any) {
    console.error(`Error getting cases`, error.message);
    return null as unknown as CaseType[];
  }
};

export const getResponseByID = async (id: string): Promise<CaseType | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/feedback/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error getting user response with ID ${id}`, error.message);
    return null;
  }
};
