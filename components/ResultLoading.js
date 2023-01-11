import React, { useState, useEffect } from "react";
import { Spin, Button } from "antd";
import Link from "next/link";
import { AdsenseLoading } from "./Adsense/AdsenseLoading";

export const ResultLoading = ({ item, testAnswer, slotId }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (testAnswer.length === 0) {
      alert("올바르지 않은 경로입니다.");
      location.href = item.link ? `/start/${item.link}` : "/";
    }
    let totalCount = 0;

    if (item.contents.length > 0) {
      for (const i in item.contents) {
        if (item.contents[i].answer === testAnswer[i]) {
          totalCount++;
        }
      }

      let results = null;
      for (const i in item.results) {
        if (
          item.results[i].min <= totalCount &&
          totalCount <= item.results[i].max
        ) {
          results = item.results[i];
          localStorage.setItem(
            "f5game-test-result",
            JSON.stringify({ ...results, totalCount })
          );
        }
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-8">
        {isLoading ? "결과를 기다리고 있습니다." : "결과를 확인해 주세요"}
      </h1>
      {isLoading ? (
        <div className="text-center pt-4 mb-2">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <AdsenseLoading slotId={slotId} />
      {isLoading ? (
        ""
      ) : (
        <div className="text-center">
          <Link
            href={{
              pathname: `/result/${item.link}`,
              query: { jsonItem: JSON.stringify(item) },
            }}
            as={`/result/${item.link}`}
          >
            <Button
              className="my-2"
              style={{ width: 336 }}
              type="primary"
              size="large"
            >
              확인하기
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};
