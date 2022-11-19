import {  getAllUnits } from "./read.js";
import { createUnit, uploadUnitContent } from "./write.js";

const formatter = async (testType, testNumber, data) => {
  console.log(
    `${testType + " test " + testNumber}:\n`,
    JSON.stringify(await data),
    "\n\n"
  );
};

(async () => {
  // Read operation tests

  // test 1. Get all units

  formatter("Read", 1, getAllUnits());

  // test 2. Get all videos from a unit by unit name

  // formatter("Read", 2, getAllVideosFromAUnit("programmingparadigms", "pptx"));

  // test3: Get all videos from a unit by unit name

  // formatter("Read", 3, getAllVideosFromAUnit("programmingparadigms", "text"));

  //  Write operations

  //   console.log(
  //     "Write test 1: \n",
  //     await createUnit("multimedia" + Date.now().toString())
  //   );

  //   Upload a file
  //  const file = await fs.readFileSync("./Lecture 6.pptx");

  //   console.log(await uploadUnitContent(file, "lecture6.pptx", 1));
})();
