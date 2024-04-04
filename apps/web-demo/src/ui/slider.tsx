'use client';

import { Box, HStack, Icon, Pressable, Text, VStack } from 'katcn';

import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import fixtures from 'katcn/fixtures';
import { clamp, entries, interpolate } from 'katcn/helpers';
import { defaultTokensConfig } from 'katcn/tokens';
import type { Hue, HueChroma, HueLightness } from 'katcn/types';
import { useRef, useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  initialValue: number;
  startLabel?: string;
  endLabel?: string;
  onChange: (val: number) => void;
}

export function Slider({
  min,
  max,
  initialValue,
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
    const valueInMinMax = interpolate(newValue, [0, sliderSize], [min, max]);
    motionValue.set(valueInMinMax);
    onChange(valueInMinMax);
    setValue(valueInMinMax);
  };

  const handleReset = () => {
    motionValue.set(initialValue);
    knobMotion.set(interpolate(initialValue, [min, max], [0, sliderSize]));
    onChange(initialValue);
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
      <HStack alignItems="center" gap="4">
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
        {endLabel && (
          <Text
            variant="body1"
            color="primary"
            textAlign="start"
            width={42}
            overflow="hidden"
          >
            {endLabel}
          </Text>
        )}
        <Pressable
          onClick={handleReset}
          opacity={initialValue !== value ? '100' : '0'}
        >
          <Icon name="arrow8" color="primary" size="sm" />
        </Pressable>
      </HStack>
    </VStack>
  );
}

function lightnessToDecimal(lightness: HueLightness) {
  return Number.parseFloat(lightness) / 100;
}

function decimalToLightness(decimal: number): HueLightness {
  return `${Math.round(decimal * 100)}%`;
}

interface LightnessSliderProps {
  initialValue: HueLightness;
  hueStep: string;
}

function LightnessSlider({ initialValue, hueStep }: LightnessSliderProps) {
  const [lightness, setLightness] = useState(initialValue);

  const handleChange = (value: number) => {
    const newLightnessPercent = decimalToLightness(value);
    setLightness(newLightnessPercent);
    document.documentElement.style.setProperty(
      `--katcn-hue-lightness-${hueStep}`,
      newLightnessPercent,
    );
  };

  return (
    <Slider
      min={0}
      max={1}
      initialValue={lightnessToDecimal(initialValue)}
      startLabel={`${hueStep}`}
      endLabel={lightness}
      onChange={handleChange}
    />
  );
}

interface ChromaSliderProps {
  initialValue: HueChroma;
  hueStep: string;
}

function ChromaSlider({ initialValue, hueStep }: ChromaSliderProps) {
  const [chroma, setChroma] = useState(initialValue);

  const handleChange = (value: number) => {
    const roundedString = value.toFixed(2);
    const roundedNumber = Number.parseFloat(roundedString);
    setChroma(roundedNumber);
    document.documentElement.style.setProperty(
      `--katcn-hue-chroma-${hueStep}`,
      `${roundedNumber}`,
    );
  };

  return (
    <Slider
      min={0}
      max={0.37}
      initialValue={initialValue}
      startLabel={`${hueStep}`}
      endLabel={`${chroma}`}
      onChange={handleChange}
    />
  );
}

export function LightnessAndChromaSliders() {
  return (
    <HStack>
      <VStack gap="6" spacing="6">
        <Text variant="title2">Lightness</Text>
        {entries(defaultTokensConfig.huesLightness).map(([step, lightness]) => {
          return (
            <LightnessSlider key={step} initialValue={lightness} step={step} />
          );
        })}
      </VStack>
      <VStack gap="6" spacing="6">
        <Text variant="title2">Chroma</Text>
        {entries(defaultTokensConfig.huesChroma).map(([step, chroma]) => {
          return <ChromaSlider key={step} initialValue={chroma} step={step} />;
        })}
      </VStack>
    </HStack>
  );
}

function HueSlider({
  initialValue,
  name,
}: { initialValue: number; name: Hue }) {
  const [hue, setHue] = useState(initialValue);

  const handleChange = (value: number) => {
    const roundedString = value.toFixed(1);
    const roundedNumber = Number.parseFloat(roundedString);
    setHue(roundedNumber);
    document.documentElement.style.setProperty(
      `--katcn-hue-${name}`,
      `${roundedNumber}`,
    );
  };

  return (
    <VStack gap="6">
      <Text
        variant="title3"
        style={{ fontWeight: 300, textTransform: 'capitalize' }}
      >
        {name}
      </Text>

      <Slider
        min={0}
        max={360}
        initialValue={initialValue}
        endLabel={`${hue}`}
        onChange={handleChange}
      />

      <VStack borderRadius="xl" overflow="hidden" grow="prevent">
        {fixtures.hueSteps.map((step, index) => (
          <HStack
            key={step}
            spacingY="3"
            spacingX="6"
            justifyContent="between"
            alignItems="center"
            backgroundColor={`${name}-${step}`}
          >
            <Text variant="label1" color={index >= 8 ? 'on-color' : 'primary'}>
              {index}
            </Text>
            <Text variant="label1" color={index >= 8 ? 'on-color' : 'primary'}>
              a11y score
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}

export function HueSliders() {
  return (
    <Box
      direction="horizontal"
      wrap="allow"
      gapX="8"
      gapY="8"
      spacing="8"
      id="colors"
    >
      {fixtures.hues.map((name) => (
        <HueSlider
          key={name}
          name={name}
          initialValue={defaultTokensConfig.hues[name]}
        />
      ))}
    </Box>
  );
}
