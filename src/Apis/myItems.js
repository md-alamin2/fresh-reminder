export const myItemsPromise = (email) => {
  return fetch(`http://localhost:3000/foods?email=${email}`).then((res) =>
    res.json()
  );
};
