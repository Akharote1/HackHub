export const extractProps = (source, props) => {
  if (source == null) return null

  const dest = {}
  
  for (let key in source) {
    if (props.includes(key)) dest[key] = source[key]
  }

  return dest
}

export const copyPropsIfUpdate = (source, dest, props) => {
  for (let key in source) {
    if (props.includes(key)) dest[key] = source[key]
  }
  
  return dest
}

export const slugify = (text) => {
  return text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '') + '-' + generateSecureToken(4).toLowerCase()
}

export const generateSecureToken = (length = 10) => {
  let digits = '0123456789'
  digits += 'abcdefghijklmnopqrstuvwxyz'
  digits += 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()

  let token = ''
  for (let i = 0; i < length; i++ ) {
    token += digits[Math.floor(Math.random() * digits.length)];
  }
  return token;
}