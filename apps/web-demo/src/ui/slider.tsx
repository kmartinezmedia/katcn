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
import fixtures from 'katcn/fixtures';
import { clamp, entries, interpolate, mapValues } from 'katcn/helpers';
import { defaultTokensConfig } from 'katcn/tokens';
import type { Hue, HueChroma, HueLightness, HueStep } from 'katcn/types';
import { useRef, useState } from 'react';

const lightnessMap = mapValues(defaultTokensConfig.huesLightness, (value) => {
  return atom(value);
});
const chromasMap = mapValues(defaultTokensConfig.huesChroma, (value) => {
  return atom(value);
});
const huesMap = mapValues(defaultTokensConfig.hues, (value) => {
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
  hueStep: HueStep;
}

function LightnessSlider({ initialValue, hueStep }: LightnessSliderProps) {
  const [lightness, setLightness] = useAtom(lightnessMap[hueStep]);

  const handleChange = (value: number) => {
    const newValue = decimalToLightness(value);
    setLightness(newValue);
    document.documentElement.style.setProperty(
      `--hue-lightness-${hueStep}`,
      newValue,
    );
  };

  return (
    <Slider
      min={0}
      max={1}
      initialValue={lightnessToDecimal(initialValue)}
      value={lightnessToDecimal(lightness)}
      startLabel={`${hueStep}`}
      endLabel={`${lightness}`}
      onChange={handleChange}
    />
  );
}

interface ChromaSliderProps {
  initialValue: HueChroma;
  hueStep: HueStep;
}

function ChromaSlider({ initialValue, hueStep }: ChromaSliderProps) {
  const [chroma, setChroma] = useAtom(chromasMap[hueStep]);

  const handleChange = (value: number) => {
    const roundedString = value.toFixed(2);
    const roundedNumber = Number.parseFloat(roundedString);
    setChroma(roundedNumber);
    document.documentElement.style.setProperty(
      `--hue-chroma-${hueStep}`,
      `${roundedNumber}`,
    );
  };

  return (
    <Slider
      min={0}
      max={0.37}
      initialValue={initialValue}
      value={chroma}
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
        {entries(defaultTokensConfig.huesLightness).map(
          ([hueStep, lightness]) => {
            return (
              <LightnessSlider
                key={hueStep}
                initialValue={lightness}
                hueStep={hueStep}
              />
            );
          },
        )}
      </VStack>
      <VStack gap="6" spacing="6">
        <Text variant="title2">Chroma</Text>
        {entries(defaultTokensConfig.huesChroma).map(([hueStep, chroma]) => {
          return (
            <ChromaSlider
              key={hueStep}
              initialValue={chroma}
              hueStep={hueStep}
            />
          );
        })}
      </VStack>
    </HStack>
  );
}

function HueSlider({
  initialValue,
  name,
}: { initialValue: number; name: Hue }) {
  const [a11yScore, setA11yScore] = useState<string>('');
  const [hue, setHue] = useAtom(huesMap[name]);

  const handleChange = (value: number) => {
    const roundedString = value.toFixed(1);
    const roundedNumber = Number.parseFloat(roundedString);
    setHue(roundedNumber);
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
        endLabel={`${hue}`}
        onChange={handleChange}
        value={hue}
      />

      <VStack borderRadius="xl" overflow="hidden" grow="prevent">
        {fixtures.hueSteps.map((step, index) => {
          const [lightness] = useAtom(lightnessMap[step]);
          const [chroma] = useAtom(chromasMap[step]);
          const background = `oklch(${lightness} ${chroma} ${hue})`;
          const foreground = index >= 8 ? '#ffffff' : '#000000';
          const wcag = getColorContrast({
            foreground,
            background,
            contrastModel: 'wcag',
            colorSpace: 'p3',
          });

          return (
            <HStack
              key={step}
              spacingY="3"
              spacingX="6"
              justifyContent="between"
              alignItems="center"
              backgroundColor={`${name}-${step}`}
            >
              <Text variant="label1" style={{ color: foreground }}>
                {index}
              </Text>
              <Text variant="label1" style={{ color: foreground }}>
                {`${wcag.details} ${wcag.contrast}`}
              </Text>
            </HStack>
          );
        })}
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
