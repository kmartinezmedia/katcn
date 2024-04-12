'use server';

import { HueSliders, LightnessAndChromaSliders } from '@/ui/slider';
import { HStack, Icon, VStack } from 'katcn';
import fixtures from 'katcn/fixtures';

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
      <LightnessAndChromaSliders />
      <HueSliders />
    </VStack>
  );
}
