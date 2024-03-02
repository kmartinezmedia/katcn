import type { ElevationConfig } from '../types/tokens';

const lightElevation: ElevationConfig = {
  '1': [
    {
      color: 'rgba(0, 0, 0, 0.08)',
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      spreadRadius: 0,
    },
    {
      color: 'rgba(0, 0, 0, 0.10)',
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0,
    },
  ],
  '2': [
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 4,
      blurRadius: 8,
      spreadRadius: 0,
    },
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0,
    },
  ],
  '3': [
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 4,
      blurRadius: 16,
      spreadRadius: 0,
    },
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 0,
      blurRadius: 2,
      spreadRadius: 0,
    },
  ],
};

const darkElevation: ElevationConfig = {
  '1': [
    {
      color: 'rgba(0, 0, 0, 0.08)',
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      spreadRadius: 0,
    },
    {
      color: 'rgba(0, 0, 0, 0.10)',
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0,
    },
  ],
  '2': [
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 4,
      blurRadius: 8,
      spreadRadius: 0,
    },
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 0,
      blurRadius: 1,
      spreadRadius: 0,
    },
  ],
  '3': [
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 4,
      blurRadius: 16,
      spreadRadius: 0,
    },
    {
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 0,
      blurRadius: 2,
      spreadRadius: 0,
    },
  ],
};

export { lightElevation, darkElevation };
