export function getScope(scopeParam: string) {
  switch (scopeParam) {
    case "exam1":
      return [1, 22];
    case "exam2":
      return [23, 44];
    case "exam3":
      return [45, 66];
    default:
      return [1, 66];
  }
}
