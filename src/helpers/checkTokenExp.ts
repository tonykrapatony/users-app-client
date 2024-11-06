const checkTokenExpiration= (token: string): boolean => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

export default checkTokenExpiration