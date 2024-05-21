declare module 'tailwindcss/types/config' {
  export interface ThemeConfig {
    animationDelay?: ResolvableTo<RecursiveKeyValuePair>;
    animationOpacity?: ResolvableTo<RecursiveKeyValuePair>;
    animationTranslate?: ResolvableTo<RecursiveKeyValuePair>;
    animationScale?: ResolvableTo<RecursiveKeyValuePair>;
    animationRotate?: ResolvableTo<RecursiveKeyValuePair>;
    animationDuration?: ResolvableTo<RecursiveKeyValuePair>;
    animationTimingFunction?: ResolvableTo<RecursiveKeyValuePair>;
  }
}

export {}