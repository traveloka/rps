import faker from 'faker';

export function fetchUser(id) {
  const mockData = {
    id,
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id % 3 === 0) reject('Failed fetch user');
      else resolve(mockData);
    }, 3000);
  });
}
