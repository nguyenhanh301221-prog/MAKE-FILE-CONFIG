import { analyzeFiles } from "./analyzer.js";
import { convertFiles } from "./converter.js";
import {
  downloadText,
  formatBytes
} from "./utils.js";


const $ = id =>
  document.getElementById(id);


const input =
  $("fileInput");

const drop =
  $("dropZone");

const list =
  $("fileList");

const analysis =
  $("analysis");

const format =
  $("format");

const preview =
  $("preview");

const convertBtn =
  $("convertBtn");

const downloadBtn =
  $("downloadBtn");

const status =
  $("status");

const pretty =
  $("pretty");

const themeBtn =
  $("themeBtn");


let files = [];

let result = "";

let outputName =
  "converted_config";


/*
 * FILE INPUT
 */

input.addEventListener(
  "change",
  event => {

    loadFiles(
      [...event.target.files]
    );

  }
);


/*
 * DRAG & DROP
 */

[
  "dragover",
  "dragenter"
].forEach(type => {

  drop.addEventListener(
    type,
    event => {

      event.preventDefault();

      drop.classList.add("over");

    }
  );

});


[
  "dragleave",
  "drop"
].forEach(type => {

  drop.addEventListener(
    type,
    event => {

      event.preventDefault();

      drop.classList.remove("over");

    }
  );

});


drop.addEventListener(
  "drop",
  event => {

    loadFiles(
      [...event.dataTransfer.files]
    );

  }
);


/*
 * LOAD FILES
 */

async function loadFiles(selected) {

  files = selected;

  list.innerHTML =
    files
      .map(file => `

        <div class="file-item">

          <span>
            ${escapeHtml(file.name)}
          </span>

          <span>
            ${formatBytes(file.size)}
          </span>

        </div>

      `)
      .join("");


  if (!files.length) {

    analysis.className =
      "analysis empty";

    analysis.textContent =
      "Chưa có source.";

    return;

  }


  analysis.className =
    "analysis";


  const data =
    await analyzeFiles(files);


  analysis.innerHTML = `

    <div class="metric">

      <div>
        <b>${data.files}</b>
        <span>FILES</span>
      </div>

      <div>
        <b>${data.functions}</b>
        <span>FUNCTIONS</span>
      </div>

      <div>
        <b>${data.variables}</b>
        <span>VARIABLES</span>
      </div>

    </div>

    ${
      data.items
        .map(item => `

          <div>

            <b>
              ${escapeHtml(item.name)}
            </b>

            · ${item.extension || "unknown"}

            · ${item.bytes} bytes

          </div>

        `)
        .join("")
    }

  `;


  status.textContent =
    `Loaded ${files.length} file(s).`;

}


/*
 * CONVERT
 */

convertBtn.addEventListener(
  "click",
  async () => {

    if (!files.length) {

      status.textContent =
        "Hãy thêm file trước.";

      return;

    }


    result =
      await convertFiles(
        files,
        format.value,
        pretty.checked
      );


    preview.value =
      result;


    outputName =
      baseName(
        files[0].name
      ) +
      "." +
      format.value;


    downloadBtn.disabled =
      false;


    status.textContent =
      `Converted → ${outputName}`;

  }
);


/*
 * DOWNLOAD
 */

downloadBtn.addEventListener(
  "click",
  () => {

    downloadText(
      result,
      outputName
    );

  }
);


/*
 * THEME
 */

themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "light"
    );

  }
);


/*
 * HELPERS
 */

function baseName(name) {

  return (
    name.replace(
      /\.[^.]+$/,
      ""
    ) ||
    "converted_config"
  );

}


function escapeHtml(value) {

  return value.replace(
    /[&<>"']/g,
    char => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    }[char])
  );

}