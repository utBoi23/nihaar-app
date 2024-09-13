import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRCodeScanner = ({ onQRCodeRead }) => {
  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={e => onQRCodeRead(e.data)}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <View style={styles.topContent}>
            <Button title="Cancel" onPress={() => {}} />
          </View>
        }
        bottomContent={
          <View style={styles.bottomContent}>
            <Button title="Scan QR Code" onPress={() => {}} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  bottomContent: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
});

export default QRCodeScanner;
