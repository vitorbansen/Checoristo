import { Box, Button, Input, Checkbox, Select } from "@chakra-ui/react";
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
            console.log(formData)
            setLoading(true);
            let categoriaId = formData.idCategoria; // Salva o ID da categoria selecionada
            if (formData.idCategoria === "novaCategoria") { // Se "novaCategoria" for selecionada, cria uma nova categoria
                const novaCategoriaResponse = await axios.post<Categoria>("/api/categorias", { nomeCategoria: formData.nomeCategoria });
                categoriaId = novaCategoriaResponse.data.idCategoria; // Atualiza o ID da categoria com a nova categoria criada
            }
            const response = await axios.post<Item>("/api/items", { ...formData, quantidade: Number(formData.quantidade) });
            setItems(prevItems => [...prevItems, response.data]);
            setFormData({}); // Limpa o formulário após a criação do item
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
        <div className="w-max-[1100px] w-full h-auto mb-20 mt-20 flex flex-col justify-center items-center">
            <form onSubmit={(e) => { e.preventDefault(); createItem(); }} className="bg-neutral-50 rounded-3xl p-5 mt-5 ">
                <Input placeholder="Nome do Item" width={400} mb={2} name="nomeItem" value={formData.nomeItem || ""} onChange={handleChange} required />
                <Input placeholder="Quantidade" width={400} mb={2} name="quantidade" value={formData.quantidade || ""} onChange={handleChange} required />
                <Input placeholder="Descrição" width={400} mb={2} name="descricao" value={formData.descricao || ""} onChange={handleChange} />
                <Checkbox name="comprado" checked={formData.comprado || false} onChange={handleChange}>Comprado</Checkbox>

                {/* <Select placeholder="Selecione uma categoria" width={400} mb={2} name="idCategoria" value={formData.idCategoria || ""} onChange={handleChange}>
                    
                    {categorias.map(categoria => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nomeCategoria}</option>
                    ))}
                    <option value="novaCategoria">+ Nova Categoria</option> 
                </Select> */}

                {formData.idCategoria === "novaCategoria" && ( // Mostra o campo para inserir o nome da nova categoria
                    <Input placeholder="Nome da Nova Categoria" width={400} mb={2} name="nomeCategoria" value={formData.nomeCategoria || ""} onChange={handleChange} required />
                )}
                <Button colorScheme='green' type="submit" isLoading={loading}>Adicionar Item</Button>
            </form>

            <Box className="bg-white h-auto flex flex-col justify-center items-center mt-30">
                <Box className="bg-slate-500 h-[10rem] rounded-2xl max-w-full flex flex-row justify-between items-center px-5 text-4xl font-bold text-white mt-40" width={1200}>
                    <Box className="py-7 px-10">Nome</Box>
                    <Box className="py-7 px-10">Quantidade</Box>
                    <Box className="py-7 px-10">Descrição</Box>
                    <Box className="py-7 px-10">Comprado</Box>
                </Box>
                {items.map(item => (
                    <Box key={item.idItem} className="bg-gray-100 border-gray-200 rounded-lg max-w-full flex flex-row justify-between items-center px-5 text-lg font-medium text-gray-800 mt-3 shadow-lg border" width={1200}>
                        <Box className="py-4 px-10">{item.nomeItem}</Box>
                        <Box className="py-4 px-10">{item.quantidade}</Box>
                        <Box className="py-4 px-10">{item.descricao}</Box>
                        <Box className="py-4 px-10">{item.comprado ? "Sim" : "Não"}</Box>
                    </Box>
                ))}
            </Box>
        </div>
    );
}
