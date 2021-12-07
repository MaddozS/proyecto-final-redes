import StyledMainHero from "./StyledMainHero"
import Image from 'next/image'
import { useEffect, useState } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid";

export const MainHero = () => {

    // const [offset, setOffset] = useState(0);
    // const handleScroll = () => {console.log(window.scrollY); setOffset(window.scrollY)}

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll)
    //     return ()=> window.removeEventListener("scroll", handleScroll)
    // }, [setOffset]);

    return (
            <StyledMainHero>
                <Image src='/images/server.jpg' id="bg" layout="fill" priority/>
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center" 
                    className="overlay" 
                    bgcolor="rgba(0,0,0,.50)" 
                    width="100%" height="100%" 
                    position='absolute'>
                    <Typography variant="h3" fontWeight='bold' color='white' textAlign='center'>REDES Y SEGURIDAD DE COMPUTADORAS</Typography>
                </Grid>
            </StyledMainHero>
    )
}
