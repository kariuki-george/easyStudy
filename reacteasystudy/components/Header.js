import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
export default function Header() {
  const router = useRouter();
  return (
    <div className="header">
      <h1 className="title">EasyStudy</h1>
      <h2 className="tagline">A handy tool for any student</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <span>
          <Link style={{ color: "white" }} href={"/"}>
            Home
          </Link>
        </span>
        <span>
          <Link style={{ color: "white" }} href={"/upload"}>
            Upload
          </Link>
        </span>
        <span
          onClick={() => {
            router.back();
          }}
        >
          Back
        </span>
      </div>
    </div>
  );
}
