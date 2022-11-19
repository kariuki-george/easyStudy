import React, { useEffect, useState } from "react";
import { getAllUnits } from "../bff/read";
import Card from "./Card";

export default function Body() {
  /**
   * Store units in useState. It will persist the data across first refreshes.
   */
  const [units, setUnits] = useState([]);
  //   Have a loading state
  const [loading, setLoading] = useState(false);
  /**
   * Fetch all data
   */
  const allUnits = async () => {
    setLoading(true);
    const data = await getAllUnits();
    setLoading(false);
    if (data.success) {
      setUnits(data.data);
    }
  };

  /**
   * call the allunits function above on page render
   */

  useEffect(() => {
    allUnits();
  }, []);

  /**
   * map the units returned to the card components.
   *
   */

  return (
    <div className="resources">
      {loading && <div>Fetching all units</div>}
      {units.map((unit) => (
        <Card name={unit.name} id={unit.id} />
      ))}

      {/* <Card name={"Multimedia"} />

      <Card name={"Multimedia"} />
      <Card name={"Multimedia"} /> */}
    </div>
  );
}
