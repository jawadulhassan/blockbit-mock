import React from 'react';
import TechnicalAnalysis from 'react-tradingview-technical-analysis';

// import { pairDivider } from 'shared/helpers';

const AnalysisView = ({ selectedMarket }) => {
  // const { first } = pairDivider(selectedMarket);

  // const [market, setMarket] = useState(first);

  // useEffect(() => {
  //   const { first } = pairDivider(selectedMarket);
  //   setMarket(first);
  // }, [selectedMarket]);

  return (
    <TechnicalAnalysis
      key={selectedMarket}
      height={500}
      width="100%"
      symbol={selectedMarket}
    />
  );
};

export default AnalysisView;
