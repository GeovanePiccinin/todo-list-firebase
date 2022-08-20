import React from 'react'
import { Text, TextInput, StyleSheet, Pressable,View } from 'react-native'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

const Details = ({ route }) => {

    const todoRef = firebase.firestore().collection('todo-list-1')
    const [ title, setTitle] = React.useState(route.params.item.title)
    navigation = useNavigation()

    const updateTodo = () => {
        if(title && title.length > 0) {
            todoRef
                .doc(route.params.item.id)
                .update({
                    title: title,
                }).then(() => {
                    navigation.navigate('Home')
                }).catch((error) => alert(error))
        }
    }

    return(
       <View style={styles.container}>
            <TextInput 
                style={styles.textField}
                onChangeText={setTitle}
                value={title}
                placeholder="update todo"
            />
            <Pressable 
                style={styles.buttonUpdate}
                onPress={()=>updateTodo()}
            >
                <Text>Update</Text>
            </Pressable>
       </View>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: '#000000',
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 4,
        backgroundColor: "#0de065"
    }
})