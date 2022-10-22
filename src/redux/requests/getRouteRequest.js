export const getRouteRequest = async (data) => {
  return await fetch(
    `https://loft-taxi.glitch.me/route?address1=${data.address1}&address2=${data.address2}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json());
};
