import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { QuizCard } from "./QuizCard";
import axios from "axios";

export const Step3 = ({ prev, idx }) => {
  const [item, setItem] = useState({ title: "" });
  const done = async () => {
    try {
      const params = {
        idx,
        status: "active",
      };
      const data = await axios.post(
        "https://f5game.co.kr/api/quiz/update/status/",
        params
      );
      location.href = "/";
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://f5game.co.kr/api/quiz/?idx=${idx}`
      );
      console.log(data);
      setItem(data);
    })();
  }, []);

  return (
    <div>
      <div>{item.title ? <QuizCard item={item} /> : ""}</div>

      <div className="mt-8">
        <Button className="mr-2" onClick={() => prev()}>
          Previous
        </Button>
        <Button type="primary" onClick={() => done()}>
          Done
        </Button>
      </div>
    </div>
  );
};
