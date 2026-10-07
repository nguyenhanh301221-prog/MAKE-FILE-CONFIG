export function toIni(model) {

  let output = "";


  output +=
    "[Config]\n";

  output +=
    "version=" +
    model.version +
    "\n";

  output +=
    "source_length=" +
    model.data.source_length +
    "\n\n";


  output +=
    "[Sources]\n";


  model.sources.forEach(
    (name, index) => {

      output +=
        `${index + 1}=${name}\n`;

    }
  );


  output +=
    "\n[Functions]\n";


  model.data.functions.forEach(
    (name, index) => {

      output +=
        `${index + 1}=${name}\n`;

    }
  );


  output +=
    "\n[Variables]\n";


  model.data.variables.forEach(
    (name, index) => {

      output +=
        `${index + 1}=${name}\n`;

    }
  );


  return output;

}