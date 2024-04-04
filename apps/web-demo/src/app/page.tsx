'use server';

import { Slider } from '@/ui/slider';
import { Box, HStack, Icon, Text, VStack } from 'katcn';
import fixtures from 'katcn/fixtures';
import { entries } from 'katcn/helpers';
import { defaultTokensConfig } from 'katcn/tokens';
import type { Hue } from 'katcn/types';

function Ramp({ hue }: { hue: Hue }) {
  return (
    <VStack>
      <Text
        variant="title3"
        spacingY="6"
        style={{ fontWeight: 300, textTransform: 'capitalize' }}
      >
        {hue}
      </Text>
      <VStack borderRadius="xl" overflow="hidden">
        {fixtures.hueSteps.map((step, index) => (
          <HStack
            key={step}
            spacingY="3"
            spacingX="6"
            justifyContent="between"
            alignItems="center"
            backgroundColor={`${hue}-${step}`}
            style={{
              width: 221,
            }}
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

function Sliders({ title }: { title: string }) {
  return (
    <VStack gap="6" spacing="6">
      <Text variant="title2">{title}</Text>
      {entries(defaultTokensConfig.huesLightness).map(([step, lightness]) => {
        const lightnessAsNumber = Number.parseFloat(lightness);
        return (
          <Slider
            key={step}
            min={0}
            max={1}
            initialValue={lightnessAsNumber / 100}
            startLabel={step}
          />
        );
      })}
    </VStack>
  );
}

function IconSheet() {
  return (
    <HStack wrap="allow">
      {fixtures.iconNames.map((icon) => (
        <Icon key={icon} name={icon} size="md" color="primary" />
      ))}
    </HStack>
  );
}

export default async function Home() {
  return (
    <VStack>
      <HStack>
        <Sliders title="Lightness" />
        <Sliders title="Chroma" />
      </HStack>
      <Box direction="horizontal" wrap="allow" gapX="8" gapY="8" spacing="8">
        {fixtures.hues.map((hue) => (
          <Ramp key={hue} hue={hue} />
        ))}
      </Box>
    </VStack>
  );
}
