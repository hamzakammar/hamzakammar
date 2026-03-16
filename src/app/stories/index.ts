import { kuzuStory } from './kuzu';
import { chessStory } from './chess';
import { horizonStory } from './horizon';
import { unimapStory } from './unimap';
import { mapflowStory } from './mapflow';
import { ccStory } from './CC';
import { dealishStory } from './dealish';
import { neodevStory } from './neodev';
import { uwStory } from './uw';

export const stories: Record<string, string> = {
  kuzu: kuzuStory,
  chess: chessStory,
  horizon: horizonStory,
  unimap: unimapStory,
  mapflow: mapflowStory,
  cc: ccStory,
  dealish: dealishStory,
  neodev: neodevStory,
  uw: uwStory,
};

export function getStoryById(id: string): string | undefined {
  return stories[id];
}

export function hasStory(id: string): boolean {
  return id in stories;
}
