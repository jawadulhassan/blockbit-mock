import React, { PureComponent } from 'react';
import {
  Page,
  Text,
  View,
  Font,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

import QR from './pdfAssets/qr.png';
import LOGO from './pdfAssets/logo-dark.jpg';

export default class PDF extends PureComponent {
  render() {
    return (
      <Document>
        <Page style={styles.body}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Image style={styles.imageLogo} src={LOGO} />
            </View>
            <View style={styles.secColumnn}>
              <Text style={styles.invoice}>Invoice</Text>
            </View>
          </View>
          <View style={styles.detail}>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>Invoice#</Text>
                  </View>
                  <View style={styles.innerCol}>
                    <Text style={styles.detailText}>LH.5478 </Text>
                  </View>
                </View>
              </View>
              <View style={styles.secColumn}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>BlockBit Inc.</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>Issue Date:</Text>
                  </View>
                  <View style={styles.innerCol}>
                    <Text style={styles.detailText}>Aug 8,2020</Text>
                  </View>
                </View>
              </View>
              <View style={styles.secColumn}>
                <Text style={styles.detailText}>
                  201 Spear Street, San Francisco CA 1950
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>Status:</Text>
                  </View>
                  <View style={styles.innerCol}>
                    <Text style={styles.paidText}>Paid </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Bill To</Text>
          </View>
          <View style={styles.detail}>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>Client:</Text>
                  </View>
                  <View style={styles.innerCol}>
                    <Text style={styles.detailText}>Jhon Ellen </Text>
                  </View>
                </View>
              </View>
              <View style={styles.secColumn}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>Billing Date:</Text>
                  </View>
                  <View style={styles.innerCol}>
                    <Text style={styles.detailText}>Sep 8,2020</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <View style={styles.row}>
                  <View style={styles.innerCol}>
                    <Text style={styles.headDetail}>Cell#</Text>
                  </View>
                  <View style={styles.innerCol}>
                    <Text style={styles.detailText}>+1952552358</Text>
                  </View>
                </View>
              </View>
              <View style={styles.secColumn}>
                <Text style={styles.headDetail}>Billing Address:</Text>
                <Text style={styles.detailText}>
                  201 Spear Street, San Francisco CA 1950
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Membership</Text>
          </View>
          <View style={styles.detail}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.headerText}>Package</Text>
              </View>
              <View style={styles.secColumn}>
                <Text style={styles.headerText}>Price</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.headerText}>Duration</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.detailText}>Premium</Text>
              </View>
              <View style={styles.secColumn}>
                <Text style={styles.detailText}>199 USD</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.detailText}>Monthly</Text>
              </View>
            </View>
          </View>
          <View style={styles.endRow}>
            <View style={styles.column}>
              <Text style={styles.headDetail}>This Has Been Paid</Text>
              <Text style={styles.endDetailText}>
                Your card has already been charged and no further action is
                required on your part.
              </Text>
            </View>
            <View style={styles.midColumn}>
              <Image style={styles.imageQR} src={QR} />
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}

Font.register({
  family: 'OpenSans-Bold',
  src:
    ' https://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzInF5uFdDttMLvmWuJdhhgs.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  innerCol: {
    flex: 0,
    marginRight: '5px',
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#132b66',
    fontFamily: 'OpenSans-Bold',
    paddingBottom: '10px',
    paddingTop: '10px',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
  },
  imageLogo: {
    paddingBottom: '10px',
    width: '40%',
    height: 'auto',
    // left: "20px",
  },
  imageQR: {
    paddingBottom: '10px',
    width: '70px',
    height: '80px',
    // left: "20px",
  },
  viewer: {
    width: '100%',
    height: '80vh',
  },
  invoice: {
    color: '#132b66',
    fontFamily: 'OpenSans-Bold',
    marginRight: '20px',
  },

  column: {
    flex: 1,
    justifyContent: 'left',
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  secColumn: {
    flex: 1,
    justifyContent: 'right',
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginRight: '20px',
  },
  midColumn: {
    flex: 1,
    alignItems: 'right',
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginRight: '20px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '5px',
    paddingBottom: '7px',
  },
  detail: {
    marginTop: '20px',
    backgroundColor: '#F2F3F4 ',
    position: 'relative',
  },
  headDetail: {
    color: '#132b66',
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: 'OpenSans-Bold',
  },
  detailText: {
    color: '#132b66',
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: '3px',
  },
  headerText: {
    color: '#132b66',
    fontSize: 12,
    padding: 1,
    fontFamily: 'OpenSans-Bold',
  },
  paidText: {
    color: '#1ce0e2',
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: '3px',
  },
  endDetailText: {
    color: '#132b66',
    fontSize: 12,
    marginBottom: '5px',
    marginTop: '10px',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '30px',
    backgroundColor: '#D0D3D4',
  },
  endRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '50px',
  },
});
