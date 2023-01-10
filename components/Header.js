import React from "react";
import { Button } from "antd";
import Link from "next/link";

export const Header = ({ NODE_ENV }) => {
  return (
    <header>
      <Link href="/">F5 Test</Link>
      {NODE_ENV === "development" ? (
        <div className="pt-2 pr-2">
          <Link href="/make">
            <Button type="primary" size="large">
              만들기
            </Button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
