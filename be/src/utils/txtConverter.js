import fs from "fs";
// import Papa from "papaparse";

const filePath = "../n/uploads/ALOG_001.txt";

export async function convertToJson() {
  try {
    const readFile = await fs.promises.readFile(filePath, "utf-16le");
    const lines = readFile.split("\n");
    const newArray = lines.map((element) => element.replace("\r", ""));
    const headers = newArray.map((element) => element.split("\t"));
    const jsonData = headers.map((row) => {
      const obj = {};
      row.forEach((value, i) => {
        const key = headers[0][i];
        obj[key] = value;
      });
      return obj;
    });
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error(error);
  }
}
