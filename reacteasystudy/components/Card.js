import React from "react";
import Link from "next/link";



/**
 * Link tag is used in nextjs as a superior tag to a tag. 
 * Passed name and id params to the url inorder for the unit page.
 * 
 */
export default function Card({ name, id }) {
  return (
    <Link href={`/unit?id=${id}&name=${name}`} passHref>
      <div className="tab">
        <h4 className="unit">{name}</h4>
        <img
          className="arrow"
          src="https://cdn0.iconfinder.com/data/icons/aami-flat-map-pins-and-navigation/64/location-33-256.png"
          alt=""
        />
      </div>
    </Link>
  );
}
