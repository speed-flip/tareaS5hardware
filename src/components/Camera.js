import { StyleSheet, View } from 'react-native';
import { useState, useRef } from 'react';

import { Camera, CameraType } from 'expo-camera';

import CustomButton from './Button';


const Camara = ({ setImage, setTakeFoto }) => {
  const [type, setType] = useState(CameraType.back);

  const camaraRef = useRef(null);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (camaraRef) {
      try {
        const data = await camaraRef.current.takePictureAsync();
        setImage(data.uri);
        setTakeFoto(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={camaraRef}
    >
      <View style={{
        marginTop: 35,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <CustomButton
          icon='cross'
          onPress={() => setTakeFoto(false)}
        />
        <CustomButton
          icon='retweet'
          onPress={toggleCameraType}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text='Tomar una foto'
          icon='camera'
          onPress={takePicture}
        />
      </View>
    </Camera>
  );
}


const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'relative',
    flexDirection: 'row',
    top: 570,
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
});

export default Camara;