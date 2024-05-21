'use client';

import { PlaygroundDataContext } from '@/lib/context';
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
import { useContext } from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx } from 'react/jsx-runtime';

export default function Page() {
  const { css, js } = useContext(PlaygroundDataContext);
  if (!css || !js) {
    return null;
  }
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
    <div>
      <style>{css}</style>
      <Comp />
    </div>
  );
}
