import axios  from 'axios';
import { ADDNEW_POST, GETALL_POSTS, GET_POST, DELETE_POST } from './type';


const API_URL = 'http://localhost:3001';


export const addNewPost = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/posts`, data)
        
        dispatch( { type: ADDNEW_POST, payload: res.data })

    } catch (error) {
        console.log(error.message)
    }
}

export const getAllPosts = () => async(dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/posts`);
        dispatch( { type: GETALL_POSTS, payload: res.data })
    } catch (error) {
        console.log("Hello", error.message)
    }
}

export const getPost = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/posts/${id}`);
        dispatch( { type: GET_POST, payload: res.data })
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${API_URL}/posts/${id}`);
        dispatch( { type: DELETE_POST, payload: res.data })
    } catch (error) {
        console.log(error.message)
    }
}