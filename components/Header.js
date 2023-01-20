import React from "react";
import { Button } from "antd";
import Link from "next/link";

export const Header = ({ NODE_ENV }) => {
  return (
    <header>
      <div className="header-wrap">
        <Link href="/">테스트팡</Link>
        {NODE_ENV === "development" ? (
          <span className="pt-2 pr-2">
            <Link href="/make">
              <Button type="primary" size="large">
                만들기
              </Button>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
