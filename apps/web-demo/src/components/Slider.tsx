import {
  clamp,
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { Box, HStack, Text, VStack } from 'katcn';
import { interpolate } from 'katcn/helpers';
import { useRef, useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  initialValue: number;
  value: number;
  startLabel?: string;
  endLabel?: string;
  onChange: (val: number) => void;
}

export function Slider({
  min,
  max,
  initialValue,
  value,
  startLabel,
  endLabel,
  onChange,
}: SliderProps) {
  const knobSize = 20;
  const halfKnobSize = 10;
  const sliderSize = 170;
  const sliderHeight = 8;
  const knobActiveScale = 1.3;

  const motionValue = useMotionValue(initialValue);
  const knobMotion = useMotionValue(
    interpolate(initialValue, [min, max], [0, sliderSize]),
  );
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
    const valueInMinMax = interpolate(newValue, [0, sliderSize], [min, max]);
    motionValue.set(valueInMinMax);
    onChange(valueInMinMax);
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
      <HStack alignItems="center" gap="4">
        {startLabel && (
          <Text variant="body" width="[20px]">
            {startLabel}
          </Text>
        )}
        <VStack
          data-test="slider"
          position="relative"
          justifyContent="center"
          rounded="full"
          bg="secondary"
          width={`[${sliderSize}px]`}
          height={`[${sliderHeight}px]`}
          ref={refs.container}
        >
          <Box
            height="full"
            rounded="full"
            overflow="hidden"
            position="relative"
          >
            <Box
              ref={refs.progressBar}
              data-test="slider-progress"
              position="absolute"
              width="full"
              height="full"
              rounded="full"
              bg="cyan-300"
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
            bg="cyan-500"
            rounded="full"
            width={`[${knobSize}px]`}
            height={`[${knobSize}px]`}
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
        {endLabel && (
          <Text
            variant="body"
            color="on-primary"
            textAlign="start"
            width="[42px]"
            overflow="hidden"
          >
            {endLabel}
          </Text>
        )}
      </HStack>
    </VStack>
  );
}
