import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert, Dimensions } from 'react-native';
import { useWardrobe } from './WardrobeContext';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function KombinOlusturScreen({ navigation }: any) {
    const { items } = useWardrobe();

    const [selectedTop, setSelectedTop] = useState<any>(null);
    const [selectedBottom, setSelectedBottom] = useState<any>(null);
    const [selectedShoes, setSelectedShoes] = useState<any>(null);

    const tops = items.filter((i: any) => i.category === 'Üst Giyim');
    const bottoms = items.filter((i: any) => i.category === 'Alt Giyim');
    const shoes = items.filter((i: any) => i.category === 'Ayakkabı');

    const goToDetails = () => {
        if (!selectedTop || !selectedBottom || !selectedShoes) {
            Alert.alert("Eksik Parça", "Lütfen her kategoriden birer parça seçin.");
            return;
        }
        navigation.navigate('KombinDetay', {
            initialTop: selectedTop,
            initialBottom: selectedBottom,
            initialShoes: selectedShoes
        });
    };

    const SelectorField = ({ title, data, selectedItem, onSelect }: any) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                {data.map((item: any) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => onSelect(item)}
                        style={[styles.itemCard, selectedItem?.id === item.id && styles.selectedCard]}
                    >
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemText}>{item.color}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    // HATA BURADAYDI: Return artık ana fonksiyonun içinde.
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Kombin Tasarla</Text>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <SelectorField title="Üst Seç" data={tops} selectedItem={selectedTop} onSelect={setSelectedTop} />
                <SelectorField title="Alt Seç" data={bottoms} selectedItem={selectedBottom} onSelect={setSelectedBottom} />
                <SelectorField title="Ayakkabı Seç" data={shoes} selectedItem={selectedShoes} onSelect={setSelectedShoes} />

                <View style={styles.lookbookContainer}>
                    <View style={styles.lookbookCard}>
                        <Text style={styles.lookbookTitle}>GÜNÜN KOMBİNİ</Text>

                        <View style={styles.mannequinArea}>
                            <View style={[styles.layer, { zIndex: 3 }]}>
                                {selectedTop ? (
                                    <Image source={{ uri: selectedTop.image }} style={styles.topImage} />
                                ) : (
                                    <View style={styles.emptySlot}><Text style={styles.emptyText}>Üst Seçilmedi</Text></View>
                                )}
                            </View>

                            <View style={[styles.layer, { zIndex: 2, marginTop: -40 }]}>
                                {selectedBottom ? (
                                    <Image source={{ uri: selectedBottom.image }} style={styles.bottomImage} />
                                ) : (
                                    <View style={styles.emptySlot}><Text style={styles.emptyText}>Alt Seçilmedi</Text></View>
                                )}
                            </View>

                            <View style={[styles.layer, { zIndex: 1, marginTop: -30 }]}>
                                {selectedShoes ? (
                                    <Image source={{ uri: selectedShoes.image }} style={styles.shoeImage} />
                                ) : (
                                    <View style={styles.emptySlot}><Text style={styles.emptyText}>Ayakkabı Seçilmedi</Text></View>
                                )}
                            </View>
                        </View>

                        {(selectedTop || selectedBottom) && (
                            <View style={styles.infoBadge}>
                                <Text style={styles.infoText}>
                                    {selectedTop?.color || '...'} + {selectedBottom?.color || '...'}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <TouchableOpacity style={styles.checkBtn} onPress={goToDetails}>
                    <AntDesign name="eyeo" size={24} color="white" />
                    <Text style={styles.checkBtnText}>Kombini Tam Ekran Gör</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', paddingTop: 40 },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    section: { marginBottom: 20, paddingLeft: 15 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
    horizontalScroll: { flexDirection: 'row' },
    itemCard: { width: 100, height: 120, backgroundColor: '#fff', borderRadius: 15, marginRight: 10, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
    selectedCard: { borderColor: '#6C63FF', borderWidth: 2, backgroundColor: '#F0EFFF' },
    itemImage: { width: 70, height: 70, resizeMode: 'contain' },
    itemText: { fontSize: 12, marginTop: 5, color: '#555' },
    checkBtn: { backgroundColor: '#6C63FF', flexDirection: 'row', margin: 20, padding: 18, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 50 },
    checkBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    lookbookContainer: { alignItems: 'center', marginVertical: 20 },
    lookbookCard: { width: width * 0.85, backgroundColor: '#fff', borderRadius: 30, padding: 20, alignItems: 'center', elevation: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 20 },
    lookbookTitle: { letterSpacing: 2, fontSize: 14, fontWeight: '900', color: '#6C63FF', marginBottom: 20 },
    mannequinArea: { alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: 10 },
    layer: { width: '100%', alignItems: 'center' },
    topImage: { width: 180, height: 180, resizeMode: 'contain' },
    bottomImage: { width: 160, height: 200, resizeMode: 'contain' },
    shoeImage: { width: 100, height: 100, resizeMode: 'contain' },
    emptySlot: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#F0F0F0', borderStyle: 'dashed', borderWidth: 1, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 10, color: '#999' },
    infoBadge: { marginTop: 20, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#F8F9FA', borderRadius: 50 },
    infoText: { fontSize: 13, fontWeight: 'bold', color: '#555' },
});