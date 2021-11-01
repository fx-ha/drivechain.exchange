const getTopic = (hex: string) =>
  ({
    '6aa1a1a1a1': 'US Daily',
    '6aa2a2a2a2': 'Japan Daily',
  }[hex] || 'none')

export default getTopic
