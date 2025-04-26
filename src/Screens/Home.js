import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Modal,
  TouchableOpacity, TextInput, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/AntDesign'
import Call from 'react-native-vector-icons/dist/Ionicons'
import Location from 'react-native-vector-icons/dist/Entypo'
import API_CONFIG from '../Services/Services'
import { setUsers, editUser, addUser } from '../redux/actions';
import styles from './Styles';


const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [loading, setLoading] = useState(true);
  const [selecteduser, setSelectedUser] = useState('')


  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const [enableedit, setEnableEdit] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [bs, setBs] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');



  useEffect(() => {
    getAllUser(1)
  }, [dispatch]);


  const getAllUser = (pageNo) => {
    if (loadingMore) return;

    if (pageNo === 1)
      setLoading(true);
    else
      setLoadingMore(true);

    fetch(`${API_CONFIG.BASE_URL}users?_page=${pageNo}&_limit=5`)
      .then((response) => response.json())
      .then((data) => {
        if (pageNo === 1) {
          dispatch(setUsers(data));
        } else {
          dispatch(setUsers([...users, ...data]));
        }
        console.log(users);
        setHasMore(data.length > 0);
        setPage(pageNo + 1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoadingMore(false);
      })
  };


  const handleEdit = (user) => {
    console.log(user)
    setSelectedUser(user.id)
    setEnableEdit(true)
    setName(user.name || '');
    setUsername(user.username || '');
    setEmail(user.email || '');
    setStreet(user.address?.street || '');
    setSuite(user.address?.suite || '');
    setCity(user.address?.city || '');
    setZipcode(user.address?.zipcode || '');
    setLat(user.address?.geo?.lat || '');
    setLng(user.address?.geo?.lng || '');
    setPhone(user.phone || '');
    setWebsite(user.website || '');
    setCompanyName(user.company?.name || '');
    setCatchPhrase(user.company?.catchPhrase || '');
    setBs(user.company?.bs || '');
    setModalVisible(true);
  };


  const updateUser = () => {
    if (!validateUserData()) {
      return;
    }

    const updatedUserData = {
      id: selecteduser,
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    console.log(updatedUserData, "L");
    console.log(API_CONFIG.BASE_URL + `users/${selecteduser}`);

    fetch(API_CONFIG.BASE_URL + `users/${selecteduser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch(editUser(result));
        clearFields();
        closeModal();
      })
      .catch((error) => {
        dispatch(editUser(updatedUserData));
        clearFields();
        closeModal();
        console.error('Error updating user:', error);
      });
  };



  const clearFields = () => {
    setName('');
    setUsername('');
    setEmail('');
    setStreet('');
    setSuite('');
    setCity('');
    setZipcode('');
    setLat('');
    setLng('');
    setPhone('');
    setWebsite('');
    setCompanyName('');
    setCatchPhrase('');
    setBs('');
    setSelectedUser(null);
  };


  const closeModal = () => {
    setModalVisible(false);
    setEnableEdit(false);
    clearFields()
  };


  const validateUserData = () => {
    if (!name.trim() || !username.trim() || !email.trim()) {
      alert('Name, Username, and Email are required!');
      return false;
    }
    if (!street.trim() || !city.trim() || !zipcode.trim()) {
      alert('Street, City, and Zipcode are required!');
      return false;
    }
    if (!phone.trim()) {
      alert('Phone number is required!');
      return false;
    }
    if (!website.trim()) {
      alert('Website is required!');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateUserData()) {
      return;
    }

    const userData = {
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      phone,
      website,
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    fetch(API_CONFIG.BASE_URL + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(newUser => {
        newUser.id = Math.floor(Math.random() * 10000);
        dispatch(addUser(newUser));
        clearFields();
        closeModal();
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };



  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteUser(id),
        },
      ]
    );
  };

  const deleteUser = async (id) => {
    fetch(API_CONFIG.BASE_URL + `users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        dispatch({ type: 'DELETE_USER', payload: id });
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };



  const getInitials = (name) =>
    name.split(' ').map(word => word[0]).join('').toUpperCase();



  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        <View style={styles.details}>
          <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
            <View><Text style={styles.name}>{item.name}</Text></View>
            <View>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                <Text style={styles.buttonText}><Icon name="edit" size="20" /></Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.info}> <Icon name="mail" size={18} color="#aaa" style={styles.icon} /> {item.email}</Text>
          <Text style={styles.info}><Call name="call" size={18} color="#aaa" style={styles.icon} />  {item.phone}</Text>
          <Text style={styles.info}><Location name="location-pin" size={18} color="#aaa" style={styles.icon} />  {item.address.city}, {item.address.street}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonTextDelete}><Icon name="delete" size="20" /></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const loadMoreData = () => {
    if (!loadingMore && hasMore) {
      console.log("loadMoreData")

      getAllUser(page);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="small" color="#4A90E2" style={{ marginVertical: 10 }} />;
  };

  return (
    <SafeAreaView >
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>User List</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => { setModalVisible(true), setEnableEdit(false) }}>
                <Text style={styles.addButtonText}><Location name="plus" size='30' color="green" style={{ fontWeight: 600, marginRight: 20 }} /></Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100, margin: 10 }}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </>
      )}


      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContainer}>
            {enableedit != true ? <Text style={styles.modalTitle}>Add User</Text> : <Text style={styles.modalTitle}>Update User</Text>}

            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Street" value={street} onChangeText={setStreet} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Suite" value={suite} onChangeText={setSuite} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="City" value={city} onChangeText={setCity} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Zipcode" value={zipcode} onChangeText={setZipcode} />


            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Latitude" value={lat} onChangeText={setLat} keyboardType="numeric" />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Longitude" value={lng} onChangeText={setLng} keyboardType="numeric" />

            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Phone" value={phone} onChangeText={setPhone} />
            <TextInput style={[styles.input, { color: 'black' }]} placeholderTextColor="gray" placeholder="Website" value={website} onChangeText={setWebsite} />
            {enableedit != true ? <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                <Text style={styles.savebuttonText}>Save</Text>
              </TouchableOpacity>
            </View> : <View style={styles.modalButtons}>
              <TouchableOpacity onPress={updateUser} style={styles.saveButton}>
                <Text style={styles.savebuttonText}>Update</Text>
              </TouchableOpacity>
            </View>}

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.savebuttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>


    </SafeAreaView>
  );
};

export default Home;



