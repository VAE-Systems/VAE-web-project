import { searchKnowledgeBase } from './knowledgeBase';

describe('searchKnowledgeBase', () => {
  it('returns a canned answer for contact questions', () => {
    const result = searchKnowledgeBase('Wie kann ich Kontakt aufnehmen?');
    expect(result).toMatch(/info@vae-systems.de/);
  });
});
