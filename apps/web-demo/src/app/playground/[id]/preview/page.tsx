'use server';

import type { PlaygroundData, PlaygroundPageProps } from '@/types';
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  TextInput,
  VStack,
} from 'katcn';
import { getStyles } from 'katcn/getStyles';
import { jsxDEV } from 'katcn/jsx-dev-runtime';
import { jsx } from 'katcn/jsx-runtime';
import { kv } from '@vercel/kv';

export default async function Page({
  params,
  searchParams,
}: PlaygroundPageProps) {
  const data = await kv.get<PlaygroundData>(
    `${params.id}/${searchParams.hash}`,
  );

  if (!data) {
    return null;
  }

  const fnString = new Function(`
      function renderComp({ jsx, jsxDEV, getStyles, Box, HStack, VStack, Icon, Image, Pressable, Text, TextInput, Avatar }) {
        ${data.js}
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
    <div>
      <style>{data.css}</style>
      <Comp />
    </div>
  );
}
