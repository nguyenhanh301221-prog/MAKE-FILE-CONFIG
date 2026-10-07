export function toJson(
  model,
  pretty = true
) {

  return JSON.stringify(
    model,
    null,
    pretty ? 2 : 0
  );

}