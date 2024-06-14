import { Box, Button, Input, Checkbox, Select, FormControl, FormLabel, VStack, HStack } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

interface Item {
    idItem: number;
    nomeItem: string;
    quantidade: number;
    descricao: string;
    comprado: boolean;
    idCategoria: number;
}

interface Categoria {
    idCategoria: number;
    nomeCategoria: string;
}

interface FormData {
    nomeItem?: string;
    quantidade?: number;
    descricao?: string;
    comprado?: boolean;
    idCategoria?: number | "novaCategoria";
    nomeCategoria?: string;
}

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({});
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        fetchItems();
        fetchCategorias();
    }, []);

    async function fetchItems() {
        try {
            const response = await axios.get<Item[]>("/api/items");
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    async function fetchCategorias() {
        try {
            const response = await axios.get<Categoria[]>("/api/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function createItem() {
        try {
            console.log(formData);
            setLoading(true);
            let categoriaId = formData.idCategoria;
            if (formData.idCategoria === "novaCategoria") {
                const novaCategoriaResponse = await axios.post<Categoria>("/api/categorias", { nomeCategoria: formData.nomeCategoria });
                categoriaId = novaCategoriaResponse.data.idCategoria;
            }
            const response = await axios.post<Item>("/api/items", { ...formData, quantidade: Number(formData.quantidade), idCategoria: categoriaId });
            setItems(prevItems => [...prevItems, response.data]);
            setFormData({});
        } catch (error) {
            console.error("Error creating item:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | number | boolean = value;

        if (type === 'checkbox') {
            newValue = (e.target as HTMLInputElement).checked;
        }

        setFormData(prevData => ({ ...prevData, [name]: newValue }));
    };

    return (
        <Box maxW="1600px" w="full" h="auto" mb="20" mt="20" mx="auto" display="flex" flexDirection="column" alignItems="center">
            <form onSubmit={(e) => { e.preventDefault(); createItem(); }} className="bg-neutral-50 rounded-3xl p-5 mt-5" style={{ width: "100%" }}>
                <HStack spacing={4} wrap="wrap" justifyContent="center">
                    <FormControl>
                        <FormLabel>Nome do Item</FormLabel>
                        <Input placeholder="Nome do Item" name="nomeItem" value={formData.nomeItem || ""} onChange={handleChange} required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Quantidade</FormLabel>
                        <Input placeholder="Quantidade" name="quantidade" value={formData.quantidade || ""} onChange={handleChange} required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Descrição</FormLabel>
                        <Input placeholder="Descrição" name="descricao" value={formData.descricao || ""} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <Checkbox name="comprado" isChecked={formData.comprado || false} onChange={handleChange}>Comprado</Checkbox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Categoria</FormLabel>
                        <Select placeholder="Selecione uma categoria" name="idCategoria" value={formData.idCategoria || ""} onChange={handleChange}>
                            {categorias.map(categoria => (
                                <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nomeCategoria}</option>
                            ))}
                            <option value="novaCategoria">+ Nova Categoria</option>
                        </Select>
                    </FormControl>
                    {formData.idCategoria === "novaCategoria" && (
                        <FormControl>
                            <FormLabel>Nome da Nova Categoria</FormLabel>
                            <Input placeholder="Nome da Nova Categoria" name="nomeCategoria" value={formData.nomeCategoria || ""} onChange={handleChange} required />
                        </FormControl>
                    )}
                </HStack>
                <Button colorScheme='green' type="submit" isLoading={loading} mt={4}>Adicionar Item</Button>
            </form>

            <Box bg="white" h="auto" display="flex" flexDirection="column" alignItems="center" mt="10" w="full">
                <HStack bg="gray.600" h="4rem" rounded="lg" w="full" maxW="1600px" justifyContent="space-between" px="5" textColor="white" fontSize="xl" fontWeight="bold">
                    <Box py="2" px="4">Nome</Box>
                    <Box py="2" px="4">Quantidade</Box>
                    <Box py="2" px="4">Descrição</Box>
                    <Box py="2" px="4">Comprado</Box>
                </HStack>
                {items.map(item => (
                    <HStack key={item.idItem} bg="gray.100" border="1px" borderColor="gray.200" rounded="lg" w="full" maxW="1200px" justifyContent="space-between" px="5" mt="3" boxShadow="lg">
                        <Box py="2" px="4">{item.nomeItem}</Box>
                        <Box py="2" px="4">{item.quantidade}</Box>
                        <Box py="2" px="4">{item.descricao}</Box>
                        <Box py="2" px="4">{item.comprado ? "Sim" : "Não"}</Box>
                    </HStack>
                ))}
            </Box>
        </Box>
    );
}
