export const myItemsPromise = (email, accessToken) => {
  return fetch(`http://localhost:3000/food?email=${email}`, {
    headers:{
      authorization:`Bearer ${accessToken}`
    }
  }).then((res) =>
    res.json()
  );
};
