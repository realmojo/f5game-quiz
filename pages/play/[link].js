import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Divider, Input, Layout } from "antd";
import { AdsenseStart } from "../../components/Adsense/AdsenseStart";
import { HeadComponent } from "../../components/Head";

export default function Play({ item }) {
  console.log(item);

  return (
    <>
      <HeadComponent item={item} />
      {/* <div
        className="test-main-background"
        style={{
          backgroundColor: "transparent",
          backgroundImage: `url(${item.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 1024,
          width: "100%",
          position: "absolute",
        }}
      ></div> */}
      <main className="test-main">
        <Layout className="test-layout">
          {item.contents.map((test, index) => {
            return (
              <React.Fragment>
                <div key={index}>
                  <div>{test.title.text}</div>
                  <img src={test.title.url} />
                  {test.questions.map((question, _index) => {
                    return <div key={_index}>{question.text}</div>;
                  })}
                </div>
                <Divider />
              </React.Fragment>
            );
          })}
          {/* <div className="test-logo">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <AdsenseStart />
            <div className="text-center pt-2">
              <a href={`/play/${item.link}`}>
                <Button type="primary" className="btn-start">
                  시작하기
                </Button>
              </a>
            </div>
          </div> */}
        </Layout>
      </main>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const { link } = params;
  const res = await axios.get(
    `${process.env.BASE_API_URL}/test/getTestContentByLink.php?link=${link}`
  );

  return { props: { item: res.data, NODE_ENV: process.env.NODE_ENV } };
};
