import faker from 'faker';

export function fetchUsers() {
  const mockData = Array(100)
    .fill(0)
    .map((_, idx) => ({
      id: idx,
      name: faker.name.findName(),
    }));
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(mockData), 3000);
  });
}
