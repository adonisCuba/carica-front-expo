import loads from '@/store/slices/loads'
import { FlashList } from '@shopify/flash-list'
import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Load } from '../interfaces/loadType'
import OfferCard from './OfferCard'

export const LoadsList = (data: any, renderItem : any) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={data || []}
        renderItem={({item}: {item: Load}) => <OfferCard load={item}/>}
      />
    </View>
        
  )
}

const styles = StyleSheet.create({
    container: {

   
    },
  });
  