import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';

import { styles } from './styles';
import { Participant } from '../../components/Participant';

import React, { useState } from 'react';

export const Home = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  const handleParticipantAdd = () => {
    if (participants.includes(participantName)) {
      return Alert.alert(
        'Participante Existe!',
        `Já exite um participante na lista com esse nome de ${participantName}!`
      );
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName('');
  };

  const handleParticipantRemove = (name: string) => {
    Alert.alert('Remover!', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento </Text>
      <Text style={styles.eventDate}>Terça-feira, 27 de fevereiro de 2024</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={'Nome do participante'}
          placeholderTextColor={'#6B6B6B'}
          keyboardType={'default'}
          value={participantName}
          onChangeText={setParticipantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {participants.map((participant) => (
          <Participant
            key={participant}
            name={participant}
            onRemove={() => handleParticipantRemove(name)}
          />
        ))}
      </ScrollView> */}

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.listEmptyText}>
            Ninquém chegou no evento ainda? Adicione participantes a sua lista
            de presençã.
          </Text>
        }
      />
    </View>
  );
};
