import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosRequestNew } from "../Axios/AxiosRequests";

export const addUser = createAsyncThunk("addUser", (data) => {
  const res = axiosRequestNew
    .post(`/user/createUser`, data)
    .then((res) => res.data);
  return res;
});
export const getAllUser = createAsyncThunk("getAllUser", (data) => {
  const res = axiosRequestNew
    .get(`/user/getUser?deleted=${data.deleted}`)
    .then((res) => res.data);
  return res;
});
export const editUser = createAsyncThunk("editUser", (data) => {
  const res = axiosRequestNew
    .put(`/user/editUser/${data.id}`, data)
    .then((res) => res.data);
  return res;
});
export const deleteUser = createAsyncThunk("deleteUser", (id) => {
  const res = axiosRequestNew
    .delete(`/user/deleteUser/${id}`)
    .then((res) => res.data);
  return res;
});
export const restoreUser = createAsyncThunk("restoreUser", (id) => {
  const res = axiosRequestNew
    .put(`/user/restoreUser/${id}`)
    .then((res) => res.data);
  return res;
});
export const userSlice = createSlice({
  name: "user",
  initialState: {
    addedUser: {},
    getAllUser: {},
    editUser: {},
    deleteUser: {},
    restoreUser: {},
  },
  reducers: {},

  extraReducers: {
    [addUser.fulfilled]: (state, { payload }) => {
      state.addedUser = payload;
    },
    [getAllUser.fulfilled]: (state, { payload }) => {
      state.getAllUser = payload;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.deleteUser = payload;
    },
    [restoreUser.fulfilled]: (state, { payload }) => {
      state.restoreUser = payload;
    },
  },
});
export const userData = ({ user }) => user;
export default userSlice.reducer;
