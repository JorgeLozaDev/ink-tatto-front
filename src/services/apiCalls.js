import axios from "axios";

const URL = "http://localhost:3000/";

export const loginUser = async (endpoint, data) => {
  const login = await axios.post(`${URL}${endpoint}`, data);
  return login;
};

export const insertUser = async (endpoint, data) => {
  const inUser = await axios.post(`${URL}${endpoint}`, data);
  return inUser;
};

export const profileUser = async (endpoint, token) => {
  const dataUser = await axios.get(`${URL}${endpoint}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return dataUser;
};
export const getMeetings = async (endpoint, token) => {
  const mettingsUser = await axios.get(`${URL}${endpoint}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return mettingsUser;
};

export const updateProfile = async (endpoint, token, data) => {
  const info = {
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    username: data.username,
    birthday: data.birthday,
  };
  // console.log(info)
  const headers = {
    Authorization: "Bearer " + token,
  };

  const updateUser = await axios.put(`${URL}${endpoint}`, info, { headers });
  return updateUser;
};

export const checkArtistAvaiabilityDates = async (endpoint, token, data) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };

  const availability = await axios.post(`${URL}${endpoint}`, data, { headers });
  return availability;
};

export const allArtistActives = async (endpoint, token) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };

  const artist = await axios.get(`${URL}${endpoint}`, { headers });
  return artist;
};

export const createMetting = async (endpoint, token, data) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const metting = await axios.post(`${URL}${endpoint}`, data, { headers });
  return metting;
};
