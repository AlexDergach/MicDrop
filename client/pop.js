import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { getActiveProfile } from './profiledata';

export default function PopupForm({ onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [donateUrl, setDonateUrl] = useState('');
  const [artistPlaying, setArtistPlaying] = useState('');
  const [doors, setDoors] = useState('');
  const [address, setAddress] = useState('');
  const [ticketLink, setTicketLink] = useState('');

  const userProfile = getActiveProfile();
  const isBusker = userProfile?.profileType === 'busker';
  const isBar = userProfile?.profileType === 'bar' || userProfile?.profileType === 'venue';

  const resetForm = () => {
    setName('');
    setAbout('');
    setDonateUrl('');
    setArtistPlaying('');
    setDoors('');
    setAddress('');
    setTicketLink('');
  };

  const handleSend = () => {
    if (!name.trim()) {
      alert('Name is required.');
      return;
    }

    const newProfile = {
      profileType: userProfile.profileType,
      profileName: name,
      profileIcon: 'https://i.pravatar.cc/100?u=' + name,
      about,
      donateUrl,
      artistPlaying,
      doors,
      address,
      ticketLink,
      trackName: '',
      trackArtist: '',
      spotifyTrackUrl: '',
      trackCover: '',
      bannerImage: '',
      price: '',
    };

    onSubmit?.(newProfile);
    resetForm();
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              {isBusker && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="About Me"
                    value={about}
                    onChangeText={setAbout}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Donate URL"
                    value={donateUrl}
                    onChangeText={setDonateUrl}
                  />
                </>
              )}

              {isBar && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Artist Playing"
                    value={artistPlaying}
                    onChangeText={setArtistPlaying}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Doors Open Time"
                    value={doors}
                    onChangeText={setDoors}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Ticketmaster Link"
                    value={ticketLink}
                    onChangeText={setTicketLink}
                  />
                </>
              )}

              <Button title="Submit" onPress={handleSend} />
              <Button title="Cancel" onPress={() => setVisible(false)} color="grey" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
