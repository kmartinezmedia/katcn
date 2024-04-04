'use client';

import { Box, HStack, Icon, Pressable, Text, VStack } from 'katcn';

import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { clamp, interpolate } from 'katcn/helpers';
import { useRef, useState } from 'react';

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
  const halfKnobSize = 10;
  const sliderSize = 300;
  const sliderHeight = 8;
  const knobActiveScale = 1.3;

  const motionValue = useMotionValue(initialValue);
  const knobMotion = useMotionValue(
    interpolate(initialValue, [min, max], [0, sliderSize]),
  );
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
    const newValue = info.point.x - containerX - halfKnobSize;
    const minValue = 0;
    const maxValue = sliderSize - knobSize;
    knobMotion.set(clamp(newValue, minValue, maxValue));
    const valueInMinMax = interpolate(newValue, [0, sliderSize], [0, 1]);
    motionValue.set(valueInMinMax);
    setValue(valueInMinMax);
  };

  const handleReset = () => {
    motionValue.set(initialValue);
    knobMotion.set(interpolate(initialValue, [min, max], [0, sliderSize]));
    setValue(initialValue);
  };

  const left = useTransform(
    motionValue,
    // Map x from these values:
    [min, max],
    // Into these values:
    [-sliderSize, 0],
    { clamp: true },
  );

  return (
    <VStack>
      <HStack alignItems="center" gap="5">
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
              _dragX={knobMotion}
              style={{ left: knobMotion }}
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
        {initialValue !== value && (
          <Pressable onClick={handleReset}>
            <Icon name="arrow8" color="primary" size="sm" />
          </Pressable>
        )}
      </HStack>
    </VStack>
  );
}
