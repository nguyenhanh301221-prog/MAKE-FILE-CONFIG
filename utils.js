export function formatBytes(bytes) {

  if (bytes < 1024) {

    return bytes + " B";

  }


  if (bytes < 1048576) {

    return (
      bytes / 1024
    ).toFixed(1) + " KB";

  }


  return (
    bytes / 1048576
  ).toFixed(1) + " MB";

}


export function downloadText(
  text,
  name
) {

  const blob =
    new Blob(
      [text],
      {
        type:
          "text/plain;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const a =
    document.createElement(
      "a"
    );


  a.href = url;

  a.download = name;

  document.body.appendChild(a);

  a.click();

  a.remove();


  URL.revokeObjectURL(
    url
  );

}