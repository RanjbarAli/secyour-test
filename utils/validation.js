import * as ruleHelpers from '~/utils/rules'

export const validateEach = (isList, data, name, rules, otherProps) => {
  let validator
  if (isList && (Array.isArray(data) || data instanceof FileList)) {
    for (const val of data) {
      validator = validate(name, val, rules, otherProps)
      if (typeof validator == 'string') break
    }
  }
  else {
    validator = validate(name, data, rules, otherProps)
  }
  return validator
}

export const resolveRules = (rules) => {
  const parseRule = (rule) => {
    const [key, value] = rule.split(':')
    return { [key]: value ? value.split(',') : [] }
  }
  let customCount = 0
  return rules.reduce((acc, rule) => Object.assign(acc, typeof rule === 'function'?  {[`custom_${++customCount}`]: rule} : parseRule(rule)), {})
}

export const validate = (name, value, rules = {}, otherProps = {}) => {
  if (rules?.unload && value == '') return 1

  for (const rule of Object.keys(rules).filter(i => i != "unload")) {
    const pipeline = (typeof rules[rule] === 'function')
      ? rules[rule](value, otherProps)
      : ruleHelpers[rule](value, ...(rules[rule]), otherProps)

    if (!pipeline.status) {
      return pipeline.message.replace('{attribute}', name) || ''
    }
  }
  return 2
}