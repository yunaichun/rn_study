const serviceUrl = 'https://api.github.com';

const servicePathDEV = {
  search: (name) => `${serviceUrl}/search/repositories?q=${name}&sort=stars`,
};

export default servicePathDEV;
