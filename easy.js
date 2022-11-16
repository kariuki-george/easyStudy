/**
 * Upload
 */

const { uploadUnitContent } = require("./bff/write");

const inputFieldFunc = async (e) => {
  const file = e.target.files[0];
  const type = file.type;

  uploadUnitContent(file, "testTest", "test", type);
};
