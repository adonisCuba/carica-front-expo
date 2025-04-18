import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewStyle, StyleProp } from 'react-native';


interface Props{
  children: React.ReactNode,
  backgroundColor?: string,
  margin?: number,
  padding?: number,
  contentStyle? : StyleProp<ViewStyle>

}
const ScreenLayout = ({
  children,
  backgroundColor = '#FFFFFF', // Color por defecto
  padding = 0, // Padding por defecto
  margin = 40, // Margin por defecto
  contentStyle,
}: Props) => {
  return (
    <SafeAreaView style={[styles.container,{backgroundColor: backgroundColor, flex:1, padding: padding, margin: margin}, contentStyle]}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenLayout;
