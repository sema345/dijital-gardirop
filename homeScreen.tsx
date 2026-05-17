import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {

    // Navigasyon fonksiyonları
    const goToCategory = (name: string) => navigation.navigate('Icindekiler', { categoryName: name });
    const gotoItem = () => navigation.navigate('AddItem');
    const goToKombin = () => navigation.navigate('KombinOlustur');
    const goToFavorites = () => navigation.navigate('Favorites');

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FFF' }} />
            <StatusBar style="dark" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* ÜST HEADER - Karşılama */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Günaydın, Sema 👋</Text>
                        <Text style={styles.subGreeting}>Bugün stilini konuşturma zamanı.</Text>
                    </View>
                    <TouchableOpacity style={styles.profileCircle}>
                        <Feather name="user" size={24} color="#6C63FF" />
                    </TouchableOpacity>
                </View>

                {/* ÖNE ÇIKAN KART - Kombin Yap */}
                <TouchableOpacity style={styles.featuredCard} onPress={goToKombin}>
                    <View style={styles.featuredTextContent}>
                        <Text style={styles.featuredTitle}>Stil Danışmanı</Text>
                        <Text style={styles.featuredSub}>Parçaları birleştir ve mükemmel kombini bul.</Text>
                        <View style={styles.featuredBtn}>
                            <Text style={styles.featuredBtnText}>Hemen Dene</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name="auto-fix" size={80} color="rgba(255,255,255,0.3)" style={styles.featuredIcon} />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Gardırobunu Keşfet</Text>

                {/* KATEGORİ KARTLARI */}
                <View style={styles.categoryGrid}>
                    {/* Üst Giyim */}
                    <TouchableOpacity onPress={() => goToCategory('Üst Giyim')} style={styles.imageCard}>
                        <Image source={require('./fotolar/ust.jpg')} style={styles.cardImg} resizeMode="cover" />
                        <View style={styles.cardOverlay}>
                            <Text style={styles.cardText}>Üst Giyim</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Alt Giyim */}
                    <TouchableOpacity onPress={() => goToCategory('Alt Giyim')} style={styles.imageCard}>
                        <Image source={require('./fotolar/esofman.jpg')} style={styles.cardImg} resizeMode="cover" />
                        <View style={styles.cardOverlay}>
                            <Text style={styles.cardText}>Alt Giyim</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Ayakkabı */}
                    <TouchableOpacity onPress={() => goToCategory('Ayakkabı')} style={styles.imageCard}>
                        <Image source={require('./fotolar/ayakkabi.jpg')} style={styles.cardImg} resizeMode="cover" />
                        <View style={styles.cardOverlay}>
                            <Text style={styles.cardText}>Ayakkabı</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* MODERN TAB BAR */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
                    <Feather name="grid" size={24} color="#6C63FF" />
                    <Text style={[styles.tabText, { color: '#6C63FF' }]}>Vitrin</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={goToFavorites}>
                    <Feather name="heart" size={24} color="#A0A0A0" />
                    <Text style={styles.tabText}>Favoriler</Text>
                </TouchableOpacity>

                {/* ORTA BÜYÜK EKLE BUTONU */}
                <TouchableOpacity style={styles.addBtnFloating} onPress={gotoItem}>
                    <Feather name="plus" size={30} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={goToKombin}>
                    <Feather name="layers" size={24} color="#A0A0A0" />
                    <Text style={styles.tabText}>Kombin</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Feather name="settings" size={24} color="#A0A0A0" />
                    <Text style={styles.tabText}>Ayarlar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Çok hafif gri arka plan (profesyonel gösterir)
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 120,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    subGreeting: {
        fontSize: 14,
        color: '#7C7C7C',
        marginTop: 4,
    },
    profileCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    featuredCard: {
        width: '100%',
        height: 140,
        backgroundColor: '#6C63FF', // Ana marka rengin
        borderRadius: 25,
        padding: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: 30,
        elevation: 8,
        shadowColor: '#6C63FF',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    featuredTextContent: {
        flex: 1,
        justifyContent: 'center',
    },
    featuredTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    featuredSub: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 5,
        maxWidth: '80%',
    },
    featuredBtn: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 15,
    },
    featuredBtnText: {
        color: '#6C63FF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    featuredIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 15,
    },
    categoryGrid: {
        gap: 15,
    },
    imageCard: {
        width: '100%',
        height: 180,
        borderRadius: 25,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        marginBottom: 10,
    },
    cardImg: {
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundColor: 'rgba(0,0,0,0.3)', // Hafif karartma yazı okunsun diye
        justifyContent: 'center',
        paddingLeft: 20,
    },
    cardText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tabBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        paddingHorizontal: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 10,
        marginTop: 4,
        fontWeight: '600',
        color: '#A0A0A0',
    },
    addBtnFloating: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6C63FF',
        marginTop: -35, // Butonu yukarı taşır (Floating)
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#6C63FF',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderWidth: 4,
        borderColor: '#F8F9FA',
    }
});