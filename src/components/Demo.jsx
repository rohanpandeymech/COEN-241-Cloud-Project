import React, { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    text: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [inputMode, setInputMode] = useState("url"); // To toggle between URL and Text input


  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // To use URL or text for summary
    const payload = inputMode == "url" ? { articleUrl: article.url} : { articleText: article.text};
    const { data } = await getSummary(payload);
    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };
      // Use URL or first 50 characters of text as a unique identifier
      const uniqueIdentifier = inputMode === "url" ? article.url : article.text.substring(0, 50);
      const articleExists = allArticles.some(
        (item) => item.url === uniqueIdentifier || item.text?.substring(0, 50) === uniqueIdentifier
      );
      if (!articleExists) {
        const updatedArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedArticles);

        localStorage.setItem("articles", JSON.stringify(updatedArticles));
      }
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex justify-between items-center mb-4">
        <span>Input Mode: {inputMode === "url" ? "URL" : "Text"}</span>
        <button
          onClick={() => {
            setInputMode(inputMode === "url" ? "text" : "url");
            setArticle(prevState => ({
              ...prevState,
              url: "",
              text: "",
              // Optionally reset summary as well
            }));
          }}
          className="toggle_btn" // Style this button accordingly
        >
          Toggle to {inputMode === "url" ? "Text" : "URL"}
        </button>
      </div>
      <div className="flex flex-col w-full gap-2">
        <form className="flex justify-center items-center" onSubmit={handleSubmit}>
          {inputMode === "url" && (
            <img src={linkIcon} alt="link icon" className="link-icon" />
          )}
          {inputMode === "url" ? (
            <input
              type="url"
              placeholder="Enter a URL"
              value={article.url}
              onChange={(e) =>
                setArticle({
                  ...article,
                  url: e.target.value,
                })
              }
              required
              className="input-field" // Adjust padding to accommodate icon
              style={{ paddingLeft: '2rem' }} // Adjust this value based on the size of your icon
            />
          ) : (
            <textarea
              placeholder="Enter text here (Max 1000 words) :)"
              value={article.text}
              onChange={(e) =>
                setArticle({
                  ...article,
                  text: e.target.value,
                })
              }
              maxLength={1000} // Limit input to 1000 characters
              required
              className="text_input peer"
              style={{ 
                minHeight: '20vh',
                maxHeight: '50vh', 
                width: '100%', 
                resize: 'vertical' }} // Inline styling for textarea
            ></textarea>
          )}
          <button
            type="submit"
            className="search-button"
          > 
            🔍
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => {
                setArticle(item);
                setArticle(prevState => ({
                  ...prevState,
                  url: "",
                  text: "",
                  // Optionally reset summary as well
                }));
              }}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 text-sm truncated font-medium">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loader"
            className=" w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Something went Wrong....
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 ">
              <h2 className="font-satoshi font-bold text-gray-600">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box font-inter font-medium text-sm ">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
              <span className="blue_gradient">{article.url}</span>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
