'use client';

import { Box, Text, VStack } from 'katcn';

import {
  animate,
  motion,
  useDragControls,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { type PointerEventHandler, useRef } from 'react';
import { interpolate } from 'katcn/helpers';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  initialValue: number;
  formatValue?: (val: number) => string;
}

export function Slider({
  min,
  max,
  step = 1,
  initialValue,
  formatValue = (val: number) => `${val}`,
}: SliderProps) {
  const handleSize = 40;
  const sliderSize = 300;
  const sliderHeight = 8;
  const progress = useMotionValue(initialValue);

  const refs = {
    handle: useRef<HTMLDivElement | null>(null),
    constraints: useRef<HTMLDivElement | null>(null),
    progressBar: useRef<HTMLDivElement | null>(null),
  };

  const dragControls = useDragControls();

  const snapToCursor: PointerEventHandler<HTMLDivElement> = (event) => {
    dragControls.start(event, { snapToCursor: true });
  };

  const onDrag: React.ComponentProps<typeof motion.div>['onDrag'] = (event) => {
    // dragControls.start(event, { snapToCursor: true });
    // const relativeOffset = progress.set(event.clientX);
  };

  return (
    <VStack>
      <VStack
        data-test="slider"
        position="relative"
        justifyContent="center"
        borderRadius="full"
        backgroundColor="secondary"
        width={sliderSize}
        height={sliderHeight}
      >
        <Box
          ref={refs.progressBar}
          data-test="slider-progress"
          position="absolute"
          width="full"
          height="full"
          borderRadius="full"
          backgroundColor="accent"
          style={{ pointerEvents: 'none' }}
        >
          <motion.div style={{ x: progress }} />
        </Box>
        <Box
          ref={refs.handle}
          data-test="slider-handle"
          position="relative"
          zIndex="10"
          backgroundColor="accent"
          borderRadius="full"
          width={handleSize}
          height={handleSize}
          asChild
        >
          <motion.div
            drag="x"
            dragMomentum={false}
            dragControls={dragControls}
            // onDrag={onDrag}
            dragConstraints={{ left: 0, right: sliderSize }}
            dragElastic={0}
            whileHover={{ scale: 1.4 }}
            whileDrag={{ scale: 1.4 }}
          />
        </Box>
      </VStack>
      {/* <Text variant="body1" asChild>
        {formatValue(value)}
      </Text> */}
    </VStack>
  );
}
