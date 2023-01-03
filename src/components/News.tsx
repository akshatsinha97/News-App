/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { Button, Tooltip } from "@mui/material";

type TArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

const articles: TArticle[] = [];

function News(props: {
  pageSize: number;
  category: string;
  country: string;
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
      let url: string = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${data.page}&pageSize=${props.pageSize}`;
      setLoading(true);
      props.setProgress(10);
      let rawData = await fetch(url);
      props.setProgress(70);
      let parsedData = await rawData.json();
      setData({
        ...data,
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
      });
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
            data.articles.map((element) => {
              return (
                <div key={element.url}>
                  <NewsItem
                    title={element.title}
                    imageUrl={element.urlToImage}
                    description={
                      element.description
                        ? element.description?.slice(0, 88) + "..."
                        : ""
                    }
                    url={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author ? element.author : "Anonymous"}
                    sourceName={element.source.name}
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
