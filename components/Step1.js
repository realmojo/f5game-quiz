import React from "react";
import { Button, Input } from "antd";
import axios from "axios";

export const Step1 = ({
  next,
  idx,
  setIdx,
  title,
  setTitle,
  description,
  setDescription,
  adsenses,
  setAdsenses,
}) => {
  const setChangeAdsenses = (type, value) => {
    const newObj = { ...adsenses };
    newObj[type] = value;
    setAdsenses(newObj);
  };
  const addTest = async () => {
    const params = {
      title,
      description,
      adsenses,
    };
    if (!idx) {
      const { data } = await axios.post(
        "https://f5game.co.kr/api/test/add/",
        params
      );
      setIdx(data);
    } else {
      await axios.post("https://f5game.co.kr/api/test/update/", {
        ...params,
        idx,
      });
    }

    next();
  };

  return (
    <div className="mt-10">
      <div className="my-2">
        <div className="test-subtitle mb-1">테스트 제목</div>
        <Input
          size="large"
          placeholder="이름 혹은 별명을 적어주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-2">
        <div className="test-subtitle mb-1">테스트 설명</div>
        <Input
          size="large"
          placeholder="설명을 적어주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="my-2">
        <div className="test-subtitle mb-1">애드센스 코드</div>
        <Input
          size="large"
          className="mb-2"
          placeholder="메인 코드"
          value={adsenses.main}
          onChange={(e) => setChangeAdsenses("main", e.target.value)}
        />
        <Input
          size="large"
          className="mb-2"
          placeholder="플레이 코드"
          value={adsenses.play}
          onChange={(e) => setChangeAdsenses("play", e.target.value)}
        />
        <Input
          size="large"
          className="mb-2"
          placeholder="로딩 코드"
          value={adsenses.loading}
          onChange={(e) => setChangeAdsenses("loading", e.target.value)}
        />
        <Input
          size="large"
          className="mb-2"
          placeholder="결과 코드"
          value={adsenses.result}
          onChange={(e) => setChangeAdsenses("result", e.target.value)}
        />
      </div>
      <div className="mt-8">
        <Button type="primary" onClick={() => addTest()}>
          Next
        </Button>
      </div>
    </div>
  );
};
