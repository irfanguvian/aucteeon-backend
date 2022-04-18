const fs = require("fs");
const dayjs = require("dayjs");
const mime = require("mime");

async function imageUpload(file, index = 0, imgType = "img") {
  const remotePath = `${process.env.IMAGE_SERVER_ADDRESS}/assets/images/`;

  const _uploadFilesDirectory = `${process.env.STORAGE_PUBLIC}/images/`;
  if (!fs.existsSync(_uploadFilesDirectory)) {
    fs.mkdirSync(_uploadFilesDirectory);
  }
  const matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    throw new Error("Data Images Tidak Sesuai");
  }
  let date;

  if (index) {
    date = dayjs().add(+index, "second").format("YYYYMMDDHHmmss");
  } else {
    date = dayjs().format("YYYYMMDDHHmmss");
  }
  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");
  const decodedImg = response;
  const imageBuffer = decodedImg.data;
  const type = decodedImg.type;
  const extension = mime.extension(type);
  const fileName = `${imgType}-${date}.${extension}`;
  const urlPath = remotePath + fileName;
  try {
    const filePath = `${_uploadFilesDirectory}${fileName}`; // solved sesuain aja
    fs.writeFileSync(filePath, imageBuffer, "utf8");
    return urlPath;
  } catch (e) {
    throw new Error(`Image Tidak Ditemukan atau ${e.message}`);
  }
}

module.exports = imageUpload;
