import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Funnel } from "@phosphor-icons/react";
import { FilterPannel } from "../FilterPannel/FilterPannel";

export const PopoverComp = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <Funnel className="funnel" size={38} weight="fill" />
    </Popover.Trigger>
    <Popover.Portal style={{ zIndex: 0 }}>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        <FilterPannel/>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
