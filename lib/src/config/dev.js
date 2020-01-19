const serviceUrl = 'https://api.github.com';
const trendingUrl = 'https://github.com';

const servicePath = {
  searchHot: (name) => `${serviceUrl}/search/repositories?q=${name}&sort=stars`,
  getTrending: (name, since) => `${trendingUrl}/trending/${name}?since=${since}`
};

export default servicePath;
