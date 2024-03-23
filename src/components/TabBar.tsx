import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';

import Text from '../ui/Text';

const TabBar: React.FC<any> = ({state, navigation}): React.JSX.Element => {
  return (
    <View className="flex-row justify-center gap-x-20 h-[75px] items-center px-5">
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const label = route.name === 'HomeStack' ? 'Inicio' : 'Buscar';

        const svgUriIcon =
          route.name === 'HomeStack' && isFocused
            ? 'https://res.cloudinary.com/da6b7skw8/image/upload/v1711170151/j3jzgkoc3cyvw43y0a0o.svg'
            : route.name === 'HomeStack' && !isFocused
            ? 'https://res.cloudinary.com/da6b7skw8/image/upload/v1711169448/eldmymozsyaglhgorf8o.svg'
            : route.name === 'Details' && isFocused
            ? 'https://res.cloudinary.com/da6b7skw8/image/upload/v1711170151/igc47ob3blvzdrcidnct.svg'
            : 'https://res.cloudinary.com/da6b7skw8/image/upload/v1711169448/vbqlj3kjlolgox1etmt7.svg';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={index}
            className="items-center">
            <SvgUri width={28} height={28} uri={svgUriIcon} />
            <View className="h-1" />
            <Text
              // size="small"
              color={isFocused ? 'text-neutral-800' : 'text-neutral-400'}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;