---
title: "Seguridad en la web: HTTPS (HTTP Secure), SSL (Secure Socket Layer)"
date: "2021-12-01"
---

![PHOTO](/images/tema3-photo1.jpeg)

## Introducción
La seguridad en la web debe ser una prioridad crítica para cada organización. Junto con los emails, la web es uno de los principales vectores para ciberataques. La web y el uso de servicios DNS son el objetivo del 91% de ataques con malware, y el email y la web juntos son una parte clave para el 99% de los ataques exitosos. Mientras que la importancia de la seguridad en la web es indisputable, protegernos ante las amenazas a la seguridad de la web se vuelve más difícil cada día. 

## HTTPS

![PHOTO](/images/tema3-photo5.jpeg)

**VIDEO EXPLICACIÓN DEL TEMA:** [https://www.youtube.com/watch?v=ZyKZm6kF0QI&t=1s&ab_channel=GoogleSearchCentral](https://www.youtube.com/watch?v=ZyKZm6kF0QI&t=1s&ab_channel=GoogleSearchCentral)

HTTPS (HyperText Transfer Protocol Secure, protocolo seguro de transferencia de hipertexto) es un protocolo de comunicación de Internet que protege la integridad y la confidencialidad de los datos de los usuarios entre sus ordenadores y el sitio web. Como los usuarios esperan que su experiencia online sea segura y privada, te recomendamos que adoptes HTTPS para proteger sus conexiones con tu sitio web, independientemente de lo que este contenga.
El envío de datos mediante el protocolo HTTPS está protegido con el protocolo Seguridad en la capa de transporte (Transport Layer Security, TLS), que proporciona estas tres capas de seguridad principales:

- **Cifrado**: se cifran los datos intercambiados para mantenerlos a salvo de miradas indiscretas. Eso significa que, cuando un usuario está navegando por un sitio web, nadie puede "escuchar" sus conversaciones, hacer un seguimiento de sus actividades por las diferentes páginas ni robarle información.
- **Integridad de los datos**: los datos no pueden modificarse ni dañarse durante las transferencias, ni de forma intencionada ni de otros modos, sin que esto se detecte.
- **Autenticación**: demuestra que tus usuarios se comunican con el sitio web previsto. Proporciona protección frente a los ataques de intermediario y fomenta la confianza de los usuarios, lo que acaba creando otros beneficios empresariales.

![PHOTO](/images/tema3-photo2.jpeg)

### Prácticas recomendadas para implementar el protocolo HTTPS

#### Utilizar certificados de seguridad eficaces
Para poder habilitar el protocolo HTTPS en tu sitio, debes obtener un certificado de seguridad. El certificado lo emite una autoridad de certificación (CA), que toma las medidas necesarias para verificar que tu dirección web pertenezca realmente a tu organización. De este modo, se protege a tus usuarios de cualquier ataque de intermediario. Al configurar el certificado, asegúrate de obtener un nivel de seguridad alto escogiendo una clave de 2048 bits. Si ya tienes un certificado con una clave más débil (de 1024 bits), cámbiala por una de 2048 bits. Cuando elijas el certificado de tu sitio, debes hacer lo siguiente:

- Elegir el certificado de una CA de confianza que ofrezca asistencia técnica.
- Decidir qué tipo de certificado necesitas:
    - Un certificado único para cubrir un único dominio seguro (como www.example.com).
    - Un certificado para varios dominios si tienes varios sitios seguros conocidos (como www.example.com, cdn.example.com, example.co.uk).
    - Un certificado comodín si se trata de un sitio seguro con muchos subdominios dinámicos (como a.example.com, b.example.com).

#### Utiliza redirecciones de servidor permanentes

Redirige a los usuarios y a los buscadores a la página o al recurso HTTPS con redirecciones de servidor permanentes.

#### Adoptar el mecanismo de seguridad HSTS

Recomendamos que los sitios HTTPS sean compatibles con la seguridad de transporte estricta mediante HTTP (HSTS). Este mecanismo de seguridad indica a los navegadores que soliciten páginas HTTPS automáticamente, aunque los usuarios introduzcan http en la barra de direcciones. También indica a Google que sirva URLs seguras en los resultados de búsqueda. Con estas medidas, se minimiza el riesgo de servir a los usuarios contenido que no esté protegido.

Para que tu sitio sea compatible con HSTS, elige un servidor web que admita este mecanismo y habilita sus funciones.

Aunque es más seguro, HSTS añade complejidad a la estrategia de restauración. Es recomendado habilitarlo de la siguiente manera:

1. Primero lanzar el protocolo HTTPS en las páginas, sin el mecanismo HSTS.
2. Empezar por enviar encabezados HSTS que tengan un parámetro max-age de corta duración. Monitorear el tráfico de los usuarios y de otros clientes, así como el rendimiento de elementos dependientes, como los anuncios.
3. Aumentar lentamente el valor del parámetro max-age de HSTS.
4. Si HSTS no perjudica a los usuarios ni a los buscadores, se puede añadir el sitio a la lista de carga previa de HSTS, que utilizan la mayoría de los navegadores principales. De este modo, se aumenta la seguridad y mejora el rendimiento del sitio.

#### Evitar errores habituales

Durante el proceso para hacer que un sitio sea seguro mediante TLS, debemos evitar cometer estos errores:
- **Certificados caducados**: Comprobar siempre que el certificado esté actualizado.
- **Certificado registrado con un nombre de sitio web incorrecto**: Comprobar que se haya obtenido un certificado de todos los nombres de host que se publican en el sitio.
- **Falta de compatibilidad con la indicación de nombre de servidor (SNI)**: Comprobar que el servidor web sea compatible con SNI y que la audiencia utilice navegadores que sean compatibles habitualmente. Todos los navegadores modernos son compatibles con SNI, pero si queremos admitir navegadores más antiguos necesitaremos una IP dedicada.
- **Problemas de rastreo**: No impidamos que el sitio HTTPS se rastree mediante robots.txt.
- **Problemas de indexación**: Debemos permitir que los buscadores indexen las páginas siempre que sea posible. No debemos usar la etiqueta noindex.
- **Versiones del protocolo anterior**: Las versiones del protocolo anterior son vulnerables; debemos comprobar que tengamos las últimas versiones de las bibliotecas TLS e implementar las versiones de protocolo más recientes.
- **Elementos con diferentes niveles de seguridad**: Insertar únicamente contenido HTTPS en las páginas HTTPS.
- **Contenido diferente en HTTP y HTTPS**: Comprobar que el contenido de tus sitios HTTP y HTTPS sea el mismo.
- **Errores de código de estado HTTP en HTTPS**: Comprobar que el sitio web devuelva el código de estado HTTP correcto.

## SSL

![PHOTO](/images/tema3-photo6.jpeg)

SSL es el acrónimo de Secure Sockets Layer (capa de sockets seguros), la tecnología estándar para mantener segura una conexión a Internet, así como para proteger cualquier información confidencial que se envía entre dos sistemas e impedir que los delincuentes lean y modifiquen cualquier dato que se transfiera, incluida información que pudiera considerarse personal. Los dos sistemas pueden ser un servidor y un cliente (por ejemplo, un sitio web de compras y un navegador) o de servidor a servidor (por ejemplo, una aplicación con información que puede identificarse como personal o con datos de nóminas). 

Esto lo lleva a cabo asegurándose de que todos los datos que se transfieren entre usuarios y sitios web o entre dos sistemas sean imposibles de leer. Utiliza algoritmos de cifrado para codificar los datos que se transmiten e impedir que los hackers los lean al enviarlos a través de la conexión. Esta información podría ser cualquier dato confidencial o personal, por ejemplo, números de tarjeta de crédito y otros datos bancarios, nombres y direcciones.

Un certificado SSL se instala en el servidor pero muestra indicaciones visuales en el navegador, lo que indica a los usuarios que se encuentran protegidos con SSL. Para empezar, si en el sitio está presente SSL, los usuarios verán https:// al principio de la dirección web en lugar de http:// (la "s" extra significa "seguro"). Dependiendo del nivel de validación que un certificado otorga a un negocio, una conexión segura puede mostrarse a través de la presencia de un icono de un candado o una barra de direcciones con una señal verde.

Google aboga ahora por que HTTPS o SSL se usen en toda la red y, desde el año 2014, el motor de búsqueda ha recompensado los sitios web seguros con posiciones mejoradas en la web, otra buena razón para que cualquier sitio instale SSL. 

El protocolo TLS (Transport Layer Security, seguridad de la capa de transporte) es el protocolo sucesor de SSL. TLS es una versión mejorada de SSL. Funciona de un modo muy parecido a SSL, utilizando cifrado que protege la transferencia de datos e información. Los dos términos se utilizan con frecuencia indistintamente en la industria, aunque el término SSL sigue siendo el término mayoritario. Cuando usted compra un certificado SSL de DigiCert, puede utilizarlo tanto con protocolos SSL como TLS.

![PHOTO](/images/tema3-photo4.jpeg)

### Funcion

El principio básico es que, cuando instala un certificado SSL en el servidor y un navegador se conecta a él, la presencia del certificado SSL activa el protocolo SSL (o TLS), que cifrará la información que se envía entre el servidor y el navegador (o entre servidores); por supuesto, los detalles son un poco más complejos.

El protocolo SSL funciona directamente encima del protocolo de control de transmisión (TCP) y actúa como una especie de capa de seguridad. Permite que las capas de protocolo superiores se mantengan sin cambios y, al mismo tiempo, se proporciona una conexión segura. Así, debajo de la capa de SSL, las demás capas de protocolo pueden funcionar con normalidad.

Si un certificado SSL se utiliza correctamente, lo único que podrá ver un atacante será el puerto y la dirección IP que están conectados, y la cantidad aproximada de datos que se envían. Quizá sean capaces de cortar la conexión, pero el servidor y el usuario podrán percatarse de que esto se debe a un tercero. Sin embargo, como el atacante no puede interceptar ningún dato, esta acción no tiene prácticamente ninguna utilidad.

El hacker puede llegar a averiguar el nombre de host al que está conectado el usuario, pero lo importante es que no podrá identificar el resto de la URL. Como la conexión está cifrada, la información importante queda a salvo.

![PHOTO](/images/tema3-photo3.jpeg)
