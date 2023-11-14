import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {COLORS, IMAGES} from '../constants/theme';

const OnBoarding = ({navigation}) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      bottomBarColor="#fff"
      titleStyles={{
        fontSize: 24,
        color: COLORS.black,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
      }}
      subTitleStyles={{
        fontSize: 14,
        color: COLORS.grey,
        fontWeight: '400',
        paddingHorizontal: 60,
        lineHeight: 24,
      }}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={IMAGES.onb1} />,
          title: 'Welcome to the GPH',
          subtitle:
            'Craft personalized greeting cards to share your feelings with loved ones.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={IMAGES.onb2} />,
          title: 'Edit and Print',
          subtitle:
            'Edit your card with images, fonts, and colors. When ready, print it out.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={IMAGES.onb3} />,
          title: 'Easy Sharing',
          subtitle:
            "Send your thoughtful creation via mail or digital message to brighten someone's day.",
        },
      ]}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
