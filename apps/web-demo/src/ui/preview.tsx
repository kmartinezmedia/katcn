'use client';

import {
  Box,
  HStack,
  VStack,
  Icon,
  Image,
  Pressable,
  Text,
  TextInput,
  Avatar,
} from 'katcn';
import { getStyles } from 'katcn/getStyles';
import { jsx } from 'katcn/jsx-runtime';
import { jsxDEV } from 'katcn/jsx-dev-runtime';
import { useState } from 'react';

type Tab = 'preview' | 'css' | 'js';
export function Preview({ css, js }: { css: string; js: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const fnString = new Function(`
      function renderComp({ jsx, jsxDEV, getStyles, Box, HStack, VStack, Icon, Image, Pressable, Text, TextInput, Avatar }) {
        ${js}
        return Example;
      }
      return renderComp;
    `)();

  const Comp = fnString({
    jsx,
    jsxDEV,
    getStyles,
    Box,
    HStack,
    VStack,
    Icon,
    Image,
    Pressable,
    Text,
    TextInput,
    Avatar,
  });
  return (
    <VStack spacing="4">
      <HStack gap="1">
        <Pressable
          backgroundColor={activeTab === 'preview' ? 'accent' : 'secondary'}
          borderTopRadius="md"
          spacing="2"
          onClick={() => setActiveTab('preview')}
        >
          <Text variant="body1">Preview</Text>
        </Pressable>
        <Pressable
          backgroundColor={activeTab === 'css' ? 'accent' : 'secondary'}
          borderTopRadius="md"
          spacing="2"
          onClick={() => setActiveTab('css')}
        >
          <Text variant="body1">CSS</Text>
        </Pressable>
        <Pressable
          backgroundColor={activeTab === 'js' ? 'accent' : 'secondary'}
          borderTopRadius="md"
          spacing="2"
          onClick={() => setActiveTab('js')}
        >
          <Text variant="body1">JS</Text>
        </Pressable>
      </HStack>
      {activeTab === 'preview' && (
        <div>
          <style>{css}</style>
          <Comp />
        </div>
      )}
      {activeTab === 'css' && (
        <pre>
          <code>{css}</code>
        </pre>
      )}
      {activeTab === 'js' && (
        <pre>
          <code>{js}</code>
        </pre>
      )}
    </VStack>
  );
}
