const formatDate = (date: string | number): string => {
  const newDate = new Date(date)

  const opt = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }
  return newDate.toLocaleDateString("es-ES", opt)
}

export default formatDate
