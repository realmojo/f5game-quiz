import React from "react";
import { Button } from "antd";
import Link from "next/link";

export const Header = ({ NODE_ENV }) => {
  return (
    <header>
      <Link href="/">F5 Quiz</Link>
      {NODE_ENV === "development" ? (
        <div className="pt-2 pr-2">
          <Button type="primary" size="large">
            <Link href="/make">만들기</Link>
          </Button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
