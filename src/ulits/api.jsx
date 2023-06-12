// import axios from "axios";

const BASE_URL = "https://dummyjson.com/users/add";

import axios from "axios";

const ApiClient = {
  login: (email, password) => {
    return axios.post(BASE_URL, { email, password });
  },
};

export default ApiClient;
