import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UnitContent = () => {
  const router = useRouter();
  const [content, setContent] = useState<{ file: string; type: string }>({
    file: "",
    type: "",
  });

  useEffect(() => {
    setContent({
      file: router.query.file as string,
      type: router.query.type as string,
    });
  }, [router.query]);

  // Prevent react hydration mismatches
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <div>
        <div
          style={{
            display: "flex",
            backgroundColor: "black",
            justifyContent: "space-around",
          }}
        >
          <Link style={{ color: "white" }} href={"/"}>
            <span>Home </span>
          </Link>

          <Link style={{ color: "white" }} href={"/upload"}>
            <span> Upload </span>
          </Link>

          <span
            style={{ color: "white" }}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </span>
        </div>
        <object
          data={content.file}
          type={content.type}
          width="90%"
          height="90%"
          style={{ width: "99vw", height: "90vh" }}
        >
          <iframe
            src={content.file}
            width="90%"
            height="90%"
            style={{ width: "99vw", height: "90vh" }}
          >
            <div>
              Your browser does not support this file. Download it instead
              <a href={content.file}></a>.
            </div>
          </iframe>
        </object>
      </div>
    );
  }
};

export default UnitContent;
