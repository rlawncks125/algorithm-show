export const refineBy_14940 = (data: any) => {
  const input = data.toString().trim().split("\n");
  const [n, m] = input[0].split(" ").map(Number);

  const array = [];

  for (let i = 1; i < input.length; i++) {
    array.push([...input[i].replaceAll(" ", "")]);
  }

  return { n, m, array };
};
