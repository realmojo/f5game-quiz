import React, { useState, useEffect } from "react";
import { InputNumber, Input, Button, Divider, Radio, Typography } from "antd";
import AWS from "aws-sdk";
import shortId from "shortid";
import axios from "axios";

const defaultContent = {
  title: {
    text: "",
    url: "",
  },
  answer: 0,
  questions: [
    {
      key: 0,
      type: "text", // image
      text: "",
      url: "",
    },
    {
      key: 1,
      type: "text", // image
      text: "",
      url: "",
    },
    {
      key: 2,
      type: "text", // image
      text: "",
      url: "",
    },
    {
      key: 3,
      type: "text", // image
      text: "",
      url: "",
    },
  ],
};

export const Step2 = ({ next, prev, idx, quizItem, S3_KEY }) => {
  const [contentType, setContentType] = useState("answer");
  // const [questionTextCount, setQuestionTextCount] = useState(4);
  // const [questionTextCountArr, setQuestionTextCountArr] = useState([
  //   0, 1, 2, 3,
  // ]);
  const [contents, setContents] = useState([defaultContent]);
  const [logo, setLogo] = useState("");

  const quizUpdate = async () => {
    const params = {
      quizIdx: idx,
      type: contentType,
      contents,
    };
    if (idx) {
      const { data } = await axios.post(
        "https://f5game.co.kr/api/quiz/update/content/",
        params
      );
      console.log(data);
    }
    next();
  };

  const onChangeTitleContent = (index, value) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        return {
          ...item,
          title: {
            url: item.title.url,
            text: value,
          },
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const handleFilesTitleContent = (e, _index) => {
    const files = Array.from(e.target.files);

    for (let index = 0; index < files.length; index++) {
      const params = {
        Bucket: "f5game-quiz",
        Key: `images/${idx}/${shortId.generate()}`,
        Body: files[index],
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
        }
        const param = {
          idx,
          logo: data.Location,
        };

        await axios.post("https://f5game.co.kr/api/quiz/update/logo/", param);

        const d = contents.map((item, key) => {
          console.log(key, _index);
          if (key === _index) {
            return {
              ...item,
              title: {
                text: item.title.text,
                url: data.Location,
              },
            };
          } else {
            return item;
          }
        });
        setContents(d);
      });
    }
  };

  const onChangeQuestionContent = (index, _index, value) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        const q = item.questions;
        q[_index].text = value;
        return {
          ...item,
          questions: q,
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const onChangeAnswerContent = (index, _index) => {
    const d = contents.map((item, key) => {
      if (key === index) {
        return {
          ...item,
          answer: _index,
        };
      } else {
        return item;
      }
    });
    setContents(d);
  };

  const onChangeAnswer = (index, key, value) => {};

  const addSetQuestionArr = () => {
    setContents([
      ...contents,
      {
        title: {
          text: "",
          url: "",
        },
        questions: [
          {
            key: 0,
            type: "text", // image
            text: "",
            url: "",
            answer: true, // false
          },
          {
            key: 1,
            type: "text", // image
            text: "",
            url: "",
            answer: false, // false
          },
          {
            key: 2,
            type: "text", // image
            text: "",
            url: "",
            answer: false, // false
          },
          {
            key: 3,
            type: "text", // image
            text: "",
            url: "",
            answer: false, // false
          },
        ],
      },
    ]);
  };
  const removeSetQuestionArr = () => {
    contents.pop();
    setContents([...contents]);
  };

  const onChangeType = (e) => {
    setContentType(e.target.value);
  };
  const s3 = new AWS.S3({
    accessKeyId: S3_KEY.ACCESS_KEY,
    secretAccessKey: S3_KEY.ACCESS_SECRET_KEY,
  });

  const handleFilesChange = async ({ target }) => {
    const files = Array.from(target.files);

    for (let index = 0; index < files.length; index++) {
      const params = {
        Bucket: "f5game-quiz",
        Key: `images/${idx}/${shortId.generate()}`,
        Body: files[index],
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
        }
        const param = {
          idx,
          logo: data.Location,
        };

        await axios.post("https://f5game.co.kr/api/quiz/update/logo/", param);
        setLogo(data.Location);
      });
    }
  };

  useEffect(() => {
    if (quizItem.idx) {
      (async () => {
        const { data } = await axios.get(
          `https://f5game.co.kr/api/quiz/contents/?quizIdx=${idx}`
        );
        console.log(data);
        setContents(data.contents);
        setLogo(quizItem.logo);
        setContentType(data.type);
      })();
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="mt-4">
        <div className="test-subtitle mb-1">메인 이미지</div>
        <div>
          {logo ? (
            <img src={logo} alt="logo" style={{ width: 400, height: 300 }} />
          ) : (
            ""
          )}
          <input
            type="file"
            name="file"
            onChange={handleFilesChange}
            className="mb-4"
          />
          <div className="test-subtitle mb-1">퀴즈 타입</div>
          <Radio.Group
            className="mb-4"
            onChange={onChangeType}
            value={contentType}
          >
            <Radio value="answer">정답형</Radio>
            <Radio value="score">점수형</Radio>
          </Radio.Group>
          {/* <div className="test-subtitle mb-1">퀴즈 문항 개수</div>
          <InputNumber
            min={1}
            max={4}
            defaultValue={questionTextCount}
            onChange={onChangeQuestionTextCount}
          /> */}
          <Divider />
          {contents.map((item, key) => (
            <div key={key} className="mb-4">
              <div className="test-subtitle mb-1">퀴즈 문항 {key + 1}</div>
              <div>
                <div className="text-sm font-bold mb-1">퀴즈 제목 텍스트</div>
                <Input
                  size="large"
                  placeholder="제목을 적어주세요"
                  className="mb-4"
                  value={item.title.text}
                  onChange={(e) => onChangeTitleContent(key, e.target.value)}
                />
                <div className="text-sm font-bold mb-1">퀴즈 제목 이미지</div>
                {item.title.url ? (
                  <img
                    src={item.title.url}
                    style={{ width: 400, height: 300 }}
                  />
                ) : (
                  ""
                )}
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleFilesTitleContent(e, key)}
                  className="mb-4"
                />

                <div className="text-sm font-bold mb-1">퀴즈 질문</div>

                <Radio.Group onChange={onChangeAnswer} value={item.answer}>
                  {item.questions.map((_item, _key) => (
                    <div className="flex" key={_key}>
                      <Radio
                        value={_key}
                        onChange={(e) => onChangeAnswerContent(key, _key)}
                        style={{ marginTop: -14 }}
                      />
                      <Input
                        size="large"
                        placeholder="질문을 적어주세요"
                        className="mb-4"
                        value={_item.text}
                        onChange={(e) =>
                          onChangeQuestionContent(key, _key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <Divider />
            </div>
          ))}

          <div className="mt-4">
            <Button status="danger" onClick={() => removeSetQuestionArr()}>
              문항 삭제
            </Button>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => addSetQuestionArr()}
            >
              문항 추가
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button className="mr-2" onClick={() => prev()}>
          Previous
        </Button>
        <Button type="primary" onClick={() => quizUpdate()}>
          Next
        </Button>
      </div>
    </div>
  );
};
