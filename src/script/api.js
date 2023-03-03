import axios from "axios";

export const HTTPEmployees = axios.create({
  baseURL: "https://localhost:7232/api/v1/Employees",
});

export const HTTPDepartments = axios.create({
  baseURL: "https://localhost:7232/api/v1/Departments",
});