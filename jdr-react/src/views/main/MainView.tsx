import * as React from "react";
import { FC, useState } from "react";
import { Input } from "@/components/atoms/inputs";

const MainView: FC = () => {
  const [input, setInput] = useState("");

  return (
    <div className={"bg-gray-300 text-gray-50 h-screen flex"}>
      <div className="mx-auto my-auto flex flex-col text-center gap-8">
        <h1 className="text-xl">JDRAI</h1>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
    </div>
  );
};

export default MainView;
