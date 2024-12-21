export const getFirstCharacter = (text: string): string => {
  return text.charAt(0).toUpperCase()
}

export const convertDateToLocal = (date: number): string => {
  const newDate = new Date(date)
  return newDate
    .toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(",", "")
    .replace(" AM", "am")
    .replace(" PM", "pm")
}
