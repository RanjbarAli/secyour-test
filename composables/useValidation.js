export const useValidation = (inputs) => {
  let _this = this,
      savedInputs = {}
  const methods = {
    required: (input) => {
      return typeof input != 'undefined' && input != null && input != ''
    },
    min: (input, min) => {
      return input >= min
    },
    max: (input, max) => {
      return input <= max
    },
    min_length: (input, min) => {
      return input.length >= min
    },
    max_length: (input, max) => {
      return input.length <= max
    },
    same: (input, name) => {
      return input == savedInputs[name]
    }
  }
  const messages = {
      required: '%attr% نباید خالی باشد.',
      min: '%attr% باید بزرگتر و مساوی از %arg% باشد.',
      max: '%attr% باید کمتر و مساوی از %arg% باشد.',
      min_length: '%attr% باید حداقل %arg% کاراکتر باشد.',
      max_length: '%attr% باید حداکثر %arg% کاراکتر باشد.',
      same: '%attr% باید با %attr2% یکی باشد.'
  }
  const attributes = {
    password: 'رمز عبور',
    confirmPassword: 'تایید رمز عبور'
  }
  Object.keys(inputs).forEach(item => {
    savedInputs[item] = inputs[item].value
  })
  let failed = {};
  let validation = Object.keys(inputs).some(input => {
    const { value = '', rules = '' } = inputs[input]
    return rules.split('|').some(rule => {
      const [ruleName, args] = rule.split(':')
      if (!methods[ruleName](value, ...[args && args.split(',')])) {
        failed = { name: input, rule: ruleName, args: (args? args.split(',') : []) }
        return true
      }
      return false
    })
  })
  let message;
  if (validation) {
    message = messages[failed.rule].replace('%attr%', attributes[failed.name])
    failed.args.forEach((arg, index) => {
      let src = index == 0? '%arg%' : `%arg${index+1}%`
      message = message.replace(src, arg).replace(`%attr${index + 2}%`, attributes[arg])
    })
  }
  return {
    fails: () => validation,
    ...(validation && message && message.length > 0 && { message })
  }
}