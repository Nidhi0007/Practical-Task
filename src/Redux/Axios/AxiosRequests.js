import Axios from "axios";

export const axiosRequestNew = Axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});
