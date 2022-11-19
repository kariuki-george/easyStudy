import { isError, isSuccess } from "./common";
import supabase from "./supa.config";

/**
 * Create a new unit
 *
 *
 */

export const createUnit = async (name) => {
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
export const createContent = async (name, file, fileType, unitId) => {
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

export const uploadUnitContent = async (file, fileName, unitId, type) => {
  try {
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
      console.log(data);
      return await createContent(
        fileName,
        "https://xkpgmcvsevpwzhzkafwc.supabase.co/storage/v1/object/public/content/" +
          data.path,
        type,
        unitId
      );
    }
  } catch (error) {
    return isError(error);
  }
};
