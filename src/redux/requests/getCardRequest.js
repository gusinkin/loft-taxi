export const getCardRequest = async (data) => {
  return await fetch(`https://loft-taxi.glitch.me/card?token=${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
