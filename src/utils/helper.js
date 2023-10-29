export const objectToArray = (data) => {
  const arr = [];

  for (const key in data) {
    const item = { name: key, x: data[key] };
    arr.push(item);
  }
  return arr;
};
