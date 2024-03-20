import { Box, Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import LogoProjeto from "../../assets/logoProjeto.png";
import Image from "next/image";
import { useState } from "react";




export default function Register() {
    const [inputEmail, setEmailInput] = useState<String>('')
    const [inputPass, setPassInput] = useState<String>('')

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)
    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassInput(e.target.value)

   
    return (
        <Box className="h-[800px] bg-neutral-300">
            <Box className="flex items-center justify-center py-52 " >
                <Box width={1000} className="flex flex-row shadow-2xl ">
                    <Box className="bgRegister flex flex-col justify-center items-center">
                     <Image src={LogoProjeto} alt="ChecolistoLogo" ></Image>
                    </Box>
                    <Box className="flex flex-col justify-center items-center w-full bg-neutral-50  " >
                        <Box width={360} className="text-xl text-center text-defaultBlue font-bold ">Prepare-se para uma experiência de compras intuitiva e eficiente. Bem-vindo ao nosso aplicativo de lista de compras</Box>
                        <FormControl className="mt-10 flex flex-col justify-center items-center" >
                            <FormLabel className=" text-defaultBlue ">Email</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='email' value={String(inputEmail)} onChange={handleEmailChange} boxShadow='outline' rounded='md' />
                            <FormLabel className=" mt-2 text-defaultBlue">Senha</FormLabel>
                            <Input width={400} bg={"lightgrey"} className="rounded-sm " type='password' value={String(inputPass)} onChange={handlePassChange} boxShadow='outline' rounded='md' />
                        </FormControl>
                        <Button className="mt-6" colorScheme='blue'>Entrar</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        
    )
}