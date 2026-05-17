import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useWardrobe } from './WardrobeContext';
import { AntDesign } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }: any) {
    const { favorites, removeFavorite } = useWardrobe();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Favori Kombinlerim</Text>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.kombinCard}
                        onPress={() => navigation.navigate('KombinDetay', {
                            kombinId: item.id,
                            initialTop: item.top,
                            initialBottom: item.bottom,
                            initialShoes: item.shoe,
                            savedScales: item.scales // BOYUTLARI BURADA GÖNDERİYORUZ
                        })}
                    >
                        <View style={styles.imagesRow}>
                            <Image source={{ uri: item.top.image }} style={styles.miniImg} />
                            <Image source={{ uri: item.bottom.image }} style={styles.miniImg} />
                            <Image source={{ uri: item.shoe.image }} style={styles.miniImg} />
                        </View>

                        <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.deleteBtn}>
                            <AntDesign name="delete" size={20} color="#FF4757" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Henüz favori kombinin yok. ✨</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
    header: { fontSize: 26, fontWeight: 'bold', marginTop: 40, marginBottom: 20, color: '#333' },
    kombinCard: { flexDirection: 'row', padding: 15, backgroundColor: '#F8F9FA', borderRadius: 20, marginBottom: 15, alignItems: 'center', elevation: 2 },
    imagesRow: { flexDirection: 'row', flex: 1, alignItems: 'center' },
    miniImg: { width: 60, height: 60, resizeMode: 'contain', marginRight: 10, backgroundColor: '#eee', borderRadius: 10 },
    deleteBtn: { padding: 10 },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});