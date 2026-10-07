export async function analyzeFiles(files) {

  const items = [];

  let functions = 0;
  let variables = 0;


  for (const file of files) {

    const text =
      await file.text();


    const f =
      findFunctions(text);

    const v =
      findVariables(text);


    functions += f.length;

    variables += v.length;


    items.push({

      name: file.name,

      extension:
        ext(file.name),

      bytes:
        file.size,

      functions: f,

      variables: v

    });

  }


  return {

    files:
      files.length,

    functions,

    variables,

    items

  };

}


export function analyzeSource(source) {

  return {

    source_length:
      source.length,

    functions:
      findFunctions(source),

    variables:
      findVariables(source)

  };

}


/*
 * FUNCTION DETECTION
 */

function findFunctions(source) {

  const result = [];

  const regex =
    /\b(?:void|bool|int|float|double|char|string|auto)\s+([A-Za-z_]\w*)\s*\(/g;


  let match;


  while (
    (match = regex.exec(source))
  ) {

    if (
      !result.includes(
        match[1]
      )
    ) {

      result.push(
        match[1]
      );

    }

  }


  return result;

}


/*
 * VARIABLE DETECTION
 */

function findVariables(source) {

  const result = [];

  const regex =
    /\b(?:int|float|double|bool|char|string)\s+([A-Za-z_]\w*)\s*(?:=|;)/g;


  let match;


  while (
    (match = regex.exec(source))
  ) {

    if (
      !result.includes(
        match[1]
      )
    ) {

      result.push(
        match[1]
      );

    }

  }


  return result;

}


/*
 * EXTENSION
 */

function ext(name) {

  const index =
    name.lastIndexOf(".");


  if (index < 0) {

    return "";

  }


  return name
    .slice(index + 1)
    .toLowerCase();

}