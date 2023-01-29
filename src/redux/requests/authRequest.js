export const authRequest = async (email, password) => {
  return await fetch(`https://loft-taxi.glitch.me/auth`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => response.json());
};
