import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Stack.Navigator initialRouteName="UserList">
            <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Confira os usuários on-line' }} />
            <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        </Stack.Navigator>
    );
}