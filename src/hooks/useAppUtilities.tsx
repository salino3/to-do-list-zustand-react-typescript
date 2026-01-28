export const useAppUtilities = () => {
  const fnPromise = (data: any) =>
    new Promise((resolve) => {
      resolve(data);
    });

  return { fnPromise };
};
