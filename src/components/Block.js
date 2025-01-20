import React from 'react';
import { Text, View } from 'react-native';

const ThemedBlock = ({ text, show, textStyle, lineStyle }) => {


    return (
        <>
            <Text style={textStyle}>{text}</Text>
            <View style={lineStyle} />
        </>
    );
};

export default ThemedBlock;
