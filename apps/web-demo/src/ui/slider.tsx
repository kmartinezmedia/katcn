'use client';

import { Box, HStack, Icon, Pressable, Text, VStack } from 'katcn';

import { getColorContrast } from '@/lib/contrast';
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { hueSteps, hues } from 'katcn/fixtures/colors';
import { clamp, interpolate, mapValues } from 'katcn/helpers';
import type { Hue, HueStep } from 'katcn/types';
import { useEffect, useRef, useState } from 'react';

const oklchRegex = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/;

type HueChroma = number;

const huesLightness: Record<HueStep, number> = {
  '50': 0.99,
  '100': 0.8825,
  '200': 0.775,
  '300': 0.6675,
  '400': 0.56,
  '500': 0.4525,
  '600': 0.345,
  '700': 0.2375,
  '800': 0.13,
  '900': 0.11,
};

const huesChroma: Record<HueStep, number> = {
  '50': 0,
  '100': 0,
  '200': 0,
  '300': 0,
  '400': 0,
  '500': 0,
  '600': 0,
  '700': 0,
  '800': 0,
  '900': 0,
};

const data: Record<
  Hue,
  {
    hue: number;
    lightness: Record<HueStep, number>;
    chroma: Record<HueStep, number>;
  }
> = {
  slate: { hue: 265.8, lightness: huesLightness, chroma: huesChroma },
  gray: { hue: 264.7, lightness: huesLightness, chroma: huesChroma },
  zinc: { hue: 286, lightness: huesLightness, chroma: huesChroma },
  neutral: { hue: 23.5, lightness: huesLightness, chroma: huesChroma },
  stone: { hue: 56, lightness: huesLightness, chroma: huesChroma },
  red: { hue: 25.7, lightness: huesLightness, chroma: huesChroma },
  orange: { hue: 38.2, lightness: huesLightness, chroma: huesChroma },
  amber: { hue: 45.9, lightness: huesLightness, chroma: huesChroma },
  yellow: { hue: 57.7, lightness: huesLightness, chroma: huesChroma },
  lime: { hue: 131.1, lightness: huesLightness, chroma: huesChroma },
  green: { hue: 152.5, lightness: huesLightness, chroma: huesChroma },
  emerald: { hue: 168.9, lightness: huesLightness, chroma: huesChroma },
  teal: { hue: 188.4, lightness: huesLightness, chroma: huesChroma },
  cyan: { hue: 227.4, lightness: huesLightness, chroma: huesChroma },
  sky: { hue: 240.9, lightness: huesLightness, chroma: huesChroma },
  blue: { hue: 265.5, lightness: huesLightness, chroma: huesChroma },
  indigo: { hue: 278.7, lightness: huesLightness, chroma: huesChroma },
  violet: { hue: 293.8, lightness: huesLightness, chroma: huesChroma },
  purple: { hue: 305, lightness: huesLightness, chroma: huesChroma },
  fuchsia: { hue: 325.6, lightness: huesLightness, chroma: huesChroma },
  pink: { hue: 2.4, lightness: huesLightness, chroma: huesChroma },
  rose: { hue: 10.3, lightness: huesLightness, chroma: huesChroma },
};

const lightnessMap = mapValues(huesLightness, (value) => {
  return atom(value);
});
const chromasMap = mapValues(huesChroma, (value) => {
  return atom(value);
});
const huesMap = mapValues(data, (value) => {
  return atom(value);
});

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

  const handleReset = () => {
    motionValue.set(initialValue);
    knobMotion.set(interpolate(initialValue, [min, max], [0, sliderSize]));
    onChange(initialValue);
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
        <Pressable
          onClick={handleReset}
          opacity={initialValue !== value ? '100' : '0'}
        >
          <Icon name="arrow8" color="on-primary" size="4" />
        </Pressable>
      </HStack>
    </VStack>
  );
}

function HueShade({
  name,
  step,
  index,
}: { name: Hue; step: HueStep; index: number }) {
  const [data, setData] = useAtom(huesMap[name]);
  const huePlaceholderRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const background = `oklch(${data.lightness[step]} ${data.chroma[step]} ${data.hue})`;
  const foreground = index > 5 ? '#ffffff' : '#000000';
  const wcag = getColorContrast({
    foreground,
    background,
    contrastModel: 'wcag',
    colorSpace: 'p3',
  });

  useEffect(() => {
    if (huePlaceholderRef.current) {
      const oklchString = window
        ?.getComputedStyle(huePlaceholderRef.current)
        .getPropertyValue('background-color');

      const oklchMatch = oklchRegex.exec(oklchString);
      console.log('oklchMatch', oklchMatch);
      if (oklchMatch) {
        const lightness = Number.parseFloat(oklchMatch[1]);
        const chroma = Number.parseFloat(oklchMatch[2]);
        // setChroma(chroma)
        const hue = Number.parseFloat(oklchMatch[3]);
        const roundedString = hue.toFixed(1);
        const roundedNumber = Number.parseFloat(roundedString);
        setData((prev) => ({
          ...prev,
          lightness: { ...prev.lightness, [step]: lightness },
          chroma: { ...prev.chroma, [step]: chroma },
          hue: roundedNumber,
        }));
      }
      // if (huePlaceholderRef.current) {
      //   huePlaceholderRef.current.style.backgroundColor = `oklch(from rgb(var(--${name}-${step})) h c l)`;
      // }
    }
  }, [setData, step]);

  return (
    <>
      <div
        ref={huePlaceholderRef}
        style={{
          backgroundColor: `oklch(from rgb(var(--${name}-${step})) l c h)`,
          display: 'none',
        }}
      />
      <HStack
        ref={hueRef}
        spacingY="3"
        spacingX="6"
        justifyContent="between"
        alignItems="center"
        style={{
          backgroundColor: background,
        }}
      >
        <Text variant="label1" style={{ color: foreground }}>
          {index}
        </Text>
        <Text variant="label1" style={{ color: foreground }}>
          {`${wcag.details} ${wcag.contrast}`}
        </Text>
      </HStack>
    </>
  );
}

function HueSlider({
  initialValue,
  name,
}: { initialValue: number; name: Hue }) {
  const [data, setData] = useAtom(huesMap[name]);

  const handleChange = (value: number) => {
    const roundedString = value.toFixed(1);
    const roundedNumber = Number.parseFloat(roundedString);
    setData((prev) => ({ ...prev, hue: roundedNumber }));
    document.documentElement.style.setProperty(
      `--hue-${name}`,
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
        endLabel={`${data.hue}`}
        onChange={handleChange}
        value={data.hue}
      />

      <VStack rounded="xl" overflow="hidden" flexGrow="0">
        {hueSteps.map((step, index) => {
          return <HueShade key={step} index={index} name={name} step={step} />;
        })}
      </VStack>
    </VStack>
  );
}

export function HueSliders() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      gapX="8"
      gapY="8"
      spacing="8"
      id="colors"
    >
      {hues.map((name) => (
        <HueSlider key={name} name={name} initialValue={data[name].hue} />
      ))}
    </Box>
  );
}
