import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WardrobeProvider } from './WardrobeContext';

// Sayfalarını import et (Dosya isimlerinin doğru olduğundan emin ol!)
import HomeScreen from './homeScreen';
import AddItemScreen from './addItem'; // Küçük/büyük harf dikkat: addItem.tsx
import IcindekilerScreen from './icindekiler'; // Küçük/büyük harf dikkat: icindekiler.tsx
import KombinOlusturScreen from './KombinOlusturScreen';
import KombinDetay from './KombinDetayScreen';
import KombinDetayScreen from './KombinDetayScreen';
import Favorites from './FavoritesScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WardrobeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* Ana Sayfa */}
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* Yeni Kıyafet Ekleme Sayfası */}
          <Stack.Screen name="AddItem" component={AddItemScreen} />

          {/* TEK BİR İÇİNDEKİLER SAYFASI 
              Artık her kategori (üst, alt, ayakkabı) bu ekrana gidecek.
          */}
          <Stack.Screen name="Icindekiler" component={IcindekilerScreen} />
          <Stack.Screen name="KombinOlustur" component={KombinOlusturScreen} />
          <Stack.Screen name="KombinDetay" component={KombinDetayScreen} />
          <Stack.Screen name="Favorites" component={Favorites} />

        </Stack.Navigator>
      </NavigationContainer>
    </WardrobeProvider>
  );
}