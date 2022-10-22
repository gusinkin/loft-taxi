export const updateCardRequest = async (
  cardNumber,
  expiryDate,
  cardName,
  cvc
) => {
  return fetch(`https://loft-taxi.glitch.me/card`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cardName: cardName,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvc: cvc,
    }),
  }).then((response) => response.json());
};
