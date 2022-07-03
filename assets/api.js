const axios = require("axios");

export const getEmployees = async (currentPage, name, department) => {
    try {
        const response = await axios.get(`/api/employees?page=${currentPage}&name=${name}&department=${department}`);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getDepartments = async () => {
    try {
        const response = await axios.get('/api/departments');
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

export const postEmployee = async (employee) => {
    try {
        const response = await axios.post('/api/employee', employee);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

export const putEmployee = async (employee) => {
    try {
        const response = await axios.put(`/api/employee/${employee.id}`, employee);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}
