import { Box } from "@mui/material"
import Navbar from "../Navbar"

const Layout = ({children}) => {
    return (
        <Box>
            <Navbar/>
            {children}
        </Box>
    )
}

export default Layout
