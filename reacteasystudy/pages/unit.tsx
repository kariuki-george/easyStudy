import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllUnitContent } from "../bff/read";

/**
 *
 * On this page, we will get data from the url.
 * The unit id and unit name
 *
 */

export default function Page() {
  /**
   * UseRouter is hook by nextjs that deals with page routes.
   * We can use it to access the page's url and its params
   */
  const router = useRouter();

  /**
   * Fetch all content and sort the different types
   *
   * content has this structure:
   *  {
   * type:string
   * file: string
   * name:string
   * }
   */
  const [data, setData] = useState<
    {
      file: string;
      type: string;
      name: string;
    }[]
  >([]);

  const allUnitContent = async () => {
    const contents = await getAllUnitContent(router.query.name);
    if (contents.success) {
      if (!contents.data[0] || !contents.data[0].content) {
        return;
      }
      let unitContents: {
        file: string;
        type: string;
        name: string;
      }[] = contents.data[0].content;
      setData(
        unitContents.map((content) => ({
          file: content.file,
          type: content.type,
          name: content.name,
        }))
      );
    }
  };

  useEffect(() => {
    allUnitContent();
  }, []);

  const list = [
    { name: "pdf", value: "application/pdf" },
    { name: "videos", value: "video/mp4" },
    // { name: "pptx", value: "application/wps-office.pptx" },
  ];

  return (
    <>
      <div className="unit-header">
        {/* router.query contains the query params  */}
        <h1 className="unit-name">{router.query.name}</h1>
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
            style={{ color: "white" }}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </span>
        </div>
      </div>
      <div className="unit-body">
        {/* <a href="#readings">
          <img
            className="pdf-icon"
            src="https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Document-256.png"
            alt=""
          />
        </a>
        <img
          className="video-icon"
          src="https://cdn2.iconfinder.com/data/icons/leto-blue-online-education/64/__book_video_tutorial_training-256.png"
          alt=""
        /> */}

        <ul>
          {list.map((listC) => (
            <li className="unit-body-body">
              <h2>{listC.name} </h2>
              <div>
                {data
                  .filter((content) => content.type === listC.value)
                  .map((content, index) => (
                    <Link
                      key={index}
                      href={`/unit-content?file=${content.file}&type=${content.type}`}
                      passHref
                      style={{
                        background: "white",
                        padding: "15px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      <span>{content.name.split(".")[0]}</span>
                    </Link>
                  ))}
              </div>
            </li>
          ))}
        </ul>

        {/* <h2 id="videos">Related Videos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", width: "100vw" }}>
          {data
            .filter((content) => content.type === "video/mp4")
            .map((content, index) => (
              <Link
                key={index}
                href={`/unit-content?file=${content.file}&type=${content.type}`}
                passHref
              >
                <span
                  style={{
                    background: "white",
                    padding: "20px",
                    width: "300px",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                >
                  {content.name}
                </span>
              </Link>
            ))}
        </div> */}
      </div>
    </>
  );
}
