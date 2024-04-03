'use client';

import { Box, HStack, VStack, Text } from 'katcn';

import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { interpolate } from 'katcn/helpers';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  initialValue: number;
  formatValue?: (val: number) => string;
  startLabel?: string;
}

export function Slider({
  min,
  max,
  step = 1,
  initialValue,
  startLabel,
  formatValue = (val: number) => `${val}`,
}: SliderProps) {
  const knobSize = 20;
  const halfHandleSize = 10;
  const sliderSize = 300;
  const sliderHeight = 8;
  const knobActiveScale = 1.3;
  const progress = useMotionValue(initialValue);
  const [value, setValue] = useState<number>(initialValue);
  const [dragging, setDragging] = useState(false);

  const refs = {
    handle: useRef<HTMLDivElement | null>(null),
    container: useRef<HTMLDivElement | null>(null),
    progressBar: useRef<HTMLDivElement | null>(null),
  };

  const dragControls = useDragControls();

  const onDrag: React.ComponentProps<typeof motion.div>['onDrag'] = (
    event,
    info,
  ) => {
    const containerX = refs.container.current?.getBoundingClientRect().x ?? 0;
    const progressValue = info.point.x - containerX - halfHandleSize;
    progress.set(progressValue);
    setValue(interpolate(progressValue, [0, sliderSize], [min, max]));
  };

  const left = useTransform(
    progress,
    // Map x from these values:
    [0, sliderSize],
    // Into these values:
    [-sliderSize, 0],
    { clamp: true },
  );

  return (
    <VStack>
      <HStack alignItems="center" gap="6">
        {startLabel && (
          <Text variant="body1" width={20}>
            {startLabel}
          </Text>
        )}
        <VStack
          data-test="slider"
          position="relative"
          justifyContent="center"
          borderRadius="full"
          backgroundColor="secondary"
          width={sliderSize}
          height={sliderHeight}
          ref={refs.container}
        >
          <Box
            height="full"
            borderRadius="full"
            overflow="hidden"
            position="relative"
          >
            <Box
              ref={refs.progressBar}
              data-test="slider-progress"
              position="absolute"
              width="full"
              height="full"
              borderRadius="full"
              backgroundColor="cyan-3"
              style={{ pointerEvents: 'none' }}
              asChild
            >
              <motion.div style={{ left }} />
            </Box>
          </Box>
          <HStack
            ref={refs.handle}
            data-test="slider-handle"
            position="absolute"
            zIndex="10"
            backgroundColor="cyan-5"
            borderRadius="full"
            width={knobSize}
            height={knobSize}
            asChild
          >
            <motion.div
              drag="x"
              dragMomentum={false}
              dragControls={dragControls}
              onDrag={onDrag}
              dragElastic={0}
              dragConstraints={{ left: 0, right: sliderSize - knobSize }}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onPointerDown={() => setDragging(true)}
              onPointerUp={() => setDragging(false)}
              onHoverStart={() => setDragging(true)}
              onHoverEnd={() => setDragging(false)}
              animate={{
                scale: dragging ? knobActiveScale : 1,
              }}
            />
          </HStack>
        </VStack>
        <Text
          variant="body1"
          color="primary"
          textAlign="start"
          width={40}
          overflow="hidden"
        >
          {formatValue(value)}
        </Text>
      </HStack>
    </VStack>
  );
}
