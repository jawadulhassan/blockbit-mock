import React, { FC, useState, Fragment } from 'react';

import {
  FlexRow,
  FlexContainer,
  FlexColumnWrap,
  NotificationDivider,
  NotificationOptionContainer,
} from 'shared/commonStyles';

import Toggler from 'components/widgets/Toggler';

const NotificationComponent: FC<any> = (): any => {
  const [buyToggle, setBuyToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [profitToggle, setProfitToggle] = useState(false);
  const [subscribeToggle, setSubscribeToggle] = useState(false);

  const handleBuyToggle = (): void => setBuyToggle(!buyToggle);
  const handleUpdateToggle = (): void => setUpdateToggle(!updateToggle);
  const handleProfitToggle = (): void => setProfitToggle(!profitToggle);
  const handleSubscribeToggle = (): void =>
    setSubscribeToggle(!subscribeToggle);

  return (
    <Fragment>
      <FlexRow className="my-3">
        <FlexColumnWrap>
          <NotificationOptionContainer>
            <FlexContainer>
              <FlexColumnWrap flex={1}>
                <FlexRow className="px-2">
                  <FlexColumnWrap flex={0.15}>
                    <img src="/static/svgs/buy-sell.svg" alt="icon" />
                  </FlexColumnWrap>
                  <FlexColumnWrap flex={1}>Buy & Sell</FlexColumnWrap>
                  <FlexColumnWrap flex={0.13}>
                    <Toggler
                      sm={true}
                      id="buy"
                      isOn={buyToggle}
                      handleToggle={handleBuyToggle}
                      nostyle={{ position: 'absolute', marginTop: '6px' }}
                    />
                  </FlexColumnWrap>
                </FlexRow>
              </FlexColumnWrap>
              <FlexColumnWrap flex={1}>
                <FlexRow>
                  <FlexColumnWrap flex={0.1}>
                    <NotificationDivider />
                  </FlexColumnWrap>
                  <FlexColumnWrap flex={0.14}>
                    <img src="/static/svgs/system-update.svg" alt="icon" />
                  </FlexColumnWrap>

                  <FlexColumnWrap flex={1}>System Updates</FlexColumnWrap>

                  <FlexColumnWrap flex={0.13}>
                    <Toggler
                      sm={true}
                      id="update"
                      isOn={updateToggle}
                      handleToggle={handleUpdateToggle}
                      nostyle={{ position: 'absolute', marginTop: '6px' }}
                    />
                  </FlexColumnWrap>
                </FlexRow>
              </FlexColumnWrap>
            </FlexContainer>
          </NotificationOptionContainer>
          <NotificationOptionContainer>
            <FlexContainer>
              <FlexColumnWrap flex={1}>
                <FlexRow className="px-2">
                  <FlexColumnWrap flex={0.15}>
                    <img src="/static/svgs/profit-loss.svg" alt="icon" />
                  </FlexColumnWrap>
                  <FlexColumnWrap flex={1}>Profit & Loss</FlexColumnWrap>

                  <FlexColumnWrap flex={0.13}>
                    <Toggler
                      sm={true}
                      id="profit"
                      isOn={profitToggle}
                      handleToggle={handleProfitToggle}
                      nostyle={{ position: 'absolute', marginTop: '6px' }}
                    />
                  </FlexColumnWrap>
                </FlexRow>
              </FlexColumnWrap>
              <FlexColumnWrap flex={1}>
                <FlexRow>
                  <FlexColumnWrap flex={0.1}>
                    <NotificationDivider />
                  </FlexColumnWrap>
                  <FlexColumnWrap flex={0.14}>
                    <img src="/static/svgs/subscribe.svg" alt="icon" />
                  </FlexColumnWrap>

                  <FlexColumnWrap flex={1}>
                    Would you like to subscribe to our Newsletter ?
                  </FlexColumnWrap>

                  <FlexColumnWrap flex={0.13}>
                    <Toggler
                      sm={true}
                      id="subscribe"
                      isOn={subscribeToggle}
                      handleToggle={handleSubscribeToggle}
                      nostyle={{ position: 'absolute', marginTop: '6px' }}
                    />
                  </FlexColumnWrap>
                </FlexRow>
              </FlexColumnWrap>
            </FlexContainer>
          </NotificationOptionContainer>
        </FlexColumnWrap>
      </FlexRow>
    </Fragment>
  );
};

export default NotificationComponent;
