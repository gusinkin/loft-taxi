export const regRequest = async (email, password, name, surname) => {
  return fetch(`https://loft-taxi.glitch.me/register`, {
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
  })
    .then((responce) => responce.json())
    .then((data) => data.success);
};
