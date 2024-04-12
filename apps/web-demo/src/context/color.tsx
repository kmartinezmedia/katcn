'use client';

import fixtures from 'katcn/fixtures';
import { entries } from 'katcn/helpers';
import { defaultTokensConfig } from 'katcn/tokens';
import type {
  Hue,
  HueChroma,
  HueLightness,
  HuesChromaConfig,
  HuesConfig,
  HuesLightnessConfig,
  HueStep,
  UniversalTokensConfig,
} from 'katcn/types';
import { createContext, type SetStateAction, useState } from 'react';

type SetState<T> = React.Dispatch<SetStateAction<T>>;

const noop = () => {};

function createLightnessContexts(config: UniversalTokensConfig) {
  // @ts-expect-error this is fine
  const lightnessContexts: Record<HueStep, React.Context<HueLightness>> = {};
  for (const step of fixtures.hueSteps) {
    const Context = createContext<HueLightness>(config.huesLightness[step]);
    lightnessContexts[step] = Context;
  }
  return lightnessContexts;
}

function createChromaContexts(config: UniversalTokensConfig) {
  // @ts-expect-error this is fine
  const chromaContexts: Record<HueStep, React.Context<HueChroma>> = {};
  for (const step of fixtures.hueSteps) {
    const Context = createContext<HueChroma>(config.huesChroma[step]);
    chromaContexts[step] = Context;
  }
  return chromaContexts;
}

function createHueContexts(config: UniversalTokensConfig) {
  // @ts-expect-error this is fine
  const hueContexts: Record<Hue, React.Context<number>> = {};
  for (const hue of fixtures.hues) {
    const Context = createContext<number>(config.hues[hue]);
    hueContexts[hue] = Context;
  }
  return hueContexts;
}

function createColorContexts(config: UniversalTokensConfig) {
  const contexts = {
    lightness: createLightnessContexts(config),
    chroma: createChromaContexts(config),
    hue: createHueContexts(config),
  };

  const LightnessContext0 = contexts.lightness['0'];
  const LightnessContext1 = contexts.lightness['1'];
  const LightnessContext2 = contexts.lightness['2'];
  const LightnessContext3 = contexts.lightness['3'];
  const LightnessContext4 = contexts.lightness['4'];
  const LightnessContext5 = contexts.lightness['5'];
  const LightnessContext6 = contexts.lightness['6'];
  const LightnessContext7 = contexts.lightness['7'];
  const LightnessContext8 = contexts.lightness['8'];
  const LightnessContext9 = contexts.lightness['9'];
  const LightnessContext10 = contexts.lightness['10'];
  const LightnessContext11 = contexts.lightness['11'];
  const LightnessContext12 = contexts.lightness['12'];
  const LightnessContext13 = contexts.lightness['13'];
  const LightnessContext14 = contexts.lightness['14'];
  const LightnessContext15 = contexts.lightness['15'];

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <LightnessContext0.Provider value={config.huesLightness[0]}>
        <LightnessContext1.Provider value={config.huesLightness[1]}>
          <LightnessContext2.Provider value={config.huesLightness[2]}>
            <LightnessContext3.Provider value={config.huesLightness[3]}>
              <LightnessContext4.Provider value={config.huesLightness[4]}>
                <LightnessContext5.Provider value={config.huesLightness[5]}>
                  <LightnessContext6.Provider value={config.huesLightness[6]}>
                    <LightnessContext7.Provider value={config.huesLightness[7]}>
                      <LightnessContext8.Provider
                        value={config.huesLightness[8]}
                      >
                        <LightnessContext9.Provider
                          value={config.huesLightness[9]}
                        >
                          <LightnessContext10.Provider
                            value={config.huesLightness[10]}
                          >
                            <LightnessContext11.Provider
                              value={config.huesLightness[11]}
                            >
                              <LightnessContext12.Provider
                                value={config.huesLightness[12]}
                              >
                                <LightnessContext13.Provider
                                  value={config.huesLightness[13]}
                                >
                                  <LightnessContext14.Provider
                                    value={config.huesLightness[14]}
                                  >
                                    <LightnessContext15.Provider
                                      value={config.huesLightness[15]}
                                    >
                                      {children}
                                    </LightnessContext15.Provider>
                                  </LightnessContext14.Provider>
                                </LightnessContext13.Provider>
                              </LightnessContext12.Provider>
                            </LightnessContext11.Provider>
                          </LightnessContext10.Provider>
                        </LightnessContext9.Provider>
                      </LightnessContext8.Provider>
                    </LightnessContext7.Provider>
                  </LightnessContext6.Provider>
                </LightnessContext5.Provider>
              </LightnessContext4.Provider>
            </LightnessContext3.Provider>
          </LightnessContext2.Provider>
        </LightnessContext1.Provider>
      </LightnessContext0.Provider>
    );
  };
}

export const LightnessContext = createContext<HuesLightnessConfig>(
  defaultTokensConfig.huesLightness,
);
export const ChromaContext = createContext<HuesChromaConfig>(
  defaultTokensConfig.huesChroma,
);
export const HueContext = createContext<HuesConfig>(defaultTokensConfig.hues);
export const SetLightnessContext =
  createContext<SetState<HuesLightnessConfig>>(noop);
export const SetChromaContext = createContext<SetState<HuesChromaConfig>>(noop);
export const SetHueContext = createContext<SetState<HuesConfig>>(noop);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [lightness, setLightness] = useState<HuesLightnessConfig>(
    defaultTokensConfig.huesLightness,
  );
  const [chroma, setChroma] = useState<HuesChromaConfig>(
    defaultTokensConfig.huesChroma,
  );
  const [hues, setHues] = useState<HuesConfig>(defaultTokensConfig.hues);

  return (
    <SetLightnessContext.Provider value={setLightness}>
      <SetChromaContext.Provider value={setChroma}>
        <SetHueContext.Provider value={setHues}>
          <LightnessContext.Provider value={lightness}>
            <ChromaContext.Provider value={chroma}>
              <HueContext.Provider value={hues}>{children}</HueContext.Provider>
            </ChromaContext.Provider>
          </LightnessContext.Provider>
        </SetHueContext.Provider>
      </SetChromaContext.Provider>
    </SetLightnessContext.Provider>
  );
}
