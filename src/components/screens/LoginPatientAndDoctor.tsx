import React, {useRef, useState} from 'react';
import {Animated} from 'react-native';
import {LoginScreen} from './LoginScreen';

export const LoginSwitcher = (): React.JSX.Element => {
  const slideInAnimation = useRef(new Animated.Value(0)).current;
  const [isPatient, setIsPatient] = useState(true);

  const handleNavigate = () => {
    Animated.spring(slideInAnimation, {
      toValue: isPatient ? -400 : 400,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      setIsPatient(!isPatient);
      slideInAnimation.setValue(isPatient ? 120 : -120);
      Animated.spring(slideInAnimation, {
        toValue: 0,
        friction: 5,
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
      userType={isPatient ? 'Patient' : 'Doctor'}
    />
  );
};
