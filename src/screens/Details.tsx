import React from 'react';
import {
  Text as TextNative,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ArrowLeftIcon} from 'lucide-react-native';

import Heading from '../ui/Heading';
import Text from '../ui/Text';
import {useGetPokemonByNameQuery} from '../features/services';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './Home';
import {StackNavigationProp} from '@react-navigation/stack';

interface DetailsProps {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
}

const Details: React.FC<DetailsProps> = ({
  route,
  navigation,
}): React.JSX.Element => {
  const {data: pokemonInfo, isLoading: loadingPokemonInfo} =
    useGetPokemonByNameQuery(route.params.pokemonName);

  if (loadingPokemonInfo) {
    return (
      <View>
        <Text>Cargando..</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-5">
      <View className="mb-5">
        <TouchableOpacity className="py-3" onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color="#999" size={32} />
        </TouchableOpacity>
      </View>

      <View className="border border-neutral-300 rounded-xl">
        <Image
          source={{uri: pokemonInfo?.sprites?.front_default ?? ''}}
          className="w-full h-64 rounded-xl"
          resizeMode="contain"
        />
      </View>

      <View className="mt-4">
        <Heading>{pokemonInfo?.name}</Heading>

        <View className="flex-row justify-between">
          <View className="mt-2">
            <Text>Id:</Text>
            <Text>#{pokemonInfo?.id}</Text>
          </View>

          <View className="mt-2">
            <Text>Height:</Text>
            <Text>{pokemonInfo?.height}</Text>
          </View>

          <View className="mt-2">
            <Text>Weight:</Text>
            <Text>{pokemonInfo?.weight}</Text>
          </View>
        </View>

        <View className="mt-5">
          <Heading>Habilidades</Heading>

          <View className="mt-2">
            {pokemonInfo?.abilities?.map(ability => (
              <TextNative key={ability.ability.name} className="mb-2 text-base">
                {ability.ability.name}
              </TextNative>
            ))}
          </View>
        </View>

        <View className="my-5">
          <Heading>Movimientos</Heading>

          <View className="mt-2 flex-row flex-wrap gap-x-2">
            {pokemonInfo?.moves?.map((move, index: number) => (
              <TextNative key={move.move.name} className="mb-2 text-base">
                {move.move.name}
                {pokemonInfo?.moves?.length - 1 === index ? '.' : ','}
              </TextNative>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
