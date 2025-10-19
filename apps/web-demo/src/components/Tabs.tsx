'use client';

import { HStack, Pressable, Text, VStack } from 'katcn';
import { motion } from 'motion/react';
import { useState } from 'react';

export interface Tab<T extends string> {
  tabId: T;
  label: string;
}

export interface TabsProps<T extends string> {
  tabs: Tab<T>[] | Readonly<Tab<T>[]>;
  activeTabId?: T | Readonly<T>;
  onTabChange?: (id: T) => void;
  children: React.ReactNode;
}

export function Tabs<T extends string>({
  tabs,
  onTabChange,
  activeTabId: _activeTabId,
  children,
}: TabsProps<T>) {
  const [activeTabId, setActiveTabId] = useState<T | Readonly<T>>(
    _activeTabId ?? tabs[0].tabId,
  );
  const tabChangeHandler = (tab: Tab<T>) => () => {
    setActiveTabId(tab.tabId);
    onTabChange?.(tab.tabId);
  };

  return (
    <VStack>
      <HStack spacingX="1">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.tabId;
          return (
            <Pressable
              key={tab.tabId}
              onClick={tabChangeHandler(tab)}
              position="relative"
              rounded="full"
              spacingX="5"
              spacingY="2"
              outlineColor="sky-400"
              textVariant="headline"
              className="transition"
              cursor="pointer"
              _focusVisible={{ outlineWidth: '1' }}
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {isActive && (
                <Text
                  asChild
                  top="0"
                  bg="inverse"
                  mixBlendMode="difference"
                  rounded="full"
                  position="absolute"
                  inset="0"
                  zIndex="10"
                >
                  <motion.span
                    layoutId="bubble"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                </Text>
              )}
              {tab.label}
            </Pressable>
          );
        })}
      </HStack>
      {children}
    </VStack>
  );
}
