/*
 **************using Async Wait amd promises****************
 */
const superagent = require("superagent");
const fs = require("fs");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File Not Found...");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Oops File Not Written ...");
      resolve("SuccessFully Written");
    });
  });
};

const getDogPics = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images`
    );
    const msg = await writeFilePro(`${__dirname}/dog.txt`, res.body.message[0]);
    console.log("HUrrayyyyy", msg);
  } catch (error) {
    console.log("+++++++++++++++", error);
  }
};

getDogPics();
