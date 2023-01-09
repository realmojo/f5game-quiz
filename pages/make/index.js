import Head from "next/head";
import React, { useState } from "react";
import { Layout, Steps } from "antd";
import { Header } from "../../components/Header";
import { Step1 } from "../../components/Step1";
import { Step2 } from "../../components/Step2";
import { Step3 } from "../../components/Step3";
const { Step } = Steps;

const steps = [
  {
    title: "기본정보",
  },
  {
    title: "이미지 등록",
  },
  {
    title: "미리보기",
  },
];
const items = steps.map((item) => ({ key: item.title, title: item.title }));

export default function Make({ S3_KEY }) {
  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Head>
        <title>F5 Quiz - 모두의 퀴즈 만들기</title>
        <meta name="description" content="퀴즈 만들기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Layout className="make-layout py-8">
          <Steps current={current} items={items} />
          <div>
            {current === 0 ? (
              <Step1
                next={next}
                idx={idx}
                setIdx={setIdx}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
              />
            ) : (
              ""
            )}
            {current === 1 ? (
              <Step2 next={next} prev={prev} idx={idx} S3_KEY={S3_KEY} />
            ) : (
              ""
            )}
            {current === 2 ? <Step3 prev={prev} idx={idx} /> : ""}
          </div>
        </Layout>
      </main>
    </>
  );
}
export const getServerSideProps = async ({ req, params }) => {
  return {
    props: {
      S3_KEY: {
        ACCESS_KEY: process.env.ACCESS_KEY,
        ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
      },
    },
  };
};
