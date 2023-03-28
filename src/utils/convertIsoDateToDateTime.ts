const convertIsoDateToDateTime = (date: string) => {
  const d = new Date(date);
  return d.toLocaleString().replace(',', '');
};

export default convertIsoDateToDateTime;
