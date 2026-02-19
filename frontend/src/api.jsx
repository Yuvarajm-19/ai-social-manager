import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const fetchApprovalQueue = async () => {
    const res = await API.get("/approval");
    return res.data;
};

export const approvePost = async (id) => {
    return API.post("/approval/approve", { id });
};

export const rejectPost = async (id) => {
    return API.post("/approval/reject", { id });
};
