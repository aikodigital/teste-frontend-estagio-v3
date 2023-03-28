import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Card } from "../Card/Card";

interface Props {
  components: React.ReactNode[];
  isChild: boolean;
}

export const ScrollAreaComp: React.FC<Props> = ({ components, isChild }) => (
  <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className={ isChild ? "ScrollAreaChild" : "ScrollAreaViewport"}>
      {components.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="ScrollAreaScrollbar"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="ScrollAreaScrollbar"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
);
