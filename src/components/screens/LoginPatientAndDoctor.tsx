import React, {useRef, useState} from 'react';
import {Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginScreen} from './LoginScreen';

export const LoginSwitcher = (): React.JSX.Element => {
  const slideInAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [isPatient, setIsPatient] = useState(true);

  const handleNavigate = () => {
    Animated.timing(slideInAnimation, {
      toValue: isPatient ? -300 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsPatient(!isPatient);
      slideInAnimation.setValue(isPatient ? 300 : -300);
      Animated.timing(slideInAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <LoginScreen
      loginSubtitle={isPatient ? 'Como paciente' : 'Como médico'}
      navigateTo={handleNavigate}
      footerText={
        isPatient ? '¿Eres médico? Haz clic' : '¿Eres paciente? Haz clic'
      }
      footerLinkText="aquí y gestiona tus pacientes"
      slideInAnimation={slideInAnimation}
    />
  );
};
