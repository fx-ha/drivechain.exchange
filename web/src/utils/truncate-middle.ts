const truncateMiddle = (value: string) => {
  if (value.length < 8) {
    return value
  }

  const beginning = value.substring(0, 4)
  const end = value.substring(value.length, value.length - 4)

  return `${beginning}...${end}`
}

export default truncateMiddle
