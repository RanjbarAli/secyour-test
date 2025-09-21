export const useTelephone = (phone: string) => {
  return phone.slice(0,4) + ' ' + phone.slice(4,7) + ' ' + phone.slice(7)
}
