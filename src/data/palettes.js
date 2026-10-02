import { SLICE_COLORS } from './categories';

export const PALETTES = [
  { id: 'default', name: 'Klasik', pro: false, colors: SLICE_COLORS },
  { id: 'ocean', name: 'Okyanus', pro: true, colors: ['#0077B6', '#00B4D8', '#48CAE4', '#90E0EF', '#023E8A', '#0096C7'] },
  { id: 'sunset', name: 'Gün Batımı', pro: true, colors: ['#FF595E', '#FF924C', '#FFCA3A', '#C77DFF', '#9D4EDD', '#F15BB5'] },
  { id: 'neon', name: 'Neon', pro: true, colors: ['#FF00E5', '#00F5D4', '#FEE440', '#9B5DE5', '#00BBF9', '#F15BB5'] },
];

export const getPalette = (id) => PALETTES.find((p) => p.id === id) ?? PALETTES[0];
