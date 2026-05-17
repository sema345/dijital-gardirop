import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useWardrobe } from './WardrobeContext';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2; // Ekran genişliğine göre kart boyutunu hesaplıyoruz

export default function IcindekilerScreen({ route, navigation }: any) {
    const { categoryName } = route.params;
    const { items } = useWardrobe();

    // Sadece seçilen kategoriye ait ürünleri filtreliyoruz
    const filteredItems = items.filter((item: any) => item.category === categoryName);

    return (
        <SafeAreaView style={styles.container}>
            {/* ÜST BAR */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{categoryName}</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* KATALOG (GRID) */}
            <FlatList
                data={filteredItems}
                numColumns={2} // Yan yana 2 sütun
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.row} // Satırlar arası boşluk için
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: item.image }} style={styles.productImg} />
                            <View style={styles.colorBadge}>
                                <Text style={styles.colorText}>{item.color}</Text>
                            </View>
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.productName}>{categoryName}</Text>
                            <TouchableOpacity style={styles.favoriteCircle}>
                                <Feather name="heart" size={16} color="#6C63FF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Feather name="box" size={50} color="#DDD" />
                        <Text style={styles.emptyText}>Bu kategoride henüz ürün yok.</Text>
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => navigation.navigate('AddItem')}
                        >
                            <Text style={styles.addBtnText}>Hemen Ekle</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        width: COLUMN_WIDTH,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    imageWrapper: {
        width: '100%',
        height: COLUMN_WIDTH, // Kare şeklinde resim alanı
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImg: {
        width: '85%',
        height: '85%',
        resizeMode: 'contain',
    },
    colorBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    colorText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#666',
    },
    cardInfo: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    favoriteCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F0EFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: '#999',
    },
    addBtn: {
        marginTop: 20,
        backgroundColor: '#6C63FF',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 15,
    },
    addBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});