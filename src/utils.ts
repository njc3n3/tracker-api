export const filterOutFalsies = (obj: object) => {
  return Object.entries(obj).reduce(
    (a, [k, v]) => (v ? {...a, [k]: v} : a),
    {},
  );
};
