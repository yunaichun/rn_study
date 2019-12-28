const serviceUrl = 'https://api.github.com';

const servicePathPRD = {
  search: (name) => `${serviceUrl}/search/repositories?q=${name}&sort=stars`,
};

export default servicePathPRD;
