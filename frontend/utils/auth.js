export const BASE_URL = 'http://api.jennatoff.students.nomoreparties.site';

export const register = (password, email) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((response) => {
    if(response.ok){
      return response.json()
    } return Promise.reject(`Error!` + response.status + response.statusText)
  })
  .then((res) => {
    return res});

export const authorize = (password, email) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((response) => {
    if(response.ok){
      return response.json()
    } return Promise.reject(`Error!` + response.status + response.statusText)
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
  });


export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})
  .then((res) => {return res.json()})
  .then((data) => {return data})
