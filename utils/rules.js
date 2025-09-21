
export const required = (a) => {
  return {
    status: a instanceof File || (a == 'boolean' || a.length),
    message:useTrans('validation.required'),
  }
}
export const email = (a) => {
  return {
    status: a.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$/),
    message:useTrans('validation.email'),
  }
}
export const url = (a) => {
  return {
    status: a.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.\S{2,}|www\.[a-zA-Z0-9]+\.\S{2,})/),
    message:useTrans('validation.url'),
  }
}
export const phone = (a) => {
  return {
    status: a.match(/^09(0[1-3,5]|1[0-9]|2[0-2]|3[0-9]|9[0-9])\d{7}$/),
    message:useTrans('validation.phone'),
  }
}
export const min = (a, min) => {
  return {
    status: a.length >= Number(min),
    message:useTrans('validation.min', { min }),
  }
}

export const max = (a, max) => {
  return {
    status: a.length <= Number(max),
    message:useTrans('validation.max', { max }),
  }
}
export const length = (a, len) => {
  return {
    status: a.length == Number(len),
    message:useTrans('validation.length', { len }),
  }
}
export const regex = (a, regex) => {
  return {
    status: a.match(new RegExp(regex)),
    message:useTrans('validation.regex'),
  }
}
export const _same = (a, sameWith, otherProps) => {
  return {
    status: a == otherProps[sameWith].data.value,
    message:useTrans('validation.same', { same: otherProps[sameWith].name }),
  }
}
export const starts = (a, str) => {
  return {
    status: a.startsWith(str),
    message:useTrans('validation.starts', { str }),
  }
}
export const ends = (a, str) => {
  return {
    status: a.endsWith(str),
    message:useTrans('validation.ends', { str }),
  }
}
export const integer = (a) => {
  return {
    status: a.match(/^\d+$/),
    message:useTrans('validation.integer'),
  }
}
export const exists = (a, ...args) => {
  args.length--
  return {
    status: args.includes(a),
    message:useTrans('validation.exists', { exists: args.join(',') }),
  }
}
export const not_exists = (a, ...args) => {
  args.length--
  return {
    status: !args.includes(a),
    message:useTrans('validation.not_exists', { exists: args.join(',') }),
  }
}
export const extensions = (a, ...args) => {
  args.length--
  return {
    status: args.includes(a?.name.split('.').pop().toLowerCase()),
    message:useTrans('validation.extensions', { extensions: args.join(',') }),
  }
}
export const mimes = (a, ...args) => {
  args.length--
  return {
    status: args.includes(a?.type),
    message:useTrans('validation.mimes', { mimes: args.join(',') }),
  }
}
export const file = (a) => {
  return {
    status: a instanceof File,
    message:useTrans('validation.file'),
  }
}
export const image = (a) => {
  return {
    status: a instanceof File && ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'].includes(a.type),
    message:useTrans('validation.image'),
  }
}
export const size = (a, operator, ...args) => {
  args.length--
  let result
  const size = a?.size / 1024
  const numArgs = args.map(Number)
  switch (operator) {
    case '=':
      result = size === numArgs[0]
      break
    case '!=':
      result = size !== numArgs[0]
      break
    case '>':
      result = size > numArgs[0]
      break
    case '>=':
      result = size >= numArgs[0]
      break
    case '<':
      result = size < numArgs[0]
      break
    case '<=':
      result = size <= numArgs[0]
      break
    case 'between':
      result = size >= numArgs[0] && size <= numArgs[1]
      break
  }
  return {
    status: result,
    message:useTrans('validation.size', { operator, args: numArgs.map(a => a + 'KB').join(', ') }),
  }
}
export const type = (a, b) => {
  return {
    status: typeof a == b,
    message:useTrans('validation.type', { type: b }),
  }
}
export const is_boolean = (a) => {
  return {
    status: typeof a == 'boolean',
    message:useTrans('validation.is_boolean'),
  }
}
export const is_true = (a) => {
  return {
    status: !!a,
    message:useTrans('validation.is_true'),
  }
}
export const terms = (a) => {
  return {
    status: !!a,
    message: useTrans('validation.terms'),
  }
}
export const is_false = (a) => {
  return {
    status: !a,
    message:useTrans('validation.is_false'),
  }
}