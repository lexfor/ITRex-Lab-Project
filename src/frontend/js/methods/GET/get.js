const makeGERequest = (route) => async (ID = null) => {
  try {
    const tryresult = ID
      ? await fetch(`${route}${ID}`)
      : await fetch(route);
    const result = await tryresult.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSearchingClient = makeGERequest('/api/clients/');
const getNextClient = makeGERequest('/api/clients/nextClient');

export { getSearchingClient, getNextClient };