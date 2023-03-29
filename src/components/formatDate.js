export function formatDate(dt) {
  const date = new Date(dt);
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear().toString();
  const hh = date.getUTCHours().toString().padStart(2, "0");
  const min = date.getUTCMinutes().toString().padStart(2, "0");
  const formated_date = `${dd}/${mm}/${yyyy} ${hh}:${min}`;

  return formated_date;
}
