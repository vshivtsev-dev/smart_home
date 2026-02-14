export function getTargetNumber(target: string) {
  return Number(target.split("_").pop());
}
