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
import { useContext } from 'react';
import { PlaygroundDataContext } from '../_provider';

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
