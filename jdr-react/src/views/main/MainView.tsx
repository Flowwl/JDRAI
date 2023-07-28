import * as React from "react";
import { FC } from "react";
import { SelectCharacterSection } from "@/modules/characters";
import { StorySection } from "@/modules/stories";
import { SocketConnectionContext } from "@/services";
import { MusicPlayer } from "@/services/musicPlayer";

const MainView: FC = () => {
  return (
    <div className={"bg-gray-300 text-gray-50 h-screen flex"}>
      <div className="mx-auto my-auto flex flex-col text-center gap-8">
        <MusicPlayer />
        <SocketConnectionContext>
          <h1 className="text-xl">JDRAI</h1>
          <SelectCharacterSection />
          <StorySection />
        </SocketConnectionContext>
      </div>
    </div>
  );
};

export default MainView;
