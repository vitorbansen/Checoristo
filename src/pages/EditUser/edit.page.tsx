import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/react'
import { api } from "@/lib/axios";

interface User {
    idUsuarios: string;
    name: string;
    email: string;
    senha: string;
}

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState<string | null>(null); // State to track which user is being edited
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<User>();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await api.get<User[]>('/api/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async function handleDelete(idUsuarios: string) {
        try {
            await api.delete(`/api/users?idUsuarios=${idUsuarios}`);
            setUsers(users.filter(user => user.idUsuarios !== idUsuarios));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    async function onSubmit(data: User) {
        try {
            if (editingUserId) {
                await api.put(`/api/users?idUsuarios=${editingUserId}`, data); // Send PUT request for editing user
                const updatedUsers = users.map(user =>
                    user.idUsuarios === editingUserId ? { ...user, ...data } : user
                );
                setUsers(updatedUsers);
                setEditingUserId(null); // Reset editing state
            } else {
                const response = await api.post<User>('/api/users', data);
                setUsers([...users, response.data]);
            }
            reset(); // Reset the form after submission
        } catch (err) {
            console.error("Error submitting user:", err);
        }
    }

    function startEditingUser(idUsuarios: string) {
        setEditingUserId(idUsuarios);
        const userToEdit = users.find(user => user.idUsuarios === idUsuarios);
        if (userToEdit) {
            reset(userToEdit); // Populate form fields with user data
        }
    }

    async function handleRefresh() {
        setLoading(true); // Set loading state to true while fetching users
        await fetchUsers(); // Fetch users from the API
    }

    return (
        <Box className="min-h-screen flex items-center justify-center bg-neutral-500 p-4">
        <Box
        className="flex flex-col items-center bg-neutral-50 p-8 rounded-xl shadow-2xl"
        maxWidth="800px"
        width="100%"
        >
        <Button className="mb-4" colorScheme="blue" onClick={handleRefresh}>
          Atualizar
        </Button>
        {loading ? <p>Carregando...</p> : renderUsers()}

        <FormControl as="form" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <FormLabel className="mt-1 text-defaultBlue">Nome</FormLabel>
          <Input
            placeholder="Nome"
            width="100%"
            bg="lightgrey"
            className="rounded-sm mb-4"
            type="text"
            boxShadow="outline"
            rounded="md"
            {...register('name')}
          />

          <FormLabel className="text-defaultBlue">Email</FormLabel>
          <Input
            placeholder="Email"
            width="100%"
            bg="lightgrey"
            className="rounded-sm mb-4"
            type="email"
            boxShadow="outline"
            rounded="md"
            {...register('email')}
          />

          <FormLabel className="mt-1 text-defaultBlue">Senha</FormLabel>
          <Input
            placeholder="Senha"
            width="100%"
            bg="lightgrey"
            className="rounded-sm mb-4"
            type="password"
            boxShadow="outline"
            rounded="md"
            {...register('senha')}
          />

          <Button className="mt-6" colorScheme="green" type="submit">
            {editingUserId ? 'Salvar' : 'Cadastrar'}
          </Button>
        </FormControl>
      </Box>
    </Box>
  );

  function renderUsers() {
    return (
      <Box overflowX="auto" className="w-full mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2">Email</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2">Nome</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.idUsuarios}>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Button size="sm" className="px-2 mr-3" colorScheme="yellow" onClick={() => startEditingUser(user.idUsuarios)}>
                    Edit
                  </Button>
                  <Button size="sm" className="px-2" colorScheme="red" onClick={() => handleDelete(user.idUsuarios)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
}
