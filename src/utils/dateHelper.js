export const formatDate = (dateString) => {
  if (!dateString) {
    return;
  }
  if (isNaN(Date.parse(dateString))) {
    return;
  }

  const date = new Date(dateString);
  const monthNames = ["Ja", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return month  + '\n'+ day  + ', ' + year;
}

export const formatDateShort = (dateString) => {
  if (!dateString) {
    return;
  }
  if (isNaN(Date.parse(dateString))) {
    return;
  }

  const date = new Date(dateString);
  const monthNames = ["Ja", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return month  + ' ' + year;
}