export const formatDate = (date: string): string => {
  const dateFormatted = new Date(date)

  const day = dateFormatted.getDate() < 10 ? `0${dateFormatted.getDate()}` : dateFormatted.getDate()
  const month = dateFormatted.getMonth() + 1 < 10 ? `0${dateFormatted.getMonth() + 1}` : dateFormatted.getMonth() + 1
  const year = dateFormatted.getFullYear()

  return `${day}/${month}/${year}`
}