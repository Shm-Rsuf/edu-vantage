export function dateFormate(date) {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formatedDate;
}
