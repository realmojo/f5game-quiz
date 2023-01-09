import React from "react";
import { Button } from "antd";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <Link href="/">F5 Quiz</Link>
      <div className="pt-2 pr-2">
        <Button type="primary" size="large">
          <Link href="/make">만들기</Link>
        </Button>
      </div>
    </header>
  );
};
