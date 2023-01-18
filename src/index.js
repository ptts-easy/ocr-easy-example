const fs = require("fs");
const path = require("path");
const Tesseract= require('tesseract.js');

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}

async function one_img2text(image_path, text_path) {

  if(fs.existsSync(image_path) == false) {
      console.log(image_path, " image file not found !!!");
      return;
  }

  const img = fs.readFileSync(image_path);

//  Tesseract.recognize(image_path, 'eng', { logger: m => console.log(m) })
    Tesseract.recognize(image_path, 'eng', { })
      .then(({ data: { text } }) => {
        fs.writeFileSync(text_path, text, 'utf8');  
        console.log(path.basename(image_path), " file convert complated !!!");
      });
}

async function all_img2text(image_dir, text_dir) {

  if(fs.existsSync(text_dir) == false) {
    fs.mkdirSync(text_dir, { recursive: true });  
  }

  let files = fs.readdirSync(image_dir);

  for(let file of files) {
    let image_path = image_dir + file;
    let text_path = text_dir + path.basename(file, path.extname(file)) + ".txt";

    await one_img2text(image_path, text_path);
  }
}

async function main() {

  await all_img2text("datasets/bmp/", "datasets/text/");
}

main();
