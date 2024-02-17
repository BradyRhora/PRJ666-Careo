const userAuth = require('./authenticate.js');

// retrieves all user data
export async function getUserData() {
  const res = await fetch('/api/user/getuser', {
    method: 'GET',
    headers: {
      Authorization: `JWT ${userAuth.getToken()}`,
    },
  });

  console.log(res.body);

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return {};
  }
}

// TODO: Add functions as needed to get cart, etc.