import { analyzeSource }
  from "./analyzer.js";

import { toXml }
  from "./formats/xml.js";

import { toJson }
  from "./formats/json.js";

import { toIni }
  from "./formats/ini.js";

import { toDat }
  from "./formats/dat.js";

import {
  toKeyValue,
  raw
} from "./formats/raw.js";


export async function convertFiles(
  files,
  format,
  pretty = true
) {

  const contents =
    await Promise.all(
      files.map(
        file => file.text()
      )
    );


  const source =
    contents.join(
      "\n\n"
    );


  const model = {

    version: "1.0",

    sources:
      files.map(
        file => file.name
      ),

    data:
      analyzeSource(source)

  };


  switch (format) {

    case "xml":
      return toXml(model);

    case "json":
      return toJson(
        model,
        pretty
      );

    case "ini":
      return toIni(model);

    case "dat":
      return toDat(model);

    case "cfg":
      return toKeyValue(
        model,
        "="
      );

    case "conf":
      return toKeyValue(
        model,
        "="
      );

    case "raw":
      return raw(source);

    default:
      return source;

  }

}