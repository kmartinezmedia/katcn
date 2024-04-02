'use client';

import { Box, HStack, Text, VStack } from 'katcn';

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';

const handleSize = 40;

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  initialValue: number;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 30,
}: SliderProps) {
  const [value, setValue] = useState(initialValue);
  const [dragging, setDragging] = useState(false);
  const handleX = useMotionValue(0);

  const refs = {
    handle: useRef<HTMLDivElement | null>(null),
    constraints: useRef<HTMLDivElement | null>(null),
    progressBar: useRef<HTMLDivElement | null>(null),
  };
  const handleDrag = () => {
    const { handle, constraints, progressBar } = refs;
    if (!handle.current || !constraints.current || !progressBar.current) {
      return;
    }
    const handleBounds = handle.current.getBoundingClientRect();
    const middleOfHandle = handleBounds.x + handleBounds.width / 2;
    const progressBarBounds = progressBar.current.getBoundingClientRect();
    const newProgress =
      (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;

    setValue(newProgress * (max - min));
  };

  return (
    <Box spacing="8">
      <VStack
        data-test="slider"
        position="relative"
        justifyContent="center"
        width="3/12"
      >
        <Box
          data-test="slider-background"
          position="absolute"
          width="full"
          height="3"
          backgroundColor="secondary"
          borderRadius="full"
        />
        <Box
          ref={refs.progressBar}
          data-test="slider-progress"
          position="absolute"
          width="2"
          backgroundColor="accent"
          borderRadius="full"
        />
        <div ref={refs.constraints}>
          <Box
            ref={refs.handle}
            data-test="slider-handle"
            position="relative"
            zIndex="10"
            backgroundColor="accent"
          >
            <motion.div
              drag="x"
              dragMomentum={false}
              dragConstraints={refs.constraints}
              dragElastic={0}
              onDrag={handleDrag}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onPointerDown={() => setDragging(true)}
              onPointerUp={() => setDragging(false)}
              animate={{
                scale: dragging ? 2 : 1,
              }}
              style={{
                width: handleSize,
                height: handleSize,
                x: handleX,
              }}
            />
          </Box>
        </div>
      </VStack>
    </Box>
  );
}
