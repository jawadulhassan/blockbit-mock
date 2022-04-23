import React, { FC } from 'react';
import { format } from 'date-fns';
import startCase from 'lodash/startCase';

import { FlexRow, BolderText } from 'shared/commonStyles';

const Table: FC<any> = ({ summaryTableData }: any): any => {
  return (
    <div className="table-responsive mt-4">
      <FlexRow alignItems="center" padding="14px 50px" justifyContent="center">
        <BolderText fontSize="20px">Summary</BolderText>
      </FlexRow>
      <table className="table data-table">
        <tbody>
          {Object.keys(summaryTableData).map((key: any, index: number): any => {
            return (
              key !== 'endDate' &&
              key !== 'startDate' &&
              key !== 'clientID' &&
              key !== 'requestID' &&
              key !== 'resultID' && (
                <tr key={index}>
                  <td
                    style={{
                      fontWeight: 600,
                      textAlign: 'left',
                      paddingLeft: 20,
                      borderRight:
                        '1px solid rgba(166, 166, 166, 0.44) !important',
                    }}
                  >
                    {startCase(key)}
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      border: '1px solid rgba(166, 166, 166, 0.44) !important',
                    }}
                  >
                    {summaryTableData[key]}
                  </td>
                </tr>
              )
            );
          })}
          {summaryTableData['startDate'] && (
            <tr>
              <td
                style={{
                  fontWeight: 600,
                  textAlign: 'left',
                  paddingLeft: 20,
                  borderRight: '1px solid rgba(166, 166, 166, 0.44) !important',
                }}
              >
                {startCase('startDate')}
              </td>
              <td
                style={{
                  textAlign: 'right',
                  border: '1px solid rgba(166, 166, 166, 0.44) !important',
                }}
              >
                {format(new Date(summaryTableData['startDate']), 'yyyy-MM-dd')}
              </td>
            </tr>
          )}
          {summaryTableData['endDate'] && (
            <tr>
              <td
                style={{
                  fontWeight: 600,
                  textAlign: 'left',
                  paddingLeft: 20,
                  borderRight: '1px solid rgba(166, 166, 166, 0.44) !important',
                }}
              >
                {startCase('endDate')}
              </td>
              <td
                style={{
                  textAlign: 'right',
                  border: '1px solid rgba(166, 166, 166, 0.44) !important',
                }}
              >
                {format(new Date(summaryTableData['endDate']), 'yyyy-MM-dd')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
