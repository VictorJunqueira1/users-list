import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function UserDetailScreen({ route }) {
    const { user } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: user.picture.large }} style={styles.userImage} />
            <Text style={styles.userName}>{`${user.name.first} ${user.name.last}`}</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Gênero:</Text>
                <Text style={styles.detailValue}>{user.gender === 'male' ? 'Masculino' : 'Feminino'}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Nascimento:</Text>
                <Text style={styles.detailValue}>{new Date(user.dob.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Endereço:</Text>
                <Text style={styles.detailValue}>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Telefone:</Text>
                <Text style={styles.detailValue}>{user.phone}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#f5f6fa' },
    userImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2, borderColor: '#3498db' },
    userName: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20 },
    detailContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 },
        elevation: 2,
        marginVertical: 8,
    },
    detailLabel: { fontWeight: 'bold', color: '#3498db' },
    detailValue: { color: '#2c3e50' },
});