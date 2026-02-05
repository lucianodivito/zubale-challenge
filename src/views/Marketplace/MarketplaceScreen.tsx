import React from 'react';
import useMarketplaceViewController from './useMarketplaceViewController';
import MarketplaceView from './MarketplaceView';

const MarketplaceScreen: React.FC = () => {
  const props = useMarketplaceViewController();
  return <MarketplaceView {...props} />;
};

export default MarketplaceScreen;
