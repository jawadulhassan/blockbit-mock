import React, { Fragment, useState, FC } from 'react';

import {
  LinkText,
  LightText,
  BolderText,
  FlexColumn,
  LargeDivider,
  AlignedCenter,
  ScreenWrapper,
  FlexedReverse,
  ContentWrapper,
  FlexedBetweenSeventy,
} from 'shared/commonStyles';

import Pointers from 'components/widgets/Pointers';
import SearchBox from 'components/widgets/SearchBox';
import ScreenHeader from 'components/widgets/ScreenHeader';

import StepLearning from './StepsLearning';
import SimpleLearning from './SimpleLearning';

const Learn: FC<{}> = (): any => {
  const [displayModule, setDisplayModule] = useState(null);
  return (
    <ScreenWrapper>
      <ScreenHeader header="Learn" />
      <FlexedReverse>
        <FlexedBetweenSeventy>
          <AlignedCenter>
            <SearchBox />
          </AlignedCenter>
        </FlexedBetweenSeventy>
      </FlexedReverse>
      <ContentWrapper>
        {!displayModule ? (
          <ParentScreen {...{ setDisplayModule }} />
        ) : (
          <HandleExtendedScreen {...{ displayModule, setDisplayModule }} />
        )}
      </ContentWrapper>
    </ScreenWrapper>
  );
};

const HandleExtendedScreen: FC<any> = ({ displayModule }: any): any => {
  if (displayModule === 'dashboard') {
    return (
      <SimpleLearning
        title="Dashboard"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nunc pellentesque tincidunt tempus. Nunc sed at ultricies eleifend lorem tellus tortor. Ultrices sed vitae augue facilisis pellentesque pellentesque. Blandit at mauris, tempus pharetra, id diam diam."
      />
    );
  }
  if (displayModule === 'bot') {
    return (
      <StepLearning
        title="Bot"
        steps={[
          {
            step: 'Bot',
            number: 1,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Bot2',
            number: 2,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Bot3',
            number: 3,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Bot4',
            number: 4,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
        ]}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nunc pellentesque tincidunt tempus. Nunc sed at ultricies eleifend lorem tellus tortor. Ultrices sed vitae augue facilisis pellentesque pellentesque. Blandit at mauris, tempus pharetra, id diam diam."
      />
    );
  }
  if (displayModule === 'history') {
    return (
      <SimpleLearning
        title="History"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nunc pellentesque tincidunt tempus. Nunc sed at ultricies eleifend lorem tellus tortor. Ultrices sed vitae augue facilisis pellentesque pellentesque. Blandit at mauris, tempus pharetra, id diam diam."
      />
    );
  }
  if (displayModule === 'portfolio') {
    return (
      <SimpleLearning
        title="Portfolio"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nunc pellentesque tincidunt tempus. Nunc sed at ultricies eleifend lorem tellus tortor. Ultrices sed vitae augue facilisis pellentesque pellentesque. Blandit at mauris, tempus pharetra, id diam diam."
      />
    );
  }
  if (displayModule === 'exchanges') {
    return (
      <StepLearning
        title="Exchanges"
        steps={[
          {
            step: 'Exchanges',
            number: 1,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Exchanges2',
            number: 2,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Exchanges3',
            number: 3,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Exchanges4',
            number: 4,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
          {
            step: 'Exchanges5',
            number: 5,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra sed malesuada dictum proin molestie. Quis scelerisque feugiat pellentesque quis. Quis dictum molestie dignissim posuere gravida. Orci, a turpis consectetur blandit dui.',
          },
        ]}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nunc pellentesque tincidunt tempus. Nunc sed at ultricies eleifend lorem tellus tortor. Ultrices sed vitae augue facilisis pellentesque pellentesque. Blandit at mauris, tempus pharetra, id diam diam."
      />
    );
  }
  if (displayModule === 'settings') {
    return <h1>settings</h1>;
  }
};

const ParentScreen: FC<any> = ({ setDisplayModule }: any): any => {
  return (
    <Fragment>
      <img src="/static/svgs/block-box-logo.svg" alt="block-icon" />
      <BolderText className="m-3" fontSize="20px" lineHeight="27px">
        <b>Introduction</b>
      </BolderText>
      <div style={{ width: '48%', marginBottom: 107 }}>
        <LightText fontSize="18px" lineHeight="25px">
          We bring an opportunity to
          <strong> professional traders & specially beginners</strong> to
          utilize their assets from crypto exchanges in crypto market without
          trading expertise. <LinkText>Read More...</LinkText>
        </LightText>
      </div>
      <FlexedBetweenSeventy width="80%" alignItems="flex-start">
        <FlexColumn className="w-40">
          <Pointers
            label="Dashboard"
            onClick={(): void => setDisplayModule('dashboard')}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
          <Pointers
            label="Bot"
            onClick={(): void => setDisplayModule('bot')}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
          <Pointers
            label="History"
            onClick={(): void => setDisplayModule('history')}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
        </FlexColumn>
        <LargeDivider className="w-20" height="244px" />
        <FlexColumn className="w-40" style={{ alignItems: 'flex-end' }}>
          <Pointers
            label="Crypto Portfolio"
            onClick={(): void => setDisplayModule('portfolio')}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
          <Pointers
            label="Exchanges"
            onClick={(): void => setDisplayModule('exchanges')}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
          <Pointers
            label="Settings"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
        </FlexColumn>
      </FlexedBetweenSeventy>
    </Fragment>
  );
};

export default Learn;
