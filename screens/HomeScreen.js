// FirebaseMahasiswa/screens/HomeScreen.js

import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function HomeScreen() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [data, setData] = useState([]);

  const addMahasiswa = async () => {
    await addDoc(collection(db, "mahasiswa"), {
      nama,
      nim,
      prodi,
    });

    setNama("");
    setNim("");
    setProdi("");
    fetchData();
  };

  const fetchData = async () => {
    const snap = await getDocs(collection(db, "mahasiswa"));
    const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Data Mahasiswa</Text>

      <View style={styles.cardInput}>
        <Text style={styles.label}>Nama</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Masukkan Nama" 
          value={nama} 
          onChangeText={setNama} 
        />

        <Text style={styles.label}>NIM</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Masukkan NIM" 
          value={nim}
          onChangeText={setNim}
        />

        <Text style={styles.label}>Program Studi</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Masukkan Prodi" 
          value={prodi} 
          onChangeText={setProdi} 
        />

        <TouchableOpacity style={styles.btn} onPress={addMahasiswa}>
          <Text style={styles.btnText}>Tambah Data</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Daftar Mahasiswa</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.nama}</Text>
            <Text style={styles.itemText}>NIM: {item.nim}</Text>
            <Text style={styles.itemText}>Prodi: {item.prodi}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f7ff" },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e3a8a",
  },

  cardInput: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#374151",
  },

  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
  },

  btn: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 5,
  },

  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e40af",
  },

  itemCard: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#2563eb",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  itemText: {
    marginTop: 2,
    color: "#475569",
  },
});
