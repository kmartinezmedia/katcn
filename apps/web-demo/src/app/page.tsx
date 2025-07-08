'use server';

// import { HStack, Icon } from 'katcn';
// import { iconNames } from 'katcn/fixtures/icons';
import { HueSliders } from '@/ui/slider';

// function IconSheet() {
//   return (
//     <HStack flexWrap="wrap">
//       {iconNames.map((icon) => (
//         <Icon key={icon} name={icon} size="4" color="on-primary" />
//       ))}
//     </HStack>
//   );
// }

export default async function Home() {
  return <HueSliders />;
}
