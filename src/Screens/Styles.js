import {StyleSheet} from 'react-native';
  
  
  
 const  styles = StyleSheet.create({

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:40,
    marginLeft:20
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop:40,
    marginRight:10
    
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1e3a8a',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30
  },
  avatarText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    // marginTop:10
  },
  details: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 4,
  },
  info: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
    justifyContent:"flex-end"
  },
  editButton: {
    
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: '#55bdab',
    fontWeight: '600',
    textAlign:"center",

  },
  buttonTextDelete:{
     color: '#F44336',
    fontWeight: '600',
    textAlign:"center",
   
  },

  /// edit
   modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  padding: 20,
},
modalContainer: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  paddingBottom:40,
  maxHeight: '100%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#1e3a8a',
  textAlign: 'center',
},
sectionTitle: {
  marginTop: 16,
  fontSize: 16,
  fontWeight: '600',
  color: '#4A90E2',
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginTop: 10,
  fontSize: 15,
  color:"white",
  backgroundColor: '#f9f9f9',
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
},
saveButton: {
  backgroundColor: '#55bdab',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
  flex: 1,
  justifyContent:"center",
  marginRight: 8,
},
cancelButton: {
  backgroundColor: '#F44336',
  paddingVertical: 9,
  borderRadius: 10,
  flex: 1,
},

savebuttonText:{
  color: '#fff',
  fontWeight: '600',
  textAlign: "center",
  
}

});

export default styles;