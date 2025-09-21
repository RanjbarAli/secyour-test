import faLang from '~/lang/fa.json'

export const useTrans = (key, replaces = {}) => {
  replaces = Object.entries(replaces)
  let trans = key.split('.').reduce((acc, key) => acc === ""? acc : (acc[key] ?? ""), faLang)
  if (replaces.length > 0) {
    replaces.forEach(([key, value]) => {
      trans = trans.replace(`{${key}}`, value)
    })
  }
  return trans;
}