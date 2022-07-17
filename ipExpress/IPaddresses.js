import axios from "axios";
import fs from "fs";

function int2ip(ipInt) {
  return (
    (ipInt >>> 24) +
    "." +
    ((ipInt >> 16) & 255) +
    "." +
    ((ipInt >> 8) & 255) +
    "." +
    (ipInt & 255)
  );
}

function ip2int(ip) {
  return (
    ip.split(".").reduce(function (ipInt, octet) {
      return (ipInt << 8) + parseInt(octet, 10);
    }, 0) >>> 0
  );
}

export function readCSVfile() {
  const response = fs.readFileSync(
    "/home/igor/Рабочий стол/LambdaTrainee/ipExpress/IP2LOCATION-LITE-DB1.CSV",
    "utf-8"
  );
  const responseArr = response.split("\r\n");
  const result = [];
  for (let i = 0; i < responseArr.length; i++) {
    const str = responseArr[i];
    let newStr = "";
    let flag = 0;
    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1;
      } else if (ch === '"' && flag == 1) flag = 0;
      if (ch !== '"') newStr += ch;
    }
    result.push(newStr);
  }
  return result.map((item) => item.split(","));
}

export function findLocation(ipAddressDecimal, arrayOfIPs) {
  for (let item of arrayOfIPs) {
    if (ipAddressDecimal < parseInt(item[0])) {
      return `ip ${int2ip(ipAddressDecimal)} - ${
        arrayOfIPs[arrayOfIPs.indexOf(item) - 1][3]
      }`;
    }
  }
}

export async function ipReceiver() {
  const response = await axios.get("https://ipapi.co/json/");
  const ip = response.data.ip;
  const ipDecimal = ip2int(ip);
  return ipDecimal;
}

export function getIP(request) {
  let ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;
  ip = ip.split(",")[0];
  ip = ip.split(":").slice(-1);
  return ip2int(ip[0]);
}
