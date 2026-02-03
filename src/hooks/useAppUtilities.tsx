export const useAppUtilities = () => {
  //
  const fnPromise = (data: any) =>
    new Promise((resolve) => {
      resolve(data);
    });

  //
  const dateConverter = (dateValue: number | null) => {
    return dateValue && new Date(dateValue ?? 0).toISOString().slice(0, 16);
  };

  return { fnPromise, dateConverter };
};
