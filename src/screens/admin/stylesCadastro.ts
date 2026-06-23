import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F7F1E5', padding: 20, paddingBottom: 50 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: Constants.statusBarHeight, marginBottom: 25 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#A55C45', marginLeft: 15 },
  
  imagePickerButton: { width: '100%', height: 180, backgroundColor: '#FFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#EADCC8', borderStyle: 'dashed', marginBottom: 20, overflow: 'hidden' },
  imagePickerText: { color: '#A55C45', marginTop: 10, fontWeight: 'bold' },
  productImagePreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  label: { fontSize: 14, color: '#A55C45', fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EADCC8', borderRadius: 8, padding: 12, fontSize: 16, color: '#333' },
  
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  
  // CATEGORIAS COM QUEBRA DE LINHA INTELIGENTE (WRAP)
  categoryPicker: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginTop: 5 },
  catOption: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EADCC8', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 10, marginBottom: 10 },
  catOptionActive: { backgroundColor: '#C56A47', borderColor: '#C56A47' },
  catText: { color: '#A55C45', fontWeight: '500', fontSize: 14 },
  catTextActive: { color: '#FFF', fontWeight: 'bold' },
  
  saveButton: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});