import React, { useState } from "react";
import { InputNumber, Input, Button, Divider, Radio, Typography } from "antd";
import AWS from "aws-sdk";
import shortId from "shortid";
import axios from "axios";

const defaultContent = {
  title: {
    text: "제목을 입력하세요.",
    url: "url",
  },
  questions: [
    {
      type: "text", // image
      text: "문항1 적어주세요",
      url: "",
      answer: true, // false
    },
    {
      type: "text", // image
      text: "문항2 적어주세요",
      url: "",
      answer: false, // false
    },
    {
      type: "text", // image
      text: "문항3 적어주세요",
      url: "",
      answer: false, // false
    },
    {
      type: "text", // image
      text: "문항4 적어주세요",
      url: "",
      answer: false, // false
    },
  ],
};

export const Step2 = ({ next, prev, idx, S3_KEY }) => {
  const [questionCountArr, setQuestionCountArr] = useState([0]);
  const [questionType, setQuestionType] = useState("answer");
  const [questionTextCount, setQuestionTextCount] = useState(4);
  const [questionTextCountArr, setQuestionTextCountArr] = useState([
    0, 1, 2, 3,
  ]);
  const [content, setContent] = useState([defaultContent]);
  const [logo, setLogo] = useState("");

  const onChangeTitleContent = (index, value) => {
    setContent((current) =>
      current.map((obj, key) => {
        console.log(obj, key);
        if (key === index) {
          obj.title.text = value;
          return {
            ...obj,
          };
        }
        return obj;
      })
    );
  };
  const onChangeQuestionContent = (index, _index, value) => {
    let newArr = [...content];
    newArr[index].questions[_index].text = value;
    setContent(newArr);
  };

  const onChangeAnswer = (index, key, value) => {};

  const onChangeQuestionTextCount = (value) => {
    setQuestionTextCount(value);
    const d = [];
    for (let i = 0; i < value; i++) {
      d.push(i + 1);
    }
    setQuestionTextCountArr(d);
  };

  const addSetQuestionArr = () => {
    const len = questionCountArr.length;
    setContent([...content, defaultContent]);
    // setTimeout(() => {
    setQuestionCountArr([...questionCountArr, len + 1]);
    // }, 10000);
  };
  const removeSetQuestionArr = () => {
    content.pop();
    console.log(content);
    setContent([...content]);
    // const len = questionCountArr.length;
    // if (len === 0) {
    //   alert("최소 1개는 등록해야 합니다.");
    //   return;
    // }
    // const newQuestionCountArr = questionCountArr;
    // newQuestionCountArr.pop();
    // setQuestionCountArr([...newQuestionCountArr]);
  };

  const onChangeType = (e) => {
    setQuestionType(e.target.value);
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
            value={questionType}
          >
            <Radio value="answer">정답형</Radio>
            <Radio value="score">점수형</Radio>
          </Radio.Group>
          <div className="test-subtitle mb-1">퀴즈 문항 개수</div>
          <InputNumber
            min={1}
            max={4}
            defaultValue={questionTextCount}
            onChange={onChangeQuestionTextCount}
          />
          <Divider />
          {content.map((item, key) => (
            <div key={key} className="mb-4">
              <div className="test-subtitle mb-1">퀴즈 문항 {key + 1}</div>
              <div>
                <div className="text-sm font-bold mb-1">
                  퀴즈 제목 텍스트{key}
                </div>
                <Input
                  size="large"
                  placeholder="제목을 적어주세요"
                  className="mb-4"
                  value={`${content[key].title.text}`}
                  onChange={(e) => onChangeTitleContent(key, e.target.value)}
                />
                <input
                  type="file"
                  name="file"
                  onChange={handleFilesChange}
                  className="mb-4"
                />

                <div className="text-sm font-bold mb-1">퀴즈 문항</div>

                <Radio.Group onChange={onChangeAnswer} value={0}>
                  {questionTextCountArr.map((_item, _key) => (
                    <div className="flex" key={_key}>
                      <Radio value={_item} style={{ marginTop: -14 }} />
                      <Input
                        size="large"
                        placeholder="문항을 적어주세요"
                        className="mb-4"
                        value={item.questions[_item].text}
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
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      </div>
    </div>
  );
};
