import { kuzuStory } from './kuzu';

export const stories: Record<string, string> = {
  kuzu: kuzuStory,
  // Add more stories here as they're created
};

export function getStoryById(id: string): string | undefined {
  return stories[id];
}

export function hasStory(id: string): boolean {
  return id in stories;
}
