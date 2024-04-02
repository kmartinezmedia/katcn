'use server';

import { Slider } from '@/ui/slider';
import { Box, HStack, Text, VStack } from 'katcn';
import fixtures from 'katcn/fixtures';
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

// function Sliders() {
//   return (
//     <VStack gap="6">
//       {fixtures.hueSteps.map((step) => (
//         <Ramp key={hue} hue={hue} />
//       ))}
//     </VStack>
//   );

// }

export default async function Home() {
  return (
    <VStack>
      {/* <Slider /> */}
      <Box direction="horizontal" wrap="allow" gapX="8" gapY="8" spacing="8">
        {fixtures.hues.map((hue) => (
          <Ramp key={hue} hue={hue} />
        ))}
      </Box>
    </VStack>
  );
}
