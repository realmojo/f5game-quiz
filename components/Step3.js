import React from "react";
import { Button } from "antd";

export const Step3 = ({ prev }) => {
  return (
    <div>
      <div>2323423</div>

      <div className="mt-8">
        <Button className="mr-2" onClick={() => prev()}>
          Previous
        </Button>
        <Button
          type="primary"
          onClick={() => message.success("Processing complete!")}
        >
          Done
        </Button>
      </div>
    </div>
  );
};
