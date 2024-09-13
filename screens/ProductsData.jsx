import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';

const ProductsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQRCode, setSelectedQRCode] = useState(null);
  const qrViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const datacollection = collection(db, 'datacolnew');
        const snapshot = await getDocs(datacollection);
        const fetchedData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  const handleQRCode = (id, price, name) => {
    setSelectedQRCode({ id, price, name });
  };

  const saveQRCode = async () => {
    if (!qrViewRef.current) return;

    try {
      const uri = await captureRef(qrViewRef.current, {
        format: 'png',
        quality: 0.8,
      });

      const fileName = `${new Date().getTime()}.png`;
      const path = `${RNFS.PicturesDirectoryPath}/${fileName}`;

      await RNFS.moveFile(uri, path);
      Alert.alert('Success', `QR code saved to gallery as ${fileName}`);

      // Optionally, you can share the saved image
      await Share.open({ url: `file://${path}` });

    } catch (error) {
      console.error('Error saving QR code:', error);
      Alert.alert('Error', 'Failed to save QR code.');
    }
  };

  const QRCodeWithInfo = ({ id, price, name }) => (
    <View style={styles.qrView}>
      <QRCode
        value={`Price: ${price}\nName: ${name}`}
        size={200}
      />
     
      <Text style={styles.qrInfo}>Price: Rs. {price.toFixed(2)}</Text>
      <Text style={styles.qrInfo}>Name: {name}</Text>
    </View>
  );

  const renderQRCodeModal = () => {
    if (!selectedQRCode) return null;

    const { id, price, name } = selectedQRCode;

    return (
      <Modal
        visible={true}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedQRCode(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.qrView} ref={qrViewRef}>
              <QRCodeWithInfo id={id} price={price} name={name} />
            </View>
            <TouchableOpacity onPress={() => setSelectedQRCode(null)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveQRCode} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save to Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderQRCodeModal()}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            ) : (
              <Text style={styles.noImage}>No Image</Text>
            )}
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.qty}>Supplier: {item.supname}</Text>

            <Text style={styles.qty}>Stock: {item.qty}</Text>

            <Text style={styles.price}>Price Rs. {(item.price + item.commission).toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => handleQRCode(item.id, item.price, item.name)}
            >
              <Text style={styles.qrButtonText}>Display QR</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 100,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  noImage: {
    color: '#888',
    fontSize: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
    textAlign: 'center',
  },
  qty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d0f',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#2a9d8f',
    marginBottom: 5,
  },
  commission: {
    fontSize: 16,
    color: '#e76f51',
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 10,
  },
  qrButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FF0000',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrView: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  qrInfo: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductsData;
