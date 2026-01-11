import type { Employee } from "../types";

export const storage = {
  getEmployees: (): Employee[] => {
    const data = localStorage.getItem("employees");
    return data ? JSON.parse(data) : [];
  },

  saveEmployees: (employees: Employee[]): void => {
    localStorage.setItem("employees", JSON.stringify(employees));
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem("isAuthenticated") === "true";
  },

  login: (): void => {
    localStorage.setItem("isAuthenticated", "true");
  },

  logout: (): void => {
    localStorage.removeItem("isAuthenticated");
  },
};

export const initializeMockData = (): void => {
  const existing = storage.getEmployees();
  if (existing.length === 0) {
    const mockEmployees: Employee[] = [];
    storage.saveEmployees(mockEmployees);
  }
};
