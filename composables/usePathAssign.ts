export const usePathAssign = (base : string, additional : string) => {
  return base.endsWith('/') ? `${base}${additional}` : `${base}/${additional}`
}
