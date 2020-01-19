const serviceUrl = 'https://api.github.com';
const trendingUrl = 'https://github.com';

const servicePathDEV = {
  searchHot: (name) => `${serviceUrl}/search/repositories?q=${name}&sort=stars`,
  getTrending: (since) => `${trendingUrl}/trending?since=${since}`
};

export default servicePathDEV;
