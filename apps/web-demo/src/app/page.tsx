'use server';

import { Box, HStack, Text, VStack } from 'katcn';
import fixtures from 'katcn/fixtures';
import { getColorRamps } from 'katcn/macros/color/getColorRamps';
import type { Hue } from 'katcn/types';

const colorRamps = getColorRamps();

function Slider() {
  return (
    <Box spacing="8">
      <VStack position="relative" justifyContent="center">
        <Box
          position="absolute"
          width="full"
          backgroundColor="secondary"
          borderRadius="full"
        />
        <Box
          position="absolute"
          width="full"
          backgroundColor="accent"
          borderRadius="full"
        />
      </VStack>
    </Box>
  );
}

function Ramp({ hue }: { hue: Hue }) {
  const values = colorRamps[hue];
  return (
    <VStack>
      <Slider />
      <Text
        variant="title3"
        spacingY="6"
        style={{ fontWeight: 300, textTransform: 'capitalize' }}
      >
        {hue}
      </Text>
      <VStack borderRadius="xl" overflow="hidden">
        {values.map((value, index) => (
          <HStack
            key={value}
            spacingY="3"
            spacingX="6"
            justifyContent="between"
            alignItems="center"
            style={{
              width: 221,
              background: `var(${value})`,
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

export default async function Home() {
  return (
    <Box direction="horizontal" wrap="allow" gapX="8" gapY="8" spacing="8">
      {fixtures.hues.map((hue) => (
        <Ramp key={hue} hue={hue} />
      ))}
    </Box>
  );
}
