import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  end: number;
  start: number;
  onChange: (value: { end: number; start: number }) => void;
}

function getItemWidth(item: HTMLElement | null): number {
  if (!item) {
    return 0;
  }
  const width = item.getBoundingClientRect().width;
  return width;
}

function TimeLine({ end, start, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(window.innerWidth);

  const endX = useMotionValue(0);
  const startX = useMotionValue(0);
  const widthX = useMotionValue(startX.get() - endX.get());

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const cellWidth = getItemWidth(ref.current);
    endX.set(cellWidth * (50 - end) - 4);
    startX.set(cellWidth * (50 - start) - 4);
    widthX.set(startX.get() - endX.get());
  }, [width, end, start, endX, startX, widthX]);

  return (
    <div className="relative mx-5 flex h-10 sm:mx-20">
      <motion.button
        className="absolute flex h-full w-2 cursor-col-resize items-center justify-center bg-gray-300 py-1"
        style={{ x: startX }}
        drag="x"
        dragMomentum={false}
        onDrag={() => {
          const cellWidth = getItemWidth(ref.current);
          const newStart = Math.floor(50 - startX.get() / cellWidth);
          if (newStart < end && newStart >= 0) {
            onChange({ start: newStart, end: end });
          }
          startX.set(cellWidth * (50 - start) - 4);
          widthX.set(startX.get() - endX.get());
        }}
      >
        <div className="h-full w-0.5 bg-black/50" />
      </motion.button>
      <motion.button
        className="absolute h-full bg-slate-700/40"
        style={{ x: endX, width: widthX }}
        drag="x"
        dragMomentum={false}
        onDrag={() => {
          const cellWidth = getItemWidth(ref.current);
          const newStart = Math.floor(
            50 - (endX.get() + widthX.get()) / cellWidth,
          );
          const newEnd = Math.floor(50 - endX.get() / cellWidth);
          if (newStart < newEnd && newStart >= 0 && newEnd <= 50) {
            onChange({ start: newStart, end: newEnd });
          }
          startX.set(cellWidth * (50 - start) - 4);
          endX.set(cellWidth * (50 - end) - 4);
        }}
      />
      <motion.button
        className="absolute flex h-full w-2 cursor-col-resize items-center justify-center bg-gray-300 py-1"
        style={{ x: endX }}
        drag="x"
        dragMomentum={false}
        onDrag={() => {
          const cellWidth = getItemWidth(ref.current);
          const newEnd = Math.floor(50 - endX.get() / cellWidth);
          if (start < newEnd && newEnd <= 50) {
            onChange({ start: start, end: newEnd });
          }
          endX.set(cellWidth * (50 - end) - 4);
        }}
      >
        <div className="h-full w-0.5 bg-black/50" />
      </motion.button>
      <div className="flex w-full divide-x divide-white/25 border-r border-l border-white/25">
        {Array.from({ length: 50 }).map((_, index) => {
          return <div key={index} className="h-full w-full flex-1" ref={ref} />;
        })}
      </div>
    </div>
  );
}

export default TimeLine;
