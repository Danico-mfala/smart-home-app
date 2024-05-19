import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../../assets/Shared/Colors';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type LoginScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const auth = FIREBASE_AUTH;

  const validateEmail = (inputEmail: string) => {
    if (!inputEmail) {
      setEmailError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(inputEmail)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (inputPassword: string) => {
    if (!inputPassword) {
      setPasswordError('Password is required');
      return false;
    } else if (inputPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const signIn = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      setError('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      setError('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/Lgoin/login.png')}
              style={styles.headerImg}
              alt='logo'
            />
            <Text style={styles.title}>Sign in to
              <Text style={{ color: '#075eec' }}> Scap House</Text>
            </Text>
            <Text style={styles.subtitle}>Get access to your Home and more</Text>
          </View>

          <View style={styles.form}>
            <View style={emailError ? [styles.input, styles.inputError] : styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                style={styles.inputControl}
                autoCorrect={false}
                keyboardType='email-address'
                placeholder='danico@example.com'
                placeholderTextColor='#577BB8'
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}
                onBlur={() => validateEmail(email)}
              />
              {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
            </View>

            <View style={passwordError ? [styles.input, styles.inputError] : styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputControl}
                placeholder='**********'
                placeholderTextColor='#577BB8'
                secureTextEntry={true}
                value={password}
                autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}
                onBlur={() => validatePassword(password)}
              />
              {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#000ff" />
            ) : (
              <>
                <TouchableOpacity onPress={signIn}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in </Text><AntDesign name='login' size={13} color={Colors.light_gray} style={styles.btnText} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={signUp}>
                  <Text style={styles.formFooter}>Create your Account</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.error}>{error}</Text> : null}
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
    marginTop: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  error: {
    fontSize: 15,
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
