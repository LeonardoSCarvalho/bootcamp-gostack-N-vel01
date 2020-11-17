import React, {useEffect, useState} from 'react';

import { View,FlatList, SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api';




export default function App(){
    
    const [ projects, setProjects ] = useState([]);
    
    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        })
    }, []);
    
    
    
    return (
        <>
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={projects} 
                    keyExtractor={projects => projects.id} 
                    renderItem={ ({ item: projects }) => (
                        <Text style={styles.title}> {projects.title }</Text>
                )}/>
            </SafeAreaView>

        </>
        /*<View style={styles.container}>
            { projects.map(project => <Text style={styles.title} key={project.id}>{project.title}</Text>)}
        </View>
    */
        
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
    }
})