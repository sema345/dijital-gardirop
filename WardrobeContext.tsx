import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WardrobeContext = createContext<any>(null);

export const WardrobeProvider = ({ children }: any) => {
    const [items, setItems] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); // Verilerin yüklendiğini takip eder

    // --- 1. ADIM: UYGULAMA AÇILDIĞINDA VERİLERİ ÇEK ---
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const savedItems = await AsyncStorage.getItem('@wardrobe_items');
                const savedFavs = await AsyncStorage.getItem('@wardrobe_favorites');

                if (savedItems !== null) {
                    setItems(JSON.parse(savedItems));
                }
                if (savedFavs !== null) {
                    setFavorites(JSON.parse(savedFavs));
                }
                console.log("Veriler başarıyla yüklendi ✅");
            } catch (e) {
                console.error("Yükleme hatası:", e);
            } finally {
                setIsLoaded(true); // Yükleme bitti
            }
        };
        loadInitialData();
    }, []);

    // --- 2. ADIM: VERİLER DEĞİŞTİĞİNDE KAYDET ---
    useEffect(() => {
        // İlk açılışta (isLoaded false iken) boş veriyi kaydetmesini engelliyoruz
        if (isLoaded) {
            const saveData = async () => {
                try {
                    await AsyncStorage.setItem('@wardrobe_items', JSON.stringify(items));
                    await AsyncStorage.setItem('@wardrobe_favorites', JSON.stringify(favorites));
                    console.log("Veriler kaydedildi 💾");
                } catch (e) {
                    console.error("Kaydetme hatası:", e);
                }
            };
            saveData();
        }
    }, [items, favorites, isLoaded]);

    const addItem = (item: any) => {
        setItems(prev => [...prev, item]);
    };

    const addFavorite = (kombin: any) => {
        setFavorites(prev => {
            // Eğer kombinin zaten bir id'si varsa, bu eski bir kombindir, onu listeden bul ve güncelle
            if (kombin.id) {
                return prev.map(f => f.id === kombin.id ? kombin : f);
            } else {
                // Eğer id yoksa yeni oluştur ve ekle
                const newFav = { ...kombin, id: Date.now().toString() };
                return [...prev, newFav];
            }
        });
        alert("Kombin Başarıyla Güncellendi/Kaydedildi! ❤️");
    };

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    return (
        <WardrobeContext.Provider value={{ items, setItems, addItem, favorites, addFavorite, removeFavorite }}>
            {children}
        </WardrobeContext.Provider>
    );
};

export const useWardrobe = () => useContext(WardrobeContext);