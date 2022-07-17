import fs from "fs";
const fsPromises = fs.promises;

function doRequests(dir) {
  const files = fs.readdirSync(dir);
  const filesData = files.map((item) =>
    fsPromises.readFile(`${dir}/${item}`, "utf-8")
  );
  return Promise.all(filesData);
}

async function uniqueNames() {
  const response = await doRequests("./2kk_words");
  const splited = response.map((el) => el.split("\n")).flat();
  const unique = Array.from(new Set(splited)).length;
  console.log("unique:", unique); // 129240 unique names
}

async function inEveryFile() {
  let counter = 0;
  const counts = {};
  const response = await doRequests("./2kk_words");
  const splited = response.map((el) => el.split("\n"));
  const uniqueValues = splited.map((el) => Array.from(new Set(el))).flat();
  uniqueValues.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  for (let value of Object.values(counts)) {
    if (value == 20) {
      counter += 1;
    }
  }
  console.log("In every file", counter); // 441 nicknames in every file
}

async function inAtLeastTenFiles() {
  let counter = 0;
  const counts = {};
  const response = await doRequests("./2kk_words");
  const splited = response.map((el) => el.split("\n"));
  const uniqueValues = splited.map((el) => Array.from(new Set(el))).flat();
  uniqueValues.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  for (let value of Object.values(counts)) {
    if (value >= 10) {
      counter += 1;
    }
  }
  console.log("In at least 10 files", counter); // 73245 nicknames in every file
}
