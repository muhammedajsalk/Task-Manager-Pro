import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDeleteTaskMutation, useUpdateTaskMutation, Task } from '../../state/tasksApiSlice';

interface TaskTableProps { tasks: Task[]; isLoading: boolean; }

const TaskTable: React.FC<TaskTableProps> = ({ tasks, isLoading }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(id) }
    ]);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => updateTask({ id: item._id, isCompleted: !item.isCompleted })}>
        <Ionicons 
          name={item.isCompleted ? "checkbox" : "square-outline"} 
          size={24} 
          color={item.isCompleted ? "#4caf50" : "#757575"} 
        />
      </TouchableOpacity>
      
      <View style={styles.info}>
        <Text style={[styles.title, item.isCompleted && styles.completedText]}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={1}>{item.description || "No description"}</Text>
      </View>

      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        <Ionicons name="trash-outline" size={20} color="#f44336" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={<Text style={styles.empty}>No tasks found</Text>}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center', elevation: 2 },
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 13, color: '#757575' },
  completedText: { textDecorationLine: 'line-through', color: '#bbb' },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' }
});

export default TaskTable;