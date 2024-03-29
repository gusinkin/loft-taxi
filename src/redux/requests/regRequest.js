export const regRequest = async (email, password, name, surname) => {
  return await fetch(`https://loft-taxi.glitch.me/register`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      surname: surname,
    }),
  }).then((response) => response.json());
};
