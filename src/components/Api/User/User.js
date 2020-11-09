import api from '../../../lib/api';
import {apiFetch} from '../../../lib/api';


async function GetAllUsers() {
  const url = new URL(`${apiFetch}/api/users`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = response.json();
  return data;
}

async function RegisterUser(body){
  const response = await api.post(`/api/user`,body);
  return response;
}

async function SearchUser(id, keyword) {
  const response = await api.get(`/api/users/search/${id}/${keyword}`);
  if (response.statusText === 'OK') {
    return response;
  }
  return false;
}

export { GetAllUsers, SearchUser, RegisterUser };
