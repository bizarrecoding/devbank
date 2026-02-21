export const isFuture = (date: string) => {
  if(!date) return false;
  const today = new Date();
  const offset = today.getTimezoneOffset()
  today.setHours(0,0,0,0);
  
  const inputDate = new Date(date);
  inputDate.setHours(offset,0,0,0);
  return inputDate.getTime() >= today.getTime();
}

export const isAfterAYear = (releaseDate: string,revDate: string) => {
  if(!releaseDate || !revDate) return false;
  const release = new Date(releaseDate?.trim());
  const offset = new Date().getTimezoneOffset()/60
  
  release.setHours(offset,0,0,0);
  const followingYear = release.getFullYear();
  const nextRevision = release;
  nextRevision.setFullYear(followingYear + 1);

  const date = new Date(revDate?.trim());
  date.setHours(offset,0,0,0);
  // if set hours to (offset,0,0,0) the time should be the same for both dates
  return date.getTime() === nextRevision.getTime();
}

export const isDate = (date: string) => {
  if(!date) return false;
  const parsedDate = Date.parse(date);
  return !isNaN(parsedDate);
}