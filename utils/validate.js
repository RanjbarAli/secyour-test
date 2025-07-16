import * as ruleHelpers from './rules.js'

export default (name, value, rules = {}) => {
    if (!['object', 'string'].includes(typeof rules)) return false
    if (typeof rules === 'string') {
        let newRule = {}
        rules.split('|').forEach(i => {
            let splitRule = i.split(':')
            newRule[splitRule[0]] = splitRule.length === 1? [] : splitRule[1].split(',')
        })
        rules = newRule
    }
    if (Object.keys(rules).includes('unload')) {
        if (value.length === 0) return ''
        delete rules.unload
    }
    let errors = null
    for (const rule of Object.keys(rules)) {
        let pipeline = ruleHelpers[rule](value, ...(typeof rules[rule] === 'object'? rules[rule] : [rules[rule]]))
        if (!pipeline.status) {
            errors = pipeline.message.replace(':attribute:', name)
            break;
        }
    }
    return errors ?? null
}