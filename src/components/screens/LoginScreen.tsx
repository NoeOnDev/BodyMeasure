import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/LoginStyles';

interface LoginScreenProps {
  loginSubtitle: string;
  navigateTo: () => void;
  footerText: string;
  footerLinkText: string;
  slideInAnimation: Animated.Value;
  userType: 'Patient' | 'Doctor';
}

export const LoginScreen = ({
  loginSubtitle,
  navigateTo,
  footerText,
  footerLinkText,
  slideInAnimation,
  userType,
}: LoginScreenProps): React.JSX.Element => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const clearUsername = () => {
    setUsername('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066ff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}>
        {!isKeyboardVisible && (
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Bienvenido a BodyMeasure</Text>
            <Text style={styles.subtitle}>
              Organiza tu salud, simplifica tu vida
            </Text>
          </View>
        )}

        <View
          style={[
            styles.whiteBackgroundContainer,
            {
              borderTopStartRadius: userType === 'Patient' ? 82 : 0,
              borderTopEndRadius: userType === 'Doctor' ? 82 : 0,
            },
          ]}>
          <Animated.View
            style={[
              styles.loginContainer,
              {
                transform: [{translateX: slideInAnimation}],
                borderTopStartRadius: userType === 'Patient' ? 82 : 0,
                borderTopEndRadius: userType === 'Doctor' ? 82 : 0,
              },
            ]}>
            <Text style={styles.loginTitle}>Iniciar sesión</Text>
            <Text style={styles.loginSubtitle}>{loginSubtitle}</Text>

            <View style={styles.inputContainer}>
              <Icon
                name="user-circle"
                size={20}
                color={username ? '#0078FF' : '#999'}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />
              {username.length > 0 && (
                <TouchableOpacity activeOpacity={0.8} onPress={clearUsername}>
                  <Icon
                    name="times-circle"
                    size={20}
                    color="#bbb"
                    style={styles.clearIcon}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color={password ? '#0078FF' : '#999'}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              {password.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={togglePasswordVisibility}>
                  <IconIonicons
                    name={passwordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color="#bbb"
                    style={styles.clearIcon}
                  />
                </TouchableOpacity>
              )}
            </View>

            <Animated.View
              style={[
                styles.animatedButtonContainer,
                {transform: [{scale: scaleValue}]},
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.footerText}>
              {footerText}{' '}
              <Text onPress={navigateTo} style={styles.link}>
                {footerLinkText}
              </Text>
            </Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
