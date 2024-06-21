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
        .regex(/^([a-z\@\-]+)$/i), // Quais Caracteres vou permitir preencher
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
        <Box className="min-h-screen flex items-center justify-center bg-neutral-500 p-4">
            <Box className="w-full max-w-lg flex flex-col shadow-2xl bg-white rounded-xl overflow-hidden">
                <Box className="flex flex-col items-center p-4 border-b-2 border-500">
                    <Image src={LogoProjeto} alt="ChecolistoLogo" />
                </Box>
                <Box className="flex flex-col justify-start items-center w-full bg-neutral-50 p-4">
                    <form
            className="flex flex-col justify-center items-center w-full"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel className="mt-1 text-defaultBlue">Nome</FormLabel>
              <Input
                width="100%"
                bg="lightgrey"
                className="rounded-sm mb-2"
                type="text"
                boxShadow="outline"
                rounded="md"
                {...register("name")}
              />

              <FormLabel className="text-defaultBlue">Email</FormLabel>
              <Input
                width="100%"
                bg="lightgrey"
                className="rounded-sm mb-2"
                type="email"
                boxShadow="outline"
                rounded="md"
                {...register("email")}
              />

              <FormLabel className="mt-1 text-defaultBlue">Senha</FormLabel>
              <Input
                width="100%"
                bg="lightgrey"
                className="rounded-sm mb-4"
                type="password"
                boxShadow="outline"
                rounded="md"
                {...register("senha")}
              />

              <Button
                className="mt-6 mb-5 w-full"
                colorScheme="blue"
                type="submit"
              >
                Cadastrar
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
    )
}