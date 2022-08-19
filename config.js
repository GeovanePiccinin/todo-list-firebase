import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAdNyFfDtiMdGBn0X7X5uStyPjq2oYcmWI",
  authDomain: "todo-list-879d0.firebaseapp.com",
  projectId: "todo-list-879d0",
  storageBucket: "todo-list-879d0.appspot.com",
  messagingSenderId: "637399353699",
  appId: "1:637399353699:web:5716c2fd07393f2390ab56",
  measurementId: "G-M8WBW9CLJD"
}

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }