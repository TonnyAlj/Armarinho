// Arquivo: src/screens/admin/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#F7F1E5', flexGrow: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, paddingTop: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#A55C45', marginLeft: 15 },
  label: { color: '#A55C45', fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EADCC8', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  categoryPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  catOption: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#A55C45', backgroundColor: '#FFF' },
  catOptionActive: { backgroundColor: '#A55C45' },
  catText: { color: '#A55C45', fontWeight: '500' },
  catTextActive: { color: '#FFF' },
  saveButton: { backgroundColor: '#C56A47', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});