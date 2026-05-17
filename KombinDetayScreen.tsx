import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    Dimensions, SafeAreaView, Animated, PanResponder, Alert
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useWardrobe } from './WardrobeContext';

const { width, height } = Dimensions.get('window');

export default function KombinDetayScreen({ route, navigation }: any) {
    const { initialTop, initialBottom, initialShoes, savedScales, kombinId } = route.params;
    const { addFavorite } = useWardrobe();

    const [activeCategory, setActiveCategory] = useState<'top' | 'bottom' | 'shoe'>('top');

    // --- BOYUTLARI BAŞLATMA ---
    const topScale = useRef(new Animated.Value(savedScales?.top || 1)).current;
    const bottomScale = useRef(new Animated.Value(savedScales?.bottom || 1)).current;
    const shoeScale = useRef(new Animated.Value(savedScales?.shoe || 1)).current;

    // --- POZİSYONLAR ---
    const topPos = useRef(new Animated.ValueXY()).current;
    const bottomPos = useRef(new Animated.ValueXY()).current;
    const shoePos = useRef(new Animated.ValueXY()).current;

    const createPanResponder = (pos: Animated.ValueXY) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pos.x, dy: pos.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => { pos.extractOffset(); },
        });
    };

    const handleScaleChange = (val: number) => {
        if (activeCategory === 'top') topScale.setValue(val);
        if (activeCategory === 'bottom') bottomScale.setValue(val);
        if (activeCategory === 'shoe') shoeScale.setValue(val);
    };

    const handleSave = () => {
        const yeniKombin = {
            id: kombinId, // Eğer favoriden geldiyse id burada var, yeni ise undefined olur.
            top: initialTop,
            bottom: initialBottom,
            shoe: initialShoes,
            scales: {
                top: (topScale as any)._value || (savedScales?.top || 1),
                bottom: (bottomScale as any)._value || (savedScales?.bottom || 1),
                shoe: (shoeScale as any)._value || (savedScales?.shoe || 1)
            }
        };
        addFavorite(yeniKombin);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* ÜST BAR */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                        <Feather name="chevron-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Kombin Stüdyosu</Text>
                    <TouchableOpacity style={styles.iconCircle}>
                        <Feather name="share-2" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* EDİTÖR ALANI (Canvas) */}
                <View style={styles.canvas}>
                    <View style={styles.guideLines}>
                        <View style={styles.verticalLine} />
                        <View style={styles.horizontalLine} />
                    </View>

                    <Animated.View {...createPanResponder(topPos).panHandlers} style={[topPos.getLayout(), { zIndex: 3, transform: [{ scale: topScale }] }]}>
                        <Image source={{ uri: initialTop.image }} style={styles.clothImg} />
                    </Animated.View>

                    <Animated.View {...createPanResponder(bottomPos).panHandlers} style={[bottomPos.getLayout(), { zIndex: 2, marginTop: -40, transform: [{ scale: bottomScale }] }]}>
                        <Image source={{ uri: initialBottom.image }} style={[styles.clothImg, { height: 240 }]} />
                    </Animated.View>

                    <Animated.View {...createPanResponder(shoePos).panHandlers} style={[shoePos.getLayout(), { zIndex: 1, marginTop: -20, transform: [{ scale: shoeScale }] }]}>
                        <Image source={{ uri: initialShoes.image }} style={[styles.clothImg, { height: 100 }]} />
                    </Animated.View>
                </View>

                {/* ALT KONTROL PANELİ */}
                <View style={styles.editorPanel}>
                    <View style={styles.indicator} />

                    <Text style={styles.panelTitle}>Parça Düzenleyici</Text>

                    <View style={styles.categoryRow}>
                        {[
                            { id: 'top', label: 'Üst', icon: 'shirt-outline' },
                            { id: 'bottom', label: 'Alt', icon: 'layers-outline' },
                            { id: 'shoe', label: 'Ayk.', icon: 'walk-outline' }
                        ].map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setActiveCategory(cat.id as any)}
                                style={[styles.categoryBtn, activeCategory === cat.id && styles.activeCategoryBtn]}
                            >
                                <Ionicons
                                    name={cat.icon as any}
                                    size={18}
                                    color={activeCategory === cat.id ? '#FFF' : '#666'}
                                />
                                <Text style={[styles.categoryBtnText, { color: activeCategory === cat.id ? '#FFF' : '#666' }]}>
                                    {cat.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.sliderContainer}>
                        <Feather name="minimize-2" size={16} color="#999" />
                        <Slider
                            style={styles.slider}
                            minimumValue={0.4}
                            maximumValue={1.8}
                            step={0.01}
                            value={activeCategory === 'top' ? (topScale as any)._value : activeCategory === 'bottom' ? (bottomScale as any)._value : (shoeScale as any)._value}
                            onValueChange={handleScaleChange}
                            minimumTrackTintColor="#6C63FF"
                            maximumTrackTintColor="#E0E0E0"
                            thumbTintColor="#6C63FF"
                        />
                        <Feather name="maximize-2" size={16} color="#999" />
                    </View>

                    <TouchableOpacity style={styles.mainActionBtn} onPress={handleSave}>
                        <Ionicons name="heart" size={22} color="white" />
                        <Text style={styles.mainActionText}>Kombini Kaydet</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F2F5' },
    safeArea: { flex: 1 },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60,
    },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    canvas: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guideLines: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.05,
    },
    verticalLine: { width: 1, height: '80%', backgroundColor: '#000' },
    horizontalLine: { width: '80%', height: 1, backgroundColor: '#000', position: 'absolute' },
    clothImg: { width: 220, height: 220, resizeMode: 'contain' },

    editorPanel: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 25,
        paddingTop: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 15,
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 20,
    },
    panelTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 20 },
    categoryRow: {
        flexDirection: 'row',
        backgroundColor: '#F0F2F5',
        borderRadius: 20,
        padding: 5,
        marginBottom: 25,
    },
    categoryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    activeCategoryBtn: {
        backgroundColor: '#6C63FF',
        elevation: 4,
    },
    categoryBtnText: { marginLeft: 8, fontWeight: '600', fontSize: 13 },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    slider: { flex: 1, marginHorizontal: 10 },
    mainActionBtn: {
        backgroundColor: '#1A1A1A', // Siyah buton çok daha modern durur
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        borderRadius: 20,
        marginBottom: 10,
    },
    mainActionText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});