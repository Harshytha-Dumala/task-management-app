import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const register = (data) =>
    axios.post(`${API_URL}/auth/register`, data);

export const login = (data) =>
    axios.post(`${API_URL}/auth/login`, data);

export const getUsers = () =>
    axios.get(`${API_URL}/users`, { headers: getAuthHeader() });

export const getProjects = () =>
    axios.get(`${API_URL}/projects`, { headers: getAuthHeader() });

export const createProject = (data) =>
    axios.post(`${API_URL}/projects`, data, { headers: getAuthHeader() });

export const getTasks = () =>
    axios.get(`${API_URL}/tasks`, { headers: getAuthHeader() });

export const createTask = (data) =>
    axios.post(`${API_URL}/tasks`, data, { headers: getAuthHeader() });

export const updateTask = (id, data) =>
    axios.put(`${API_URL}/tasks/${id}`, data, { headers: getAuthHeader() });

export const deleteTask = (id) =>
    axios.delete(`${API_URL}/tasks/${id}`, { headers: getAuthHeader() });