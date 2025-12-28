import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, 
  Modal, TouchableOpacity, ActivityIndicator, Platform, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'; // ADD THIS
import { useRouter } from 'expo-router'; // ADD THIS
import { useGetTasksQuery } from '../../src/state/tasksApiSlice';
import { logout } from '../../src/state/authSlice'; // ADD THIS
import TaskCreateForm from '../../src/components/tasks/TaskCreateForm';
import TaskTable from '../../src/components/tasks/TaskTable';
import TaskTableSkeleton from '../../src/components/tasks/TaskTableSkeleton';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all'); 
  const [isModalVisible, setModalVisible] = useState(false);

  const { data, isLoading, isFetching } = useGetTasksQuery({ 
    page, 
    search, 
    isCompleted: filterStatus === 'all' ? undefined : filterStatus 
  });

  // 1. Logout Function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: () => {
            dispatch(logout()); // Clears Redux & AsyncStorage
            router.replace('/login'); // Sends user back to login
          } 
        }
      ]
    );
  };

  const handleStatusChange = (status: string) => {
    setFilterStatus(status);
    setPage(1); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* 2. Top Bar with Logout Button */}
        <View style={styles.topBar}>
          <Text style={styles.headerText}>Dashboard</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color="#dc3545" />
          </TouchableOpacity>
        </View>
        
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search tasks..." 
          placeholderTextColor="#999"
          value={search} 
          onChangeText={(text) => {
            setSearch(text);
            setPage(1);
          }} 
        />

        <View style={styles.filterContainer}>
          {['all', 'false', 'true'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                filterStatus === status && styles.filterChipActive
              ]}
              onPress={() => handleStatusChange(status)}
            >
              <Text style={[
                styles.filterText,
                filterStatus === status && styles.filterTextActive
              ]}>
                {status === 'all' ? 'All' : status === 'true' ? 'Completed' : 'Pending'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <TaskTableSkeleton />
        ) : (
          <>
            <TaskTable tasks={data?.tasks || []} isLoading={isFetching} />

            {data && data.pages > 1 && (
              <View style={styles.paginationContainer}>
                <TouchableOpacity 
                  disabled={page === 1} 
                  onPress={() => setPage(prev => prev - 1)}
                  style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
                >
                  <Ionicons name="chevron-back" size={24} color={page === 1 ? "#ccc" : "#1976d2"} />
                </TouchableOpacity>

                <View style={styles.pageIndicator}>
                  <Text style={styles.pageInfoText}>Page {data.page} of {data.pages}</Text>
                  <Text style={styles.totalText}>{data.total} tasks total</Text>
                </View>

                <TouchableOpacity 
                  disabled={page === data.pages} 
                  onPress={() => setPage(prev => prev + 1)}
                  style={[styles.pageBtn, page === data.pages && styles.disabledBtn]}
                >
                  <Ionicons name="chevron-forward" size={24} color={page === data.pages ? "#ccc" : "#1976d2"} />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
             <TaskCreateForm onSuccess={() => setModalVisible(false)} />
             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
               <Text style={styles.closeBtnText}>Cancel</Text>
             </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    marginTop: Platform.OS === 'android' ? 10 : 5, 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 20, 
    backgroundColor: '#fff', 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24,
    borderBottomWidth: 1, 
    borderColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  headerText: { fontSize: 32, fontWeight: '800', color: '#1976d2' },
  logoutBtn: { padding: 5 },
  searchBar: { 
    backgroundColor: '#f1f3f5', 
    padding: 14, 
    borderRadius: 15, 
    fontSize: 16,
    color: '#333'
  },
  filterContainer: { flexDirection: 'row', marginTop: 18, gap: 10 },
  filterChip: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 25, 
    backgroundColor: '#f1f3f5',
  },
  filterChipActive: { backgroundColor: '#e3f2fd', borderWidth: 1.5, borderColor: '#1976d2' },
  filterText: { color: '#666', fontWeight: '600', fontSize: 14 },
  filterTextActive: { color: '#1976d2' },

  paginationContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 35 : 25, 
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  pageBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 24, backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#eee' },
  disabledBtn: { opacity: 0.2 },
  pageIndicator: { alignItems: 'center' },
  pageInfoText: { fontSize: 15, fontWeight: '700', color: '#333' },
  totalText: { fontSize: 12, color: '#999', marginTop: 3 },

  fab: { position: 'absolute', right: 20, bottom: Platform.OS === 'ios' ? 120 : 100, backgroundColor: '#1976d2', width: 65, height: 65, borderRadius: 32.5, justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.4, shadowRadius: 6 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 45 },
  closeBtn: { marginTop: 20, alignItems: 'center', padding: 10 },
  closeBtnText: { color: '#dc3545', fontWeight: 'bold', fontSize: 16 }
});

export default DashboardPage;