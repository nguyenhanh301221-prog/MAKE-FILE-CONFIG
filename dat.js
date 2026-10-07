/*
 * MFC1 = Make File Config DAT format
 *
 * Đây là DAT schema riêng của project.
 */

export function toDat(model) {

  const payload =
    JSON.stringify(model);


  const bytes =
    new TextEncoder()
      .encode(payload);


  const hex =
    Array
      .from(bytes)
      .map(
        byte =>
          byte
            .toString(16)
            .padStart(2, "0")
      )
      .join(" ");


  return (
    "MFC1\n" +
    hex
  );

}