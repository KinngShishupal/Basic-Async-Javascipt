/*
 **************
 using Async Wait amd promises 
 and returning values from async functions
 and returning multiple promises
 ****************
 */

//  say we want to call dog api multiple time but putting await in front of every call
// will unneccesarily block increment our waiting time
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
    // const resPro1 = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images`
    // );
    // const resPro2 = await superagent.get(
    //     `https://dog.ceo/api/breed/${data}/images`
    //   );

    //   const resPro3 = await superagent.get(
    //     `https://dog.ceo/api/breed/${data}/images`
    //   );

    const resPro1 = superagent.get(`https://dog.ceo/api/breed/${data}/images`);
    const resPro2 = superagent.get(`https://dog.ceo/api/breed/${data}/images`);

    const resPro3 = superagent.get(`https://dog.ceo/api/breed/${data}/images`);

    const all = await Promise.all([resPro1, resPro2, resPro3]);
    const imgs = all.map((img) => {
      return img.body.message[0];
    });

    console.log("***********", imgs);
    const msg = await writeFilePro(`${__dirname}/dog.txt`, imgs.join("\n"));
    console.log("HUrrayyyyy", msg);
  } catch (error) {
    console.log("+++++++++++++++", error);
    throw error; // takes care of return not executing if any error comes to picture
  }

  return "Take It Genius ";
};

console.log("first");
(async () => {
  try {
    const x = await getDogPics();
    console.log(x);
  } catch (error) {
    console.log("-------", error);
  }
})();
