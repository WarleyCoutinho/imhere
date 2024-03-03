import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import { styles } from './styles';
import { Participant } from '@components/Participant';

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
      <Text style={styles.eventName}>Aniversário do Warley Coutinho.</Text>
      <Text style={styles.eventDate}>
        Quarta-feira, 10 de Abril de 2024 Dia da Engenharia.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={'Nome do convidado'}
          placeholderTextColor={'#6B6B6B'}
          keyboardType={'default'}
          value={participantName}
          onChangeText={setParticipantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

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
            Ninquém chegou ainda? Adicione convidados a sua lista.
          </Text>
        }
      />
    </View>
  );
};
