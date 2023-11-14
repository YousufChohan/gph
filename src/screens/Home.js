import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '../component/inputField';
import {Modal, TextInput} from 'react-native-paper';
import {Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, IMAGES} from '../constants/theme';
import {STYLES} from '../constants/styles';
import SideBarModal from '../component/SideBarModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASE_URL} from '../constants/url';
import axios from 'axios';
import CardImageComponent from '../component/CardComponent-onlyimage';
import CardDescComponent from '../component/CardComponent-withdesc';

const cardImage = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
  'https://example.com/image5.jpg',
];

const Home = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal
  const [allProducts, setAllProducts] = useState(''); // State to control the modal

  useEffect(() => {
    async function getProducts() {
      const token = await AsyncStorage.getItem('@jwt');
      const id = await AsyncStorage.getItem('@id');
      console.log('User ID', id);
      const getAllProducts = await axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/product?userid=${id}`,
      }).catch(err => console.log(err));
      // console.log('product = ' + getAllProducts.data.products[0].productName);
      setAllProducts(getAllProducts.data.products);
      console.log('All Products', allProducts);
      // setCompany(companyData.data.company[0]);
      // setDemo(!companyData.data.company[0].name);
    }
    getProducts();
    return () => {};
  }, []);

  const toggleSideBarModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const allProducts2 = Array.isArray(allProducts)
    ? allProducts.slice(0, 3)
    : [];
  const allProducts3 = Array.isArray(allProducts)
    ? allProducts.slice(allProducts.length - 3, allProducts.length)
    : [];

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 10,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* We will have to change this from false to true to make the sidebar work */}
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Image
                resizeMode="contain"
                style={{width: 35, height: 35}}
                source={IMAGES.menu}
              />
            </TouchableOpacity>
            <Text style={STYLES.h2}>Garata Publishing House</Text>
            <Image
              resizeMode="contain"
              style={{width: 35, height: 35, borderRadius: 100}}
              source={IMAGES.logo}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 24,
                color: '#000',
                paddingVertical: 4,
                lineHeight: 28,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Find Your{'\n'}Greeting Card
            </Text>
          </View>
          {/* <TextField
            label="Find your favourite cards"
            left={
              <TextInput.Icon
                name={() => (
                  <Image
                    resizeMode="contain"
                    style={{width: 25}}
                    source={IMAGES.search}
                  />
                )}
              />
            }
          /> */}
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 100,
                borderColor: '#F2F2F2',
                borderWidth: 2,
                padding: 15,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 25, height: 25, marginRight: 10}}
                source={IMAGES.search}
              />
              <Text style={STYLES.text}>Find your favourite cards</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Most Popular
            </Text>
            <Pressable onPress={() => navigation.navigate('Explore')}>
              <Text style={[STYLES.h2, {color: '#964B00'}]}>See All</Text>
            </Pressable>
          </View>
          <View>
            <ScrollView
              nestedScrollEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              alwaysBounceHorizontal={true}
              style={{flex: 1}}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                horizontal={true} // Enable horizontal scrolling
                showsHorizontalScrollIndicator={true}
                scrollEnabled={true}
                // data={allProducts.slice(0, 4)}
                data={allProducts2}
                renderItem={({item}) => <CardImageComponent item={item} />}
                keyExtractor={item => item._id}
                style={{width: '100%'}}
              />
            </ScrollView>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Recommended for you
              </Text>
              <FlatList
                // keyboardShouldPersistTaps="handled"
                // horizontal={true} // Enable horizontal scrolling
                // showsHorizontalScrollIndicator={true}
                scrollEnabled={true}
                // data={allProducts.slice(0, 4)}
                data={allProducts3}
                renderItem={({item}) => <CardDescComponent item={item} />}
                keyExtractor={item => item._id}
                style={{width: '100%'}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Side Bar Modal */}
      <SideBarModal visible={isModalVisible} onClose={toggleSideBarModal} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  modalContainer: {
    // zIndex: 20,
    // flex: 1,
    marginTop: -22,
    width: '70%',
    height: '110%',
    // bottom: 0,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  modalContent: {
    // alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 10,
    // alignItems: 'center',
  },
  modalContainer2: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
