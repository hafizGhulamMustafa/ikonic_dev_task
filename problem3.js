const fs = require("fs");
const path = require("path");

const filesWithExtension = async (directoryPath, fileExtension) => {
  try {
    const files = fs.readdirSync(directoryPath);

    const filteredFiles = files.filter((file) =>
      file.endsWith(`.${fileExtension}`)
    );
    return filteredFiles;
  } catch (error) {
    console.error("Error reading directory:", error.message);
    throw new Error("Error listing files with extension");
  }
};

const directoryPath = "./dumyDirectory";
const fileExtension = "txt";

try {
  const files_with_extension = filesWithExtension(directoryPath, fileExtension);
  console.log(`Files with .${fileExtension} extension:`, files_with_extension);
} catch (error) {
  console.error("Error:", error.message);
}
