export const getWatchlist = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('watchlist') || '';
  }
  return '';
};

export const addToWatchlist = (address: string) => {
  const originalWatchlist = getWatchlist();
  if (!originalWatchlist) {
    localStorage.setItem('watchlist', address);
    return true;
  }
  if (originalWatchlist.indexOf(address) >= 0) {
    return false;
  }
  localStorage.setItem('watchlist', `${originalWatchlist},${address}`);
  return true;
};
