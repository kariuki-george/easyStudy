const { isError, isSuccess } = require("./common");
const { supabase } = require("./supa.config");

/**
 * Create a new unit
 *
 *
 */

const createUnit = async (name) => {
  try {
    const { data, error } = await supabase
      .from("units")
      .insert({ name })
      .select();

    if (data) {
      return isSuccess(data);
    }
    if (isError) {
      return isError(error);
    }
  } catch (error) {
    isError(error);
  }
};

/**
 *
 * Create a unitContent
 */
const createContent = async (name, file, fileType, unitId) => {
  try {
    const { data, error } = await supabase
      .from("content")
      .insert({ name, file, type: fileType, unit: unitId })
      .select();

    if (data) {
      return isSuccess(data);
    }
    if (isError) {
      return isError(error);
    }
  } catch (error) {
    isError(error);
  }
};

/**
 * Upload unit content
 */

const uploadUnitContent = async (file, fileName, unitId) => {
  try {
    const type = fileName.split(".")[1];
    const { data, error } = await supabase.storage
      .from("content")
      .upload(type + "/" + fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return isError(error);
    }

    if (data) {
      return await createContent(fileName, data.path, type, unitId);
    }
  } catch (error) {
    return isError(error);
  }
};

module.exports = { createUnit, uploadUnitContent };
