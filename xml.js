export function toXml(model) {

  const escape =
    value =>
      String(value)
        .replace(
          /&/g,
          "&amp;"
        )
        .replace(
          /</g,
          "&lt;"
        )
        .replace(
          /"/g,
          "&quot;"
        );


  const functions =
    model.data.functions
      .map(
        name =>
          `      <Function name="${escape(name)}"/>`
      )
      .join("\n");


  const variables =
    model.data.variables
      .map(
        name =>
          `      <Variable name="${escape(name)}"/>`
      )
      .join("\n");


  const sources =
    model.sources
      .map(
        name =>
          `    <File>${escape(name)}</File>`
      )
      .join("\n");


  return `<?xml version="1.0" encoding="UTF-8"?>

<Config version="${model.version}">

  <Sources>
${sources}
  </Sources>

  <Functions>
${functions}
  </Functions>

  <Variables>
${variables}
  </Variables>

</Config>`;

}