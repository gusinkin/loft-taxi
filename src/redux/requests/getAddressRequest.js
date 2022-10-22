export const getAddressListRequest = async (data) => {
  return await fetch(`https://loft-taxi.glitch.me/addressList?token=${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
