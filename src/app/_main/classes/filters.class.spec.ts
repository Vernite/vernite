import { Filters } from './filters.class';

describe('filters class', () => {
  it('should contain filters', () => {
    expect(Filters).toBeDefined();

    const properties = Object.getOwnPropertyNames(Filters);

    expect(properties.length).toBeGreaterThan(3);
    expect(
      properties.map((prop) => (Filters as any)[prop]).every((prop) => prop !== null),
    ).toBeTrue();
  });

  it('Should have ONLY_MY_TASKS filter', () => {
    const filter = Filters.ONLY_MY_TASKS(1);
    expect(filter).toBeDefined();
    expect(filter.type).toBe('checkbox');
    expect(filter.label).toBe($localize`Only my tasks`);
    expect(filter.options).toBeDefined();
    expect(filter.options[1]).toBeDefined();
    expect(filter.options[1]?.assigneeId).toBe(1);
    expect(filter.options[0]).toBeDefined();
    expect(filter.options[0]?.assigneeId).toBeUndefined();
  });
});
