import { FontAwesome } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, Pressable, Keyboard } from 'react-native'
import { firebase } from '../config'

const Home = ({navigation}) => {

    const [ todos, setTodos ] = useState([])
    const [ addData, setAddData ] = useState('')
    const todoRef = firebase.firestore().collection('todo-list-1')

    //recurperar os dados
    useEffect(() => {
        todoRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const data = []
                    querySnapshot.forEach((doc) => {
                        const { title } = doc.data()
                        data.push({
                            id: doc.id,
                            title,
                        })
                    })
                    setTodos(data)
                }
            )
    }, [])

    

    //input

    //add
    const addTodo = () => {
        if(addData && addData.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const data = {
                title: addData,
                createdAt: timestamp,
            }
            todoRef
                .add(data)
                .then(() => {
                    setAddData('')
                    Keyboard.dismiss()
                }).catch((error) => alert(error))
        }
    }

    //delete
    const deleteTodo = (todo) => {
        todoRef
            .doc(todo.id)
            .delete()
            .then(() => {
                alert('Deleted with success!')
            }).catch((error) => alert(error))
    } 


    return(
        <View style={{flex:1}}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new todo'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(title) => setAddData(title)}
                    value={addData}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{}}
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                        style={styles.container}
                        onPress={() => navigation.navigate('Details', {item})}
                        >
                            <FontAwesome name="trash-o" 
                            color="red" 
                            onPress={() => deleteTodo(item)} 
                            style={styles.todoIcon} />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.title[0].toUpperCase() + item.title.slice(1)}
                                </Text>
                            </View> 
                            
                        </Pressable>
                    </View>
                    

                )}
            />
    </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin:5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft:45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize:18,
        marginRight:22
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft:10,
        marginRight: 10,
        marginTop:100
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
});
