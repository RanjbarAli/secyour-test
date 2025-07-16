export const useNumberFormat = (number : number) => {
  return new Intl.NumberFormat().format(number)
}
