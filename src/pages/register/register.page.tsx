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
    senha: z.string()
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
        try {
            await api.post('/api/users', {
                email: email,
                senha: senha,
                name: "teste",
            }, {
               
            })
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Box className=" max-h-full bg-neutral-500">
            <Box className="flex items-center justify-center py-52 " >
                <Box width={1000} className="flex flex-row shadow-2xl ">
                    <Box className="bgRegister flex flex-col justify-center items-center">
                        <Image src={LogoProjeto} alt="ChecolistoLogo" ></Image>
                    </Box>
                    <Box className="flex flex-col justify-center items-center w-full bg-neutral-50  " >
                        <Box width={360} className="text-xl text-center text-defaultBlue font-bold ">Prepare-se para uma experiência de compras intuitiva e eficiente. Bem-vindo ao nosso aplicativo de lista de compras</Box>
                        <FormControl as="form" className="mt-10 flex flex-col justify-center items-center">
                            <FormLabel className=" text-defaultBlue ">Email</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='email' boxShadow='outline' rounded='md' {...register('email')} />
                            <FormLabel className=" mt-2 text-defaultBlue">Senha</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='password' boxShadow='outline' rounded='md' {...register('senha')} />
                            <Button className="mt-6" colorScheme='blue' type="submit" onClick={(e) => handleSubmit(e)}>Entrar</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}