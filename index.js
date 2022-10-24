// using callbacks

// const superagent = require("superagent");
// const fs = require("fs");
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images`)
//     .then((res) => {
//       console.log("res_____________", res.body.message);

//       fs.writeFile(
//         `${__dirname}/dog.txt`,
//         res.body.message[0],

//         (err) => {
//           console.log("error 404============", err);
//         }
//       );
//     })
//     .catch((err) => console.log("+++++++++++++++", err));
// });

/*************************
 **************using promise******************
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

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images`);
  })
  .then((res) => {
    return writeFilePro(`${__dirname}/dog.txt`, res.body.message[0]);
  })
  .then((msg) => console.log("HUrrayyyyy", msg))
  .catch((err) => console.log("+++++++++++++++", err));

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {

// });
