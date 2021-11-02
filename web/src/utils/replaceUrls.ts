const replaceUrls = (message: string): string => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g

  return message.replace(urlRegex, (url) => {
    let hyperlink = url

    if (!hyperlink.match('^https?://')) {
      hyperlink = 'http://' + hyperlink
    }

    return (
      '<a href="' +
      hyperlink +
      '" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">' +
      url +
      '</a>'
    )
  })
}

export default replaceUrls
