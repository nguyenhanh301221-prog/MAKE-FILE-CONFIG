export function toKeyValue(
  model,
  separator = "="
) {

  const output = [];


  output.push(
    `version${separator}${model.version}`
  );


  output.push(
    `source_length${separator}${model.data.source_length}`
  );


  model.data.functions
    .forEach(
      (name, index) => {

        output.push(
          `function_${index + 1}${separator}${name}`
        );

      }
    );


  model.data.variables
    .forEach(
      (name, index) => {

        output.push(
          `variable_${index + 1}${separator}${name}`
        );

      }
    );


  return output.join("\n");

}


export function raw(source) {

  return source;

}