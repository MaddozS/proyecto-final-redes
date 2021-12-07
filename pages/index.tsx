import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Layout from '../components/Layout';
import MainBody from '../components/MainBody';
import MainHero from '../components/MainHero'
import SubjectCard from '../components/SubjectCard';

const index = () => {
  const subjectsCards = [
    {
      title: 'Programación de aplicaciones con sockets',
      href: '/tema/introduccion-a-las-redes-de-las-computadoras',
      img: '/images/redes.jpeg',
      description: 'Lorem impsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: ' Seguridad en la comunicación de datos en una red: IPSec (IP Secure) y VPN (Virtual Private Network)',
      href: '/tema/seguridad-en-la-comunicacion-de-datos-en-una-red',
      img: '/images/redes.jpeg',
      description: 'Lorem impsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Seguridad en la Web: HTTPS (HTTP Secure), SSL (Secure Socket Layer)',
      href: '/tema/seguridad-en-la-web',
      img: '/images/redes.jpeg',
      description: 'Lorem impsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Internet de las Cosas (Internet of Things, IoT)',
      href: '/tema/internet-de-las-cosas',
      img: '/images/redes.jpeg',
      description: 'Lorem impsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <Layout>
      <MainHero />
      <MainBody>

        {subjectsCards.map((subjectCard, index) => (
          <Grid item xs={12} md={5}>
            <SubjectCard {...subjectCard}/>
          </Grid>
        ))}
      </MainBody>
    </Layout>
  )
}

export default index;
