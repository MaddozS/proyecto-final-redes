import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const MainBody = ({children}) => {
    return (
        <Box bgcolor='#2F2F2F' zIndex={100} px={{xs:5, lg: 15}}  py={12} id='temas'>
            <Typography variant='h2' fontWeight='bold' color='white' textAlign='center'>Temas relevantes</Typography>
            <Grid container spacing={{xs: 5, lg: 10}} px={{xs:5, lg: 10}} py={15} justifyContent='center'>
                {children}
            </Grid>
        </Box>
    )
}
