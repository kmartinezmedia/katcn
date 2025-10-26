'use client';

import { Box } from 'katcn';
import CopyCode from './CopyCode';

type Props = {
  code: string;
  originalCode: string;
};

export function CodeBlock({ code, originalCode }: Props) {
  return (
    <Box rounded="lg" marginBottom="10" width="full" overflow="hidden">
      <Box
        display="flex"
        justifyContent="end"
        position="absolute"
        right="4"
        top="3"
      >
        <CopyCode code={originalCode} />
      </Box>
      <Box
        rounded="lg"
        overflow="hidden"
        className="text-body [&>pre]:overflow-x-auto [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </Box>
  );
}
