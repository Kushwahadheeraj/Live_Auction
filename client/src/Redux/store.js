import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
    userPosts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode == "dark" ? "light" : "dark";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFollowing: (state, action) => {
            if(state.user){
                state.user.following = action.payload.friends
            }else{
                console.error("user does not follow anyone")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setUserPosts: (state, action) => {
            state.userPosts = action.payload.userPosts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) =>{
                if(post.id === action.payload.post_id) return action.payload.post;
            });
            state.posts = updatedPosts
        }
    }
})

export const {setMode, setLogin, setLogout, setFollowing, setPosts, setPost, setUserPosts } = authSlice.actions
export default authSlice.reducer