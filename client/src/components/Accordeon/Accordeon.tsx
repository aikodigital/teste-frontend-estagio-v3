//@ts-nocheck

import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { CaretDown } from '@phosphor-icons/react';
import { ScrollAreaComp } from '../Scroll/Scroll';
import { PositionComp } from '../PositionComp/PositionComp';
import { State } from '../../class/State';
import { Equipament } from '../../class/Equipment';



interface AccordeonProps {
  equipment: Equipament;
}
export const Accordeon: React.FC<AccordeonProps> = ({ equipment }) => {
  const positionComps = equipment.states.map((state) => (
    <PositionComp position={state.positionDateInfo()} key={state.id} />
  ));

  return (
    <Accordion.Root className="AccordionRoot" type="single" collapsible>
      <Accordion.Item className="AccordionItem" value="item-1">
        <AccordionTrigger>State History</AccordionTrigger>
        <AccordionContent>
          <ScrollAreaComp components={positionComps} isChild={true} />
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <CaretDown  className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));

