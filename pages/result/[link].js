import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { HeadComponent } from "../../components/Head";
import { AdsenseComplete } from "../../components/Adsense/AdsenseComplete";
import { useRouter } from "next/router";
import { Share } from "../../components/Share";
import { TestList } from "../../components/TestList";

export default function Result() {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [resultItem, setResultItem] = useState(null);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  useEffect(() => {
    const { jsonItem } = router.query;
    const item = jsonItem !== undefined ? JSON.parse(jsonItem) : "";
    const link = location.pathname.split("/result/")[1];
    const localName = localStorage.getItem("f5game-test-name");
    if (jsonItem === undefined) {
      alert("올바르지 않은 경로입니다.");
      location.href = `/start/${link}`;
    } else {
      const result = localStorage.getItem("f5game-test-result")
        ? JSON.parse(localStorage.getItem("f5game-test-result"))
        : "";
      const totalCount = localStorage.getItem("f5game-test-total")
        ? localStorage.getItem("f5game-test-total")
        : 0;
      if (result === "") {
        location.href = `/start/${link}`;
      }
      setItem(item);
      setResultItem(result);

      const contentTotalCount = item.contents.length;
      const score = Math.ceil((totalCount * 100) / contentTotalCount);
      setTotal(score);

      setName(localName);
    }
  }, []);

  return (
    <>
      {item ? <HeadComponent item={item} /> : ""}
      <main className="test-main">
        <Layout className="test-layout">
          {resultItem ? (
            <React.Fragment>
              <h1 className="px-2 pt-4 pb-4 text-2xl font-bold text-center">
                {name}님 결과분석
              </h1>
              <AdsenseComplete />
              {/* <img className="test-play-img" src={resultItem.url} alt="logo" /> */}
              <div className="px-2 pt-4 text-2xl">
                테스트 점수{" "}
                <span className="text-blue-600 font-bold">{total}</span>점
              </div>

              <div className="test-result-text">
                {resultItem.text.split("<br />").map((line, key) => {
                  return (
                    <React.Fragment key={key}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                })}
              </div>
              <Share item={item} />

              <h2 className="px-2 text-xl font-bold">
                👉 다른 테스트 하러가기
              </h2>
              <TestList />
            </React.Fragment>
          ) : (
            "결과 가져오는 중..."
          )}
        </Layout>
      </main>
    </>
  );
}