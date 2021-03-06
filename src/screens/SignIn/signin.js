import React, { Component } from 'react'
import {
    Text, View, TextInput, TouchableOpacity, SafeAreaView, Image, FlatList, StyleSheet, Alert,
    TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard
} from 'react-native'

import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';
import { Formik } from 'formik';
import Modal from 'react-native-modal';
import { actSignIn, actSignInFailed } from '../../actions/index'
import { GetAccount, SetAccount } from '../../api/secure/index'
import { SignInSchema } from '../../utils/validation'
import { FirebaseApp } from '../../api/firebase/index'
import { WIDTH_DEVICE_SCREEN, HEIGHT_DEVICE_SCREEN } from '../../constants/DeviceDimensions'
// _userName: "abc@gmail.com",
// _passWord: "Duytran99",
const size_btn = WIDTH_DEVICE_SCREEN / 2 - 50
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            imageData: [
                require('../../assets/picture/intro/cc1.jpg'),
                require('../../assets/picture/intro/download.png'),
            ],
            modalVisible: false,
            typeClient: 'taixe'
        }
    }
    submit(values) {
        this.props.SignIn(values.email, values.password, values.typeClient)
    }
    render() {
        let { errorMsgSignIn } = this.props
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'silver' }}>
                <View style={{
                    position: 'absolute',
                    height: HEIGHT_DEVICE_SCREEN / 2, width: WIDTH_DEVICE_SCREEN,
                    top: 0, left: 0
                }}>
                    <FlatList
                        data={this.state.imageData}
                        keyExtractor={item => item.toString()}
                        horizontal
                        showsHorizontalScrollIndicator
                        pagingEnabled
                        bounces
                        renderItem={({ item, index }) =>
                            <View key={index}>
                                <Image
                                    source={item}
                                    style={{
                                        width: WIDTH_DEVICE_SCREEN,
                                        height: HEIGHT_DEVICE_SCREEN / 2
                                    }}
                                />
                            </View>
                        }
                    />
                </View>
                <View style={{
                    position: 'absolute', backgroundColor: '#f5f6fa',
                    height: HEIGHT_DEVICE_SCREEN / 2 + 200, width: WIDTH_DEVICE_SCREEN,
                    top: HEIGHT_DEVICE_SCREEN / 2 - 150, left: 0,
                    borderTopLeftRadius: 40, borderTopRightRadius: 40,
                    paddingHorizontal: 20, paddingVertical: 20
                }}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                            Giao h??ng <Text style={{ fontSize: 35, color: '#D7443E' }}> Fast</Text>
                        </Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                            Tr???i nghi???m <Text style={{ fontSize: 35, color: '#D7443E' }}>Move</Text>
                        </Text>
                    </View>
                    <View>
                        {
                            errorMsgSignIn != null
                                ?
                                (
                                    Alert.alert(
                                        "????ng Nh???p Kh??ng Th??nh C??ng",
                                        errorMsgSignIn,
                                        [
                                            {
                                                text: "????ng K?? ",
                                                onPress: () => this.props.navigation.navigate("SignUp")
                                            },
                                            {
                                                text: "H???y",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            {
                                                text: "OK",
                                                onPress: () => console.log("OK Pressed")
                                            }
                                        ]
                                    )
                                ) : (<View />)
                        }
                        <Formik
                            initialValues={{
                                email: 'duy@gmail.com',
                                password: '123456',
                                typeClient: 'taixe'
                            }}
                            onSubmit={values => {
                                this.submit(values)
                            }}
                            validationSchema={SignInSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                <View style={{}}>
                                    <View>
                                        <View style={styles.input}>
                                            {errors.email && touched.email ? (
                                                <Text style={{ color: 'red' }}>{errors.email}</Text>
                                            ) : null}
                                            <Text style={styles.labelTxt}>
                                                Email / S??? ??i???n Tho???i </Text>
                                            <TextInput
                                                onChangeText={
                                                    handleChange("email")
                                                }
                                                style={{ borderBottomColor: 'silver', borderBottomWidth: 1 }}
                                                onBlur={handleBlur("email")}
                                                value={values.email} />
                                        </View>

                                        <View style={[styles.input, { marginBottom: 10 }]}>
                                            {errors.password && touched.password ? (
                                                <Text style={{ color: 'red' }}>{errors.password}</Text>
                                            ) : null}
                                            <Text style={styles.labelTxt}>
                                                M???t Kh???u </Text>
                                            <TextInput
                                                style={{ borderBottomColor: 'silver', borderBottomWidth: 1 }}
                                                onChangeText={handleChange("password")}
                                                onBlur={handleBlur("password")}
                                                value={values.password}
                                                secureTextEntry={true} />
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between',

                                    }}>
                                        <View style={{
                                            width: size_btn, height: size_btn, backgroundColor: '#ecf0f1', position: 'absolute',
                                            borderRadius: 20, padding: 15, justifyContent: 'space-between'

                                        }}>

                                            <TouchableOpacity
                                                style={{
                                                    borderRadius: 10, borderWidth: 3, backgroundColor: '#ffffff', borderColor: "#ffffff",
                                                    alignItems: 'center', justifyContent: 'center', height: size_btn / 2 - 30
                                                }}
                                                onPress={() => this.props.navigation.navigate("PasswordReset")}
                                            >
                                                <View >
                                                    <Text style={{ color: "#D7443E" }}>
                                                        Qu??n M???t Kh???u ?  </Text>
                                                </View>
                                            </TouchableOpacity>


                                            <TouchableOpacity
                                                style={{
                                                    borderRadius: 10, borderWidth: 3, backgroundColor: '#D7443E', borderColor: "#D7443E",
                                                    alignItems: 'center', justifyContent: 'center', height: size_btn / 2 - 30
                                                }}
                                                onPress={() => this.props.navigation.navigate("SignUp")}
                                            >
                                                <View >
                                                    <Text style={{ color: "#ffffff" }}>
                                                        ????ng K??   </Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={{
                                            width: size_btn, height: size_btn, position: 'absolute', left: WIDTH_DEVICE_SCREEN - 40 - size_btn
                                            , justifyContent: 'center', alignItems: 'center'
                                        }}>

                                            <TouchableOpacity
                                                style={{
                                                    width: size_btn / 1.5, height: size_btn / 1.5, borderRadius: size_btn / 3, borderWidth: 1, justifyContent: 'center', alignItems: 'center',
                                                    backgroundColor: '#D7443E', borderColor: "#D7443E",
                                                }}
                                                // onPress={handleSubmit}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>
                                                    ????ng Nh???p
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errorMsgSignIn: state.authReducer.errorMsgSignIn,
        myUserLocation: state.locationReducer.userLocation,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        SignIn: (userName, passWord, typeClient) => {
            FirebaseApp
                .auth()
                .signInWithEmailAndPassword(userName, passWord)
                .then(() => {
                    FirebaseApp.auth().onAuthStateChanged((user) => {
                        if (user) {
                            var uid = user.uid;
                            FirebaseApp.firestore().collection("User").doc(uid).get()
                                .then(doc => {
                                    if (typeClient === doc.data().typeClient) {
                                        SetAccount('userAccount', { userName, passWord, typeClient })
                                            .then(() => {
                                                dispatch(actSignIn(userName, passWord, typeClient))
                                            })
                                            .then(() => {
                                                CommonActions.navigate({
                                                    name: "DriverStack"
                                                })
                                            })
                                    }
                                })
                        }
                    });
                })
                .catch(function (e) {
                    var errorCode = e.code;
                    var errorMessage = e.message;
                    console.log(errorCode + " ---- " + errorMessage)
                    if (e.code === "auth/user-not-found") {
                        console.log("Tai khoan ko ton tai")
                        dispatch(actSignInFailed(e.message))

                    } else if (e.code === "auth/wrong-password") {
                        console.log("Sai mat khau")
                        dispatch(actSignInFailed(e.message))
                    }
                })
        }
    }
}
const styles = StyleSheet.create({
    labelTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#95a5a6'
    },
    input: {
        marginTop: 15,

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)