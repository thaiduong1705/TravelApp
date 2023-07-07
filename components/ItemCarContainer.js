import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-web';

const ItemCarContainer = ({imageSrc, title, location}) => {
  return (
    <TouchableOpacity className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[182px] my-2">
        <Image
            source={{uri : imageSrc}}
            className="w-full h-40 rounded-md object-cover"
        />
    </TouchableOpacity>
  );
};

export default ItemCarContainer;