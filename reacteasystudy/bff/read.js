import supabase from "./supa.config";
import { isError, isSuccess } from "./common";

/**
 * Fetches all units and returns a list of units
 * If successful, returns an object with success status and data
 * If an error, returns an object with success status and error
 *
 */
export const getAllUnits = async () => {
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
export const getAllUnitContent = async (name, type) => {
  try {
    const { data, error } = await supabase
      .from("units")
      .select("name,content(name, file,type)")
      .eq("name", name);

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
