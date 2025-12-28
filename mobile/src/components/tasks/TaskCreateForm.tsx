import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateTaskMutation } from '../../state/tasksApiSlice';

const taskSchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Too short'),
  description: yup.string().optional(),
});

const TaskCreateForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: { title: '', description: '' }
  });

  const onSubmit = async (data: any) => {
    try {
      await createTask({ title: data.title, description: data.description || '' }).unwrap();
      Alert.alert('Success', 'Task Created');
      reset();
      onSuccess();
    } catch (err) {
      Alert.alert('Error', 'Could not create task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Task</Text>
      
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Task title" />
        )}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, styles.textArea]} onChangeText={onChange} value={value} placeholder="Add details..." multiline numberOfLines={3} />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Task</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', borderRadius: 15 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 10, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#1976d2', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 }
});

export default TaskCreateForm;