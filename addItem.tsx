import React, { useState } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Image,
    Alert, ActivityIndicator, Dimensions, ScrollView, SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useWardrobe } from './WardrobeContext';

const { width } = Dimensions.get('window');

const CATEGORIES = ['Üst Giyim', 'Alt Giyim', 'Ayakkabı', 'Dış Giyim'];
const COLORS = [
    'Siyah', 'Beyaz', 'Gri', 'Lacivert',
    'Mavi', 'Açık Mavi', 'Kırmızı', 'Bordo',
    'Yeşil', 'Haki', 'Sarı', 'Turuncu',
    'Pembe', 'Mor', 'Lila', 'Bej',
    'Kahverengi', 'Taba', 'Antrasit', 'Ekru'
];

export default function AddItemScreen({ navigation }: any) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [step, setStep] = useState(0);

    const { addItem } = useWardrobe();

    // IP Adresi Ayarı (Kendi yerel IP'nizle değiştirmeyi unutmayın)
    const BACKEND_URL = 'http://10.0.2.2:5005';

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) return Alert.alert("Hata", "Galeri izni vermeniz gerekiyor.");

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            setStep(1);
            await removeBackground(uri);
        }
    };

    const removeBackground = async (uri: string) => {
        setLoading(true);
        const formData = new FormData();
        // @ts-ignore
        formData.append('image', { uri, name: 'photo.jpg', type: 'image/jpeg' });

        try {
            const response = await fetch(`${BACKEND_URL}/remove-bg`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    setSelectedImage(reader.result as string);
                    setLoading(false);
                    setStep(2);
                    Alert.alert("Başarılı", "Arka plan temizlendi!");
                };
            } else { throw new Error(); }
        } catch (err) {
            setLoading(false);
            setStep(2);
            Alert.alert("Bilgi", "Sunucuya bağlanılamadı, orijinal resimle devam ediliyor.");
        }
    };

    const save = async () => {
        if (!category || !color) return Alert.alert("Uyarı", "Lütfen kategori ve renk seçin.");

        const newItem = {
            id: Date.now().toString(),
            image: selectedImage,
            category: category,
            color: color
        };

        // Veriyi kaydediyoruz
        await addItem(newItem);

        Alert.alert("Başarılı", "Kıyafet gardırobuna eklendi!", [
            {
                text: "Tamam",
                onPress: () => {
                    // Formu sıfırla
                    setSelectedImage(null);
                    setCategory('');
                    setColor('');
                    setStep(0);

                    // --- TEK SAYFA MANTIĞINA GÖRE YÖNLENDİRME ---
                    // Kullanıcıyı direkt yeni oluşturduğumuz 'Icindekiler' ekranına, 
                    // seçtiği kategori parametresiyle gönderiyoruz.
                    navigation.navigate('Icindekiler', { categoryName: category });
                }
            }
        ]);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Yeni Kıyafet Ekle</Text>

                <View style={styles.card}>
                    {step === 0 ? (
                        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                            <View style={styles.dashedBox}>
                                <Text style={styles.uploadText}>+ Fotoğraf Seç</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: selectedImage! }} style={styles.image} />
                            {loading && (
                                <View style={styles.loadingOverlay}>
                                    <ActivityIndicator size="large" color="#FFF" />
                                    <Text style={styles.loadingText}>Temizleniyor...</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {step > 0 && (
                    <View style={styles.panel}>
                        <Text style={styles.label}>Kategori Seçin</Text>
                        <View style={styles.row}>
                            {CATEGORIES.map(c => (
                                <TouchableOpacity
                                    key={c}
                                    style={[styles.chip, category === c && styles.activeChip]}
                                    onPress={() => setCategory(c)}
                                >
                                    <Text style={[styles.chipText, category === c && styles.activeText]}>{c}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>Renk Seçin</Text>
                        <View style={styles.row}>
                            {COLORS.map(c => (
                                <TouchableOpacity
                                    key={c}
                                    style={[styles.chip, color === c && styles.activeChip]}
                                    onPress={() => setColor(c)}
                                >
                                    <Text style={[styles.chipText, color === c && styles.activeText]}>{c}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.saveBtn, (!category || !color) && { opacity: 0.5 }]}
                            onPress={save}
                            disabled={loading}
                        >
                            <Text style={styles.saveBtnText}>Gardıroba Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#F8F9FA' },
    container: { alignItems: 'center', paddingVertical: 30, paddingBottom: 50 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    card: {
        width: width * 0.85,
        height: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    imageWrapper: { width: '100%', height: '100%' },
    image: { width: '100%', height: '100%', resizeMode: 'contain' },
    uploadBtn: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    dashedBox: {
        width: '100%',
        height: '100%',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#6C63FF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadText: { color: '#6C63FF', fontWeight: 'bold', fontSize: 18 },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: { color: '#fff', marginTop: 10, fontWeight: '600' },
    panel: {
        width: '90%',
        marginTop: 25,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        elevation: 3
    },
    label: { fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: '#444' },
    row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8
    },
    activeChip: { backgroundColor: '#6C63FF' },
    chipText: { fontSize: 14, color: '#555' },
    activeText: { color: '#fff', fontWeight: 'bold' },
    saveBtn: {
        backgroundColor: '#28A745',
        padding: 18,
        borderRadius: 15,
        marginTop: 10,
        alignItems: 'center'
    },
    saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});