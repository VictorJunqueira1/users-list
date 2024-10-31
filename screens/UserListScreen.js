import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UserListScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://randomuser.me/api/?results=10');
            setUsers(response.data.results);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Lista de Usuários</Text>
                <TouchableOpacity style={styles.loadButton} onPress={loadUsers}>
                    <Text style={styles.loadButtonText}>Carregar Usuários</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#3498db" style={styles.loader} />}

            <FlatList
                data={users}
                keyExtractor={(item) => item.login.uuid}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.userItem}
                        onPress={() => navigation.navigate('UserDetail', { user: item })}>
                        <Image source={{ uri: item.picture.thumbnail }} style={styles.userImage} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{`${item.name.first} ${item.name.last}`}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Bem-vindo!</Text>
                            <Text style={styles.subText}>Pressione o botão acima para carregar os usuários.</Text>
                        </View>
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    header: {
        backgroundColor: '#3498db',
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center'
    },
    headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    loadButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 10,
    },
    loadButtonText: { color: '#000', fontWeight: '500', fontSize: 16 },
    loader: { marginTop: 20 },
    listContainer: { paddingBottom: 20 },
    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    subText: { fontSize: 16, color: '#666', textAlign: 'center' },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    userImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
    userInfo: { flex: 1 },
    userName: { fontSize: 20, fontWeight: '600', color: '#2c3e50' },
    userEmail: { color: '#7f8c8d', marginTop: 4 },
});