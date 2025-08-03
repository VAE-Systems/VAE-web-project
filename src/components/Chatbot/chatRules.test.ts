import { applyRules } from './chatRules';

describe('applyRules', () => {
  it('suggests demo use cases when demo is requested', () => {
    const res = applyRules('Zeig mir eine Demo', { stage: 'generic' });
    expect(res).not.toBeNull();
    expect(res?.useCases).toBeDefined();
  });
});
