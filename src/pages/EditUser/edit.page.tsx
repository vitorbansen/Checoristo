import { Box, Button, Input, VStack, HStack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";

// Define a estrutura dos campos do formulário
const userFormSchema = z.object({
    idUsuarios: z.string().optional(),
    email: z.string().min(3).regex(/^([a-z\@\-]+)$/i),
    senha: z.string(),
    name: z.string().min(3)
})

// Convertendo a estrutura do Zod para uma estrutura que o TypeScript possa inferir os tipos de dados no formulário
type UserFormData = z.infer<typeof userFormSchema>

export default function UserManagement() {
    const [users, setUsers] = useState<UserFormData[]>([]);
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const { register, handleSubmit, reset } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema)
    });

    // Função para carregar os usuários ao iniciar o componente
    useEffect(() => {
        fetchUsers();
    }, []);

    // Função para carregar os usuários da API
    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Função para lidar com a submissão do formulário
    const onSubmit = async (data: UserFormData) => {
        try {
            if (editingUserId) {
                await api.put(`/api/users/${editingUserId}`, data);
            } else {
                await api.post('/api/users', data);
            }
            fetchUsers(); // Recarregar a lista de usuários após a edição ou criação
            reset(); // Limpar o formulário após a submissão
            setEditingUserId(null); // Limpar o ID de edição
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Função para lidar com a exclusão de um usuário
    const deleteUser = async (userId: string) => {
        try {
            await api.delete(`/api/users/${userId}`);
            fetchUsers(); // Recarregar a lista de usuários após a exclusão
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Função para preencher o formulário com os dados do usuário selecionado para edição
    const editUser = (user: UserFormData) => {
        setEditingUserId(user.idUsuarios || null);
        reset(user);
    };

    return (
        <Box p={4}>
            <Box mb={4}>
                <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch">
                        <FormLabel>Email</FormLabel>
                        <Input {...register('email')} />

                        <FormLabel>Senha</FormLabel>
                        <Input type="password" {...register('senha')} />

                        <FormLabel>Nome</FormLabel>
                        <Input {...register('name')} />

                        <Button type="submit">Salvar</Button>
                    </VStack>
                </FormControl>
            </Box>

            <Box>
                {users.map(user => (
                    <HStack key={user.idUsuarios || undefined} p={2} borderWidth="1px" borderRadius="md">
                        <Text>{user.name}</Text>
                        <Text>{user.email}</Text>
                        <Button onClick={() => editUser(user)}>Editar</Button>
                        <Button onClick={() => deleteUser(user.idUsuarios || '')}>Excluir</Button>
                    </HStack>
                ))}
            </Box>
        </Box>
    );
}
