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
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const DATA = [
    { id: '1', title: 'topuklu ayakkabı', price: '299 TL', image: require('./assets/icon.png') },
    { id: '2', title: 'spor ayakkabı', price: '549 TL', image: require('./assets/icon.png') },
    { id: '3', title: 'Mavi Kot Ceket', price: '899 TL', image: require('./assets/icon.png') },
    { id: '4', title: 'Oversize Gömlek', price: '450 TL', image: require('./assets/icon.png') },
    { id: '5', title: 'Keten Bluz', price: '380 TL', image: require('./assets/icon.png') },
    { id: '6', title: 'Desenli Crop Top', price: '220 TL', image: require('./assets/icon.png') },
    { id: '7', title: 'V Yaka Kazak', price: '410 TL', image: require('./assets/icon.png') },
    { id: '8', title: 'Deri Ceket', price: '1299 TL', image: require('./assets/icon.png') },
];

export default function IcindekilerScreen({ navigation }: any) {

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.favoriteBtn}>
                    <AntDesign name="hearto" size={20} color="#ff4757" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ayakkabı</Text>
            </View>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                // iOS'ta kaydırmayı garantiye alan kısım
                contentContainerStyle={styles.flatListContent}
                style={styles.listBase}
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    listBase: {
        flex: 1, // iOS'ta listenin alanı kaplamasını sağlar
    },
    flatListContent: {
        paddingHorizontal: 8,
        paddingTop: 10,
        paddingBottom: 40, // En alttaki kartın rahat görünmesi için
        flexGrow: 1, // İçerik az olsa bile kaydırma mekanizmasını canlı tutar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#fff',
        // Header'ın alt çizgisi
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        flex: 0.5,
        margin: 8,
        // iOS Gölgelendirme
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Android Gölgelendirme
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: 'cover',
        backgroundColor: '#f0f0f0',
    },
    cardInfo: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    cardPrice: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    favoriteBtn: {
        padding: 5,
    },
});