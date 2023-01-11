import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Layout, Radio, Space } from "antd";
import { HeadComponent } from "../../components/Head";
import { AdsensePlay } from "../../components/Adsense/AdsensePlay";
import { ResultLoading } from "../../components/ResultLoading";

export default function Play({ item }) {
  const [current, setCurrent] = useState(0);
  const [testAnswer, setTestAnswer] = useState([]);
  const [isResultLoading, setIsResultLoading] = useState(false);
  const onChangeTestAnswer = (index, value) => {
    let newArr = [...testAnswer];
    newArr[index] = value;
    localStorage.setItem("f5game-test-answer", JSON.stringify(newArr));
    setTestAnswer(newArr);
  };

  const doNext = (index) => {
    if (testAnswer[index] === undefined) {
      alert("문항을 선택해 주세요");
      return;
    }
    const nextValue = current + 1;
    if (nextValue === item.contents.length) {
      setIsResultLoading(true);
    } else {
      setCurrent(nextValue);
    }
  };

  useEffect(() => {
    localStorage.setItem("f5game-test-content-type", item.type);
  }, []);

  return (
    <>
      <HeadComponent item={item} />
      <main className="test-main">
        <Layout className="test-layout">
          {isResultLoading ? (
            <ResultLoading
              item={item}
              testAnswer={testAnswer}
              slotId={item.adsenses.loading}
            />
          ) : (
            <React.Fragment>
              {item.contents[current].title.url ? (
                <div>
                  <img
                    className="test-play-img"
                    src={item.contents[current].title.url}
                    alt={item.contents[current].title.text}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="test-play-title">
                {current + 1}. {item.contents[current].title.text}
              </div>
              <Radio.Group
                onChange={(e) => onChangeTestAnswer(current, e.target.value)}
                value={testAnswer[current]}
              >
                <Space size={0} direction="vertical">
                  {item.contents[current].questions.map((question, _index) => {
                    return (
                      <Radio
                        className="test-play-radio"
                        key={`${current}-${_index}`}
                        value={_index}
                      >
                        {question.text}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
              <div className="mt-2">
                <AdsensePlay slotId={item.adsenses.play} />
              </div>
              <div className="text-center mt-2">
                <Button
                  type="primary"
                  className="btn-start"
                  onClick={() => doNext(current)}
                >
                  다음
                </Button>
              </div>
            </React.Fragment>
          )}
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
