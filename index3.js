/*
 **************using Async Wait amd promises and returning values from async functions****************
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
    throw error; // takes care of return not executing if any error comes to picture
  }

  return "Take It Genius ";
};

console.log("first");
// const x = getDogPics();
// console.log(x);

// getDogPics()
//   .then((data) => {
//     console.log("+++++", data);
//   })
//   .catch((err) => console.log("-------", err));

// console.log("third");

// using same async await strategy for calling get Dog Pics as well
(async () => {
  try {
    const x = await getDogPics();
    console.log(x);
  } catch (error) {
    console.log("-------", error);
  }
})();
