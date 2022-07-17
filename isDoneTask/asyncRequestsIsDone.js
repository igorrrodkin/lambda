import axios from "axios";

let urls = [
  "https://jsonbase.com/lambdajson_type1/793",
  "https://jsonbase.com/lambdajson_type1/955",
  "https://jsonbase.com/lambdajson_type1/231",
  "https://jsonbase.com/lambdajson_type1/931",
  "https://jsonbase.com/lambdajson_type1/93",
  "https://jsonbase.com/lambdajson_type2/342",
  "https://jsonbase.com/lambdajson_type2/770",
  "https://jsonbase.com/lambdajson_type2/491",
  "https://jsonbase.com/lambdajson_type2/281",
  "https://jsonbase.com/lambdajson_type2/718",
  "https://jsonbase.com/lambdajson_type3/310",
  "https://jsonbase.com/lambdajson_type3/806",
  "https://jsonbase.com/lambdajson_type3/469",
  "https://jsonbase.com/lambdajson_type3/258",
  "https://jsonbase.com/lambdajson_type3/516",
  "https://jsonbase.com/lambdajson_type4/79",
  "https://jsonbase.com/lambdajson_type4/706",
  "https://jsonbase.com/lambdajson_type4/521",
  "https://jsonbase.com/lambdajson_type4/350",
  "https://jsonbase.com/lambdajson_type4/64",
];

function doRequests(arrLinks) {
  const responses = arrLinks.map((item) => axios.get(item));
  return Promise.all(responses);
}

function extractValueNested(object, keyToFind) {
  if (object.hasOwnProperty(keyToFind)) {
    return object[keyToFind];
  }
  for (let value of Object.values(object)) {
    if (typeof value == "object" && !Array.isArray(value) && value !== null) {
      return extractValueNested(value, keyToFind);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item == "object" && !Array.isArray(item) && item !== null) {
          return extractValueNested(item, keyToFind);
        }
      });
    }
  }
}

async function getIsDone() {
  const res = await doRequests(urls);
  const data = res.map((item) => extractValueNested(item.data, "isDone"));
  var isDoneTrue = 0;
  var isDoneFalse = 0;
  for (let element of data) {
    if (element === true) {
      isDoneTrue += 1;
    }
    if (element === false) {
      isDoneFalse += 1;
    }
  }
  // return `True: ${isDoneTrue}\nFalse: ${isDoneFalse}`
  console.log(`True: ${isDoneTrue}\nFalse: ${isDoneFalse}`);
}

getIsDone();
