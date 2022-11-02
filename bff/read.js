const { supabase } = require("./supa.config");
const { isError, isSuccess } = require("./common");

/**
 * Fetches all units and returns a list of units
 * If successful, returns an object with success status and data
 * If an error, returns an object with success status and error
 *
 */
const getAllUnits = async () => {
  try {
    const { data, error } = await supabase.from("units").select();
    if (data) {
      return isSuccess(data);
    }
    if (error) {
      return isError(error);
    }
  } catch (error) {
    return isError(error);
  }
};

/**
 * Fetches all content from a unit
 * If successful, returns an object with success status and data
 * If an error, returns an object with success status and error
 *
 *
 */
const getAllVideosFromAUnit = async (name, type) => {
  try {
    const { data, error } = await supabase
      .from("units")
      .select("name,content(name, file)")
      .eq("name", name)
      .eq("content.type", type);

    if (data) {
      return isSuccess(data);
    }
    if (error) {
      return isError(error);
    }
  } catch (error) {
    return isError(error);
  }
};

module.exports = { getAllUnits, getAllVideosFromAUnit };
