'use client';

import { Box, HStack, Text, TextArea, VStack } from 'katcn';
import { useState } from 'react';
import { convertHtml } from '@/actions/convertHtml';
import { Button } from '@/components/Button';
import { CodeBlock } from '@/components/converter/CodeBlock';
import { AnimatedTabs } from '@/components/Tabs';
import { Preview } from './_preview';
import { transformCode } from './_transformCode';

const tabs = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'React (code)' },
  { id: 'ast', label: 'React (AST)' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
] as const;

type TabID = (typeof tabs)[number]['id'];
type Response = Awaited<ReturnType<typeof convertHtml>>;
type Data = Response & { response: Response };

export default function Editor() {
  const [activeTab, setActiveTab] = useState<TabID>(tabs[0].id);
  const [htmlInput, setHtmlInput] = useState('');
  const [data, setData] = useState<Data | null>(null);

  const handleSubmit = async () => {
    try {
      const _data = await convertHtml(htmlInput);
      const { codeToHtml } = await import('shiki');
      const [transformedCode, code, ast, html, css] = await Promise.all([
        transformCode(_data.preview),
        codeToHtml(_data.code, {
          lang: 'tsx',
          theme: 'dracula',
        }),
        codeToHtml(_data.ast, {
          lang: 'tsx',
          theme: 'dracula',
        }),
        codeToHtml(_data.html, {
          lang: 'html',
          theme: 'dracula',
        }),
        codeToHtml(_data.css, {
          lang: 'tsx',
          theme: 'dracula',
        }),
      ]);
      setData({
        ..._data,
        preview: transformedCode,
        code,
        ast,
        html,
        css,
        response: _data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <VStack spacing="8" gap="8" height="full" width="full" overflow="hidden">
      <VStack gap="4" width="full">
        <HStack gap="4" alignItems="start" justifyContent="between">
          <VStack width="6/12" gap="4">
            <HStack
              alignItems="center"
              justifyContent="start"
              gap="4"
              spacingBottom="4"
            >
              <Text variant="title3">HTML</Text>
            </HStack>
            <TextArea
              name="html"
              placeholder='<div class="bg-accent h-[100px] w-[100px]"></div>'
              bg="primary"
              borderWidth="2"
              borderColor="secondary"
              rounded="md"
              spacing="4"
              onChange={(e) => setHtmlInput(e.target.value)}
              rows={20}
            />
            <Button
              variant="primary-outline"
              onClick={handleSubmit}
              width="fit"
            >
              Convert
            </Button>
          </VStack>
          <VStack width="1/2" position="relative">
            <Box bg="primary" zIndex="10" spacingBottom="4">
              <AnimatedTabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id)}
              />
            </Box>
            <VStack
              position="fixed"
              left="1/2"
              width="6/12"
              height="full"
              spacingY="16"
              spacingX="8"
              overflow="scroll"
              scrollBehavior="smooth"
            >
              <VStack
                display="block"
                width="full"
                position="relative"
                spacingBottom="40"
                // Ensure fixed positioning is relative to this parent and not the body
                style={{ transform: 'translateZ(0)' }}
                isolate
              >
                {!!data && (
                  <>
                    {activeTab === 'preview' && (
                      <>
                        {data.style}
                        <Preview code={data.preview} />
                      </>
                    )}
                    {activeTab === 'code' && (
                      <CodeBlock
                        code={data.code}
                        originalCode={data.response?.code}
                      />
                    )}
                    {activeTab === 'ast' && (
                      <CodeBlock
                        code={data.ast}
                        originalCode={data.response?.ast}
                      />
                    )}
                    {activeTab === 'html' && (
                      <CodeBlock code={data.html} originalCode={data.html} />
                    )}
                    {activeTab === 'css' && (
                      <CodeBlock code={data.css} originalCode={data.css} />
                    )}
                  </>
                )}
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
