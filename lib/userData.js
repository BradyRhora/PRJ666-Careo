// retrieves all user data
export async function getUserData() {
  const res = await fetch('/api/user/getuser', {
    method: 'GET',
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return {};
  }
}

// TODO: Add functions as needed to get cart, etc.