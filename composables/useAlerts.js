
export const useHideAlert = (key) => useEvent('hide-alert', key)

export const useAlert = (key, title, message, options = {}) => useEvent('show-alert', { ...options, key, title, message, status: 'alert' })
export const useAlertError = (key, title, message, options = {}) => useEvent('show-alert', { ...options, key, title, message, status: 'error' })
export const useAlertSuccess = (key, title, message, options = {}) => useEvent('show-alert', { ...options, key, title, message, status: 'success' })
export const useAlertInfo = (key, title, message, options = {}) => useEvent('show-alert', { ...options, key, title, message, status: 'info' })
export const useAlertWarn = (key, title, message, options = {}) => useEvent('show-alert', { ...options, key, title, message, status: 'warn' })

// Compact
export const useCompactAlert = (key, message, options = {}) => useEvent('show-alert', { ...options, key, type : 'compact', message, status: 'alert' })
export const useCompactAlertError = (key, message, options = {}) => useEvent('show-alert', { ...options, key, type : 'compact', message, status: 'error' })
export const useCompactAlertSuccess = (key, message, options = {}) => useEvent('show-alert', { ...options, key, type : 'compact', message, status: 'success' })
export const useCompactAlertInfo = (key, message, options = {}) => useEvent('show-alert', { ...options, key, type : 'compact', message, status: 'info' })
export const useCompactAlertWarn = (key, message, options = {}) => useEvent('show-alert', { ...options, key, type : 'compact', message, status: 'warn' })





