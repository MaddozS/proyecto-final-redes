import { Grid } from '@mui/material';
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
      description: 'La seguridad de la red es un tema que día a día toma más importancia, ya que con la adopción del Internet como instrumento de comunicación y colaboración, cada vez son más los datos que manejamos por medio de computadoras y dispositivos móviles conectados entre sí, haciéndonos más vulnerables a los riesgos de ataques internos y externos como virus, gusanos, caballos de troya, códigos maliciosos, suplantación de identidad (phishing), hackers y más'
    },
    {
      title: ' Seguridad en la comunicación de datos en una red: IPSec (IP Secure) y VPN (Virtual Private Network)',
      href: '/tema/seguridad-en-la-comunicacion-de-datos-en-una-red',
      img: '/images/redes.jpeg',
      description: 'La seguridad de la red es un tema que día a día toma más importancia, ya que con la adopción del Internet como instrumento de comunicación y colaboración, cada vez son más los datos que manejamos por medio de computadoras y dispositivos móviles conectados entre sí, haciéndonos más vulnerables a los riesgos de ataques internos y externos como virus, gusanos, caballos de troya, códigos maliciosos, suplantación de identidad (phishing), hackers y más'
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
      description: 'Es una arquitectura emergente basada en la Internet global que facilita el intercambio de bienes y servicios entre redes de la cadena de suministro y que tiene un impacto importante en la seguridad y privacidad de los actores involucrados. En este contexto, Internet puede ser también una plataforma para dispositivos que se comunican electrónicamente y comparten información y datos específicos con el mundo que les rodea. Así, la IoT puede verse como una verdadera evolución de lo que conocemos como Internet.',
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
