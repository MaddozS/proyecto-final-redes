import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Layout from "../components/Layout"
import PersonCard from "../components/PersonCard"

const colaboradores = () => {

    const personas = [
        {
            nombre: "Axel Adrián Anaya García",
            img: "/images/colaboradores/axel.jfif",
        },
        {
            nombre: "Dana Joselyn Bagundo González",
            img: "/images/colaboradores/dana.jfif",
        },

        {
            nombre: "Suemi Andrea Castillo González",
            img: "/images/colaboradores/suemi.jfif",
        },
        {
            nombre: "Rodrigo Hernández Góngora", 
            img: "/images/colaboradores/sonic.jfif",
        }
    ]
    return (
        <Layout>
            <Box bgcolor='#2F2F2F' zIndex={100} px={{xs:5, lg: 15}}  py={12}>
                <Typography variant='h2' fontWeight='bold' color='white' textAlign='center'>Colaboradores</Typography>
                <Grid container px={{xs:5, lg: 10}} py={15} justifyContent='center' spacing={10}>
                    
                        {personas.map((persona, index) => (
                            <Grid item xs={12} sm={6} md={6} lg={3}>
                            <PersonCard 
                                key={persona.nombre} 
                                name={persona.nombre} 
                                img={persona.img} /> 
                                </Grid>))
                        }
                </Grid>
            </Box>
        </Layout>
    )
}

export default colaboradores
