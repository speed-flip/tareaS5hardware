import { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, Button } from 'react-native';

import { Camera } from 'expo-camera';

import * as MediaLibrary from 'expo-media-library';

import CustomCamara from './src/components/Camera';

function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState('');
  const [takeFoto, setTakeFoto] = useState(false);

  useEffect(() => {
    requestPermissionMedia();
    async function requestPermissionMedia() {
      await MediaLibrary.requestPermissionsAsync();
    }
  }, []);

  if (!permission) {
    return <Text>No Permisos</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textPermiso}>
          Se requiere permisos para usar la camara
        </Text>
        <Button onPress={requestPermission} title="Dar permiso" />
      </View>
    );
  }

  if (image) {
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Imagen tomada</Text>
          <Image source={{ uri: image }} width={150} height={200} />

          <View style={{ marginTop: 15 }}>
            <Button
              onPress={() => {
                setImage('');
                setTakeFoto(true);
              }}
              title="Tomar otra vez"
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {takeFoto ? <CustomCamara setImage={setImage} setTakeFoto={setTakeFoto} /> : (
        <View style={{ marginHorizontal: 15, }}>
          <Text style={styles.textoPermiso}>
            Permiso concedido
          </Text>
          <Text style={styles.text}>
            Permiso concedido: {permission.status}
          </Text>
          <Button onPress={() => setTakeFoto(true)} title="Tomar Foto" />
        </View>
      )}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textoPermiso: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});
