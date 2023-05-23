import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Center, Button, Modal, AddIcon} from 'native-base';

const UploadImage = props => {
  const [image, setImage] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const addCameraImage = async () => {
    setShowModal(false);
    let _image = await launchCamera({mediaType: 'photo'});
    if (!_image.didCancel) {
      setImage(_image.assets[0].uri);
    }
  };

  const addGalleryImage = async () => {
    setShowModal(false);
    let _image = await launchImageLibrary({mediaType: 'photo'});
    if (!_image.didCancel) {
      setImage(_image.assets[0].uri);
    }
  };

  useEffect(() => {
    props.imagePull(image, 'imageUrl');
  }, [image]);

  return (
    <View style={imageUploaderStyles.container}>
      {(image || props.imageSource) && (
        <Image
          source={{
            uri: image || props.imageSource,
          }}
          style={{width: 200, height: 200}}
        />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={imageUploaderStyles.uploadBtn}>
          <Text>{image || props.imageSource ? 'Edit' : 'Upload'} Image</Text>
          <AddIcon />
        </TouchableOpacity>
      </View>
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Choose Picture</Modal.Header>
            <Modal.Body>
              <Button
                onPress={() => addCameraImage()}
                backgroundColor={'#b3d9ff'}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Camera</Text>
              </Button>
              <Button
                mt="3"
                onPress={() => addGalleryImage()}
                backgroundColor={'#b3d9ff'}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Gallery
                </Text>
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadImage;
