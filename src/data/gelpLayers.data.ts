export type GelpLayerAccent = 'orange' | 'white' | 'green';

export interface GelpLayer {
  id: string;
  number: string;
  title: string;
  accent: GelpLayerAccent;
}

export const GELP_LAYERS_LABEL = 'What sits inside GELP';

export const GELP_LAYERS: GelpLayer[] = [
  { id: 'human-interface', number: '01', title: 'Human Interface+', accent: 'orange' },
  { id: 'technology', number: '02', title: 'Technology+', accent: 'white' },
  { id: 'esg-sustainability', number: '03', title: 'ESG-Sustainability+', accent: 'green' },
  { id: 'market-integrated', number: '04', title: 'Market Integrated', accent: 'orange' },
];
