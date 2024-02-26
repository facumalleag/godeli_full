import axios from "axios";

export const recipesApi = axios.create()
export function setClientToken(token: string) {
    axios.defaults.headers.common = {Authorization: 'Bearer ' + token};
  }