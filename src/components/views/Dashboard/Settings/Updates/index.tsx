import React, { FC } from 'react';

import {
  Thead,
  TableRowColored,
  TableWithSpacer,
  TableDetailCustom,
} from 'shared/commonStyles';

import UpdatePopup from './UpdatesPopup';

const tableData = [
  {
    name: 'UpdateName',
    desc:
      'Hello this is an example of a long descriptions I am going out of my limits and you will see it happening',
    date: 'Sep 20, 2020',
    status: 'Updated',
  },
  {
    name: 'UpdateName',
    desc: 'Hello this is an example of a long descriptions',
    date: 'Sep 20, 2020',
    status: 'Updated',
  },
  {
    name: 'UpdateName',
    desc: 'Hello this is an example of a long descriptions',
    date: 'Sep 20, 2020',
    status: 'Updated',
  },
];
const UpdatesComponent: FC<any> = (): any => {
  const [openUpdatePopup, setOpenUpdatePopup] = React.useState(false);

  const toggleUpdatePopUp = (): void => {
    setOpenUpdatePopup(!openUpdatePopup);
  };

  return (
    <React.Fragment>
      <UpdatePopup open={openUpdatePopup} toggle={toggleUpdatePopUp} />
      <TableWithSpacer>
        <Thead>
          <TableRowColored>
            <TableDetailCustom width="12vw" padding="0 0 0 30px">
              Name
            </TableDetailCustom>
            <TableDetailCustom width="35vw">Description</TableDetailCustom>
            <TableDetailCustom width="10vw">Status</TableDetailCustom>
            <TableDetailCustom width="10vw">Modified</TableDetailCustom>
            <TableDetailCustom width="10vw">Actions</TableDetailCustom>
          </TableRowColored>
        </Thead>
        <tbody>
          {tableData.map((event: any, item: any): any => (
            <TableRowColored key={item} color="#FFFFFF">
              <TableDetailCustom width="12vw" padding="0 0 0 30px">
                {event.name}
              </TableDetailCustom>
              <TableDetailCustom width="35vw">{event.desc}</TableDetailCustom>
              <TableDetailCustom width="10vw">{event.status}</TableDetailCustom>
              <TableDetailCustom width="10vw">{event.date}</TableDetailCustom>
              <TableDetailCustom
                pointer={true}
                width="10vw"
                color="#1CE0E2"
                onClick={toggleUpdatePopUp}
              >
                View Details
              </TableDetailCustom>
            </TableRowColored>
          ))}
        </tbody>
      </TableWithSpacer>
    </React.Fragment>
  );
};

export default UpdatesComponent;
