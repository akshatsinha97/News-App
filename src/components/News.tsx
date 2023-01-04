/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { Button, Tooltip } from "@mui/material";

const articles: any = [];

function News(props: {
  pageSize: number;
  category: string;
  lang: string;
  apikey: string;
  setProgress: any;
}) {
  const [data, setData] = useState({
    articles: articles,
    page: 1,
    totalResults: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      let url: string = `https://api.newscatcherapi.com/v2/latest_headlines?topic=${props.category}&lang=${props.lang}&page_size=${props.pageSize}`;
      setLoading(true);
      props.setProgress(10);
      let rawData = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": props.apikey,
        },
      });
      props.setProgress(70);
      let parsedData = await rawData.json();
      if (parsedData) {
        setData({
          ...data,
          articles: parsedData.articles,
          totalResults: parsedData.total_pages,
        });
      } else {
      }
      setLoading(false);
      props.setProgress(100);
      document.title = `InShorts - ${capitalize(props.category)}`;
    }
    fetchAPI();
  }, [data.page, props.category]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase().concat(props.category.slice(1));
  };

  const handlePreviousClick = async () => {
    setData({
      ...data,
      page: data.page - 1,
    });
  };

  const handleNextClick = async () => {
    if (!(data.page + 1 > Math.ceil(data.totalResults / props.pageSize))) {
      setData({
        ...data,
        page: data.page + 1,
      });
    }
  };

  return (
    <>
      <div>
        <div className="text-center text-xl my-4">
          InShorts - Top <strong>{capitalize(props.category)} </strong>
          Headlines
        </div>
        <div className="grid grid-cols-3 place-items-center  gap-4 my-8">
          {loading && <div>Loading...</div>}
          {!loading &&
            data.articles.map((element: any) => {
              return (
                <div key={element.link}>
                  <NewsItem
                    title={element.title}
                    imageUrl={element.media}
                    description={
                      element.excerpt
                        ? element.excerpt?.slice(0, 88) + "..."
                        : ""
                    }
                    url={element.link}
                    publishedAt={element.published_date}
                    author={element.author ? element.author : "Anonymous"}
                    sourceName={element.rights}
                  />
                </div>
              );
            })}
        </div>
        <div className="grid grid-cols-2 gap-4 place-items-center my-8">
          <Tooltip title="Previous">
            <Button
              variant="outlined"
              disabled={data.page <= 1}
              onClick={handlePreviousClick}
              href="#contained-buttons"
            >
              Previous
            </Button>
          </Tooltip>
          <Tooltip title="Next">
            <Button
              variant="outlined"
              disabled={
                data.page + 1 > Math.ceil(data.totalResults / props.pageSize)
              }
              onClick={handleNextClick}
              href="#contained-buttons"
            >
              Next
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default News;
