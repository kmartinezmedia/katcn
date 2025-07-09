'use client';

import { HStack, Pressable, Text } from 'katcn';
import { motion } from 'motion/react';

interface Tab<T extends string> {
  id: T;
  label: string;
}

interface AnimatedTabsProps<T extends string> {
  tabs: Tab<T>[] | Readonly<Tab<T>[]>;
  activeTab?: T | Readonly<T>;
  onChange?: (id: T) => void;
}

export function AnimatedTabs<T extends string>({
  tabs,
  onChange,
  activeTab,
}: AnimatedTabsProps<T>) {
  return (
    <HStack spacingX="1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onClick={() => onChange?.(tab.id)}
            position="relative"
            rounded="full"
            spacingX="5"
            spacingY="2"
            outlineColor="sky-400"
            textVariant="headline"
            className="transition"
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
  );
}
