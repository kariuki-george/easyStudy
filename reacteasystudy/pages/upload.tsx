import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getAllUnits } from "../bff/read";
import { createUnit, uploadUnitContent } from "../bff/write";

/**
 * This page is for creating units, uploading
 * Have used typescript as it easy to code, less bugs and will be easier for you to read later.
 *
 * The can create a new unit or upload to an existing unit
 *
 * the upload will include and type of file
 *
 * Steps:
 * 1. Create a unit or select an existing unit
 * 2. Select file to be uploaded
 *
 *
 */

//  this is used to define a type in typescript. It works the same as interface with a minor difference.
type Unit = {
  name: string;
  id: string;
};

export default () => {
  /**Loading status
   *
   * To reuse this loading, we will add the boolean state and a message
   *
   */
  const [loading, setLoading] = useState<{
    loading: boolean;
    message: string;
  }>({ loading: false, message: "" });

  /**
   * Select a unit.
   * the selectedUnit is of type unit
   */

  const [selectedUnit, setSelectedUnit] = useState<Unit>({ id: "", name: "" });

  /*
   * Existing units.
  This is a list of units
   * 
   */
  const [exitingUnits, setExitingUnits] = useState<Unit[]>([]);
  //   Fetch all units and set/save them above
  const allUnits = async () => {
    setLoading({ loading: true, message: "Fetching all units" });
    const data = await getAllUnits();
    setLoading({ loading: false, message: "" });

    if (data.success) {
      setExitingUnits(data.data);
    }
  };

  //   Set existing units. We will make a query to supabse. Similar to what we have in home page, body component

  useEffect(() => {
    allUnits();
  }, []);

  /**
   * Create new unit
   * After creation, the unit will be added to existing units for selection.
   *
   */
  const [newUnit, setNewUnit] = useState<string>("");

  const handleSave = async () => {
    if (newUnit.length === 0) {
      alert("Please provide the unit name");
      return;
    }
    setLoading({ loading: true, message: "Creating unit" });
    const data = await createUnit(newUnit);
    setLoading({ loading: false, message: "" });
    setNewUnit("");
    // Created successfully
    if (data.success) {
      setExitingUnits((prev) => [
        ...prev,
        { id: data.data[0].id, name: data.data[0].name },
      ]);
      //   TODO: THIS CAN BE IMPROVED BY AUTOMATICALLY SELECTING THE FIELD THROUGH SEARCHING FOR THE ITEM IN THE DATA
      alert(
        "Unit created successfully. Select it from the existing units field."
      );
    }
  };

  //   hANDLE SELECT FIELD
  const handleSelectField = (id: string) => {
    const unit = exitingUnits.find((unit) => unit.id == id)!;
    setSelectedUnit(unit);
  };

  /**   Handle Upload
   *
   *
   *
   */
  const [file, setFile] = useState<any[]>([]);

  const handleUnitUpload = async () => {
    const fileToUpload = file[0];

    const type = fileToUpload.type;
    const name = fileToUpload.name;

 

    setLoading({ loading: true, message: "Uploading" });
    const data = await uploadUnitContent(
      fileToUpload,
      name,
      selectedUnit.id,
      type
    );
    setLoading({ loading: false, message: "" });

    if (data.success) {
      alert("Uploaded successfully");
      setFile([]);
    }
  };

  return (
    <div>
      <Header />

      <div className="upload">
        <div className="upload__message">
          {loading.loading && <span>{loading.message}</span>}
        </div>
        <div className="upload__create">
          <input
            type="text"
            onChange={(e) => {
              setNewUnit(e.target.value);
            }}
            placeholder="Enter new unit name"
            value={newUnit}
          />
          <button onClick={handleSave}>create unit</button>
        </div>
        <div>
          <select
            onChange={(e) => {
              handleSelectField(e.target.value);
            }}
          >
            {exitingUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        {selectedUnit?.id && (
          <>
            <div className="upload__selected">
              Selected unit: {selectedUnit.name}
            </div>

            <div className="upload__upload">
              <input
                onChange={(e: any) => {
                  setFile(e.target.files);
                }}
                type="file"
              />
              <button onClick={handleUnitUpload}>upload</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
