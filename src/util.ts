export function removeEmptyProperties(
  obj: Record<string, any>
): Record<string, any> {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      removeEmptyProperties(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    } else if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}
