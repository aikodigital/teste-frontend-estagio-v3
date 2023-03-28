import React, { useContext, useEffect, useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Card } from "../Card/Card";


interface Props {
  components: React.ReactNode[];
  isChild: boolean;
}

export const ScrollAreaComp: React.FC<Props> = ({ components, isChild }) => {
 
  /* const scrollTo = 0;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current.children[scrollTo];
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []); */

  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport
        className={isChild ? "ScrollAreaChild" : "ScrollAreaViewport"}
      >
        <div /* ref={scrollRef} */>
          {components.map((component, index) => (
            <React.Fragment key={index}>{component}</React.Fragment>
          ))}
        </div>
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
};
