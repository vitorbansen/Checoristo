import { Box, Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import LogoProjeto from "../../assets/logoProjeto.png";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";

//Define a estrutura dos campos do Formulario
const claimUsernameFormSchema = z.object({
    email: z.string().min(3)  //min(3)- Minimo de caracteres 
        .regex(/^([a-z\@\-]+)$/i), // Quais Caravteres vou permitir preencher
    senha: z.string(),
    name: z.string().min(3) 
})

// Convertendo estrutura do Zod para uma estrutura do typeScript inferir tipos de dados no form
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsernameForm() {
    const {
        register, watch
    } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema) //Passa o Schema para ele saber como pode validar o Usuario
    })

    async function handleSubmit(e: any) {
        e.preventDefault()
        const email = watch('email') // watch oberva as mudanças e atualiza quando tiver essa mudança de acordo que eu envio o formulario
        const senha = watch('senha')
        const name = watch('name')
        try {
            await api.post('/api/users', {
                email: email,
                senha: senha,
                name: name,
            }, {
               
            })
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Box className=" max-h-full bg-neutral-500">
            <Box className="flex items-center justify-center py-32 " >
                <Box width={800} className="flex flex-col shadow-2xl ">
                    <Box  className="bg-white flex flex-col items-center rounded-t-xl border-2 border-red-500">
                        <Image src={LogoProjeto} alt="ChecolistoLogo"  ></Image>
                    </Box>
                    <Box className="flex flex-col justify-start items-center w-full bg-neutral-50 rounded-b-xl" >
                        <FormControl as="form" className=" flex flex-col justify-center items-center mt-2">
                            <FormLabel className=" mt-1 text-defaultBlue">Nome</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='text' boxShadow='outline' rounded='md' {...register('name')} />

                            <FormLabel className=" text-defaultBlue ">Email</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='email' boxShadow='outline' rounded='md' {...register('email')} />

                            <FormLabel className=" mt-1 text-defaultBlue">Senha</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='password' boxShadow='outline' rounded='md' {...register('senha')} />

                            <Button className="mt-6 mb-5" colorScheme='blue' type="submit" onClick={(e) => handleSubmit(e)}>Cadastrar</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}