import { formatDistanceToNowStrict } from 'date-fns'

const formatDistance = (date: Date) => {
  const formatted = formatDistanceToNowStrict(date)

  if (
    ['day', 'days', 'month', 'months', 'year', 'years'].some((el) =>
      formatted.includes(el)
    )
  ) {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })
  }

  if (['year', 'years'].some((el) => formatted.includes(el))) {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return formatted
}

export default formatDistance
