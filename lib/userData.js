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

export async function setProfileData(profile) {
  const res = await fetch('/api/user/setprofile', {
    method: 'POST',
    body: JSON.stringify({ 'profile': profile}),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}

// TODO: Add functions as needed to get cart, etc.