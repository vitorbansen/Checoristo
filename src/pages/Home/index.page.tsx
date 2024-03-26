import { Box, border } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

export default function Home() {
    return (<>
        <Box className="bg-white h-[100rem] flex flex-col justify-center items-center">
            <Box className="bg-slate-500 h-[10rem] rounded-2xl max-w-full flex flex-row justify-between items-center px-5 text-4xl font-bold" width={1200}>
          <Box className=" py-7 px-10">Nome</Box>
          <Box className=" py-7 px-10">Marca</Box>
          <Box className=" py-7 px-10">Quantidade</Box>
          <Box className=" py-7 px-10">Preço</Box>
            </Box>
        </Box>
    </>
    )
}