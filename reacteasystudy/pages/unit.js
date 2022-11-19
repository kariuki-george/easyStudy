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
  const [videos, setVideos] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [pptx, setPptx] = useState([]);
  const [word, setWord] = useState([]);

  const allUnitContent = async () => {
    const data = await getAllUnitContent(router.query.name, "");
    if (data.success) {
      // Sort
      data.data.forEach((content) => {
        content.type === "video/mp4" && setVideos([...videos, content]);
        content.type === "application/pdf" && setPdf([...pptx, content]);
        content.type === "application/wps-office.docx" &&
          setWord([...word, content]);
      });
    }
  };

  useEffect(() => {
    allUnitContent();
  }, []);

  return (
    <>
      <div className="unit-header">
        {/* router.query contains the query params  */}
        <h1 className="unit-name">{router.query.name}</h1>
      </div>
      <div className="unit-body">
        <a href="#readings">
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
        />
        <h2 id="readings">Reading Materials</h2>
        <img
          src="https://xkpgmcvsevpwzhzkafwc.supabase.co/storage/v1/object/public/content/image/png/Screenshot%20from%202022-03-23%2020-30-40.png"
          alt=""
        />
        <video width="320" height="240" autoPlay={true} controls={true}>
          <source
            src="https://xkpgmcvsevpwzhzkafwc.supabase.co/storage/v2/object/public/content/video/mp4/test.mp4"
            type="video/mp4"
          />
          <p>Your browser doesn't support HTML video. Here is a</p>
        </video>
        <h2 id="videos">Related Videos</h2>
      </div>
    </>
  );
}
