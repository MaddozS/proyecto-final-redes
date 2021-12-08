---
title: "Programación de aplicaciones con sockets"
date: "2021-12-01"
---

**VIDEO ACERCA DE PROGRAMACIÓN CON SOCKETS:** [https://www.youtube.com/watch?v=ndSrwvyUVZE](https://www.youtube.com/watch?v=ndSrwvyUVZE)

## Implementación en el sistema operativo

Una de las ideas iniciales en el diseño de los sockets era utilizar las funciones que suministra el sistema operativo Unix siempre que fuera posible y añadir nuevas llamadas al sistema si era difícil encajar los requerimientos de la programación en red con las funciones existentes en el operativo. 
En Unix, cuando una aplicación desea realizar operaciones de entrada/salida, llama a la función open para crear un descriptor de fichero que se usará luego para acceder al fichero. El sistema operativo implementa los descriptores de ficheros como un array de punteros a estructuras internas de datos. Para cada proceso, el sistema mantiene una tabla de descriptores de ficheros separada. Cuando un proceso abre un fichero, el sistema coloca un puntero a las estructuras de datos internas de ese fichero en la tabla de descriptores de ficheros de ese proceso y le devuelve al proceso el índice del puntero en esa tabla. Ese índice es el descriptor del fichero y es lo único que el proceso tiene que recordar cuando quiere acceder al fichero. 

![PHOTO1](/images/tema1-photo1.png)

El interfaz de los sockets añade una nueva abstracción para la comunicación a través de la red, el socket. Cada socket activo se identifica por un entero denominado su descriptor de socket. El sistema operativo Unix coloca los descriptores de sockets en la misma tabla de descriptores que los ficheros. De esta manera, una aplicación no puede tener un descriptor de fichero con el mismo valor que un descriptor de socket. 
Para crear un descriptor de socket se le añade al sistema operativo una nueva llamada al sistema: la función socket. Con esta función se crea un socket. Cuando un proceso crea un socket, el sistema coloca un puntero a las estructuras internas de ese socket en la tabla de descriptores de ficheros de ese proceso y le devuelve al proceso el índice de esa tabla. Ese índice es el descriptor de socket. Para rellenar los detalles específicos del socket será necesario realizar llamadas a otras funciones del API.

## Conceptos de diseño

![PHOTO2](/images/tema1-photo2.png)

Un socket, desde el punto de vista funcional, se define como un punto terminal al que pueden “enchufarse” dos procesos para comunicarse entre sí. Para que dos procesos pudieran comunicarse hubo que dotar al sistema de una serie de funciones que permitieran a estos procesos acceder a los dispositivos de red. Cuando se consideró cómo añadir funciones al sistema operativo para suministrar acceso a las comunicaciones, surgieron dos posibilidades: 

- Definir funciones que soportan específicamente el protocolo TCP/IP. 
- Definir funciones que soportan cualquier tipo de protocolo de comunicaciones y parametrizarse cuando se quisiera utilizar TCP/IP. 

En el momento del desarrollo del interfaz, el protocolo TCP/IP no estaba tan ampliamente divulgado como ahora y existían otras posibilidades para establecer comunicaciones entre dos máquinas. Por esta razón, los diseñadores optaron por la segunda opción: mantener la generalidad del interfaz.
Al desvincular la interfaz de sockets de un protocolo de comunicaciones determinado, se hará necesario especificar este protocolo cuando se usen esas funciones. De esta manera, cada vez que se quiera utilizar el interfaz de sockets, será necesario especificar: 
- **Familia de Protocolo.** Hay que indicar qué tipo de protocolo se va a utilizar para realizar las distintas comunicaciones. Los protocolos TCP/IP constituyen una única familia representada por la constante PF_INET. En el caso de comunicaciones entre procesos en la misma máquina usando el sistema de ficheros, tendríamos la familia de protocolos identificada como PF_UNIX. 
- **Tipo de servicio.** La interfaz permite seleccionar el tipo de servicio que se desea siempre y cuando el protocolo seleccionado sea capaz de suministrar distintos tipos de servicio. Aquí por tipo de servicio nos estamos refiriendo a cosas como comunicación orientada a la conexión o bien a comunicación orientada a los datagramas. 
- **Familia de direcciones finales.** Cada familia de protocolos especifica la dirección final de una comunicación de una manera distinta. La dirección final de una comunicación es el “punto” a través del cual un proceso envía o recibe datos. Por ejemplo en IP, una dirección final se especifica usando la dirección IP de la máquina y el número de puerto de protocolo que usará el programa. En el caso de usar la familia de protocolos UNIX la dirección final será el nombre de un fichero. El interfaz permite que las direcciones finales se puedan expresar con distintos formatos aún dentro de la propia familia de protocolos. Cada una de esas posibles representaciones correspondería a una familia de direcciones.

## Programación con el interfaz de sockets

![PHOTO3](/images/tema1-photo3.jpeg)

Para usar los sockets en un programa escrito en lenguaje C, lo único que hay que hacer es abrir uno y escribir o leer en él mediante las funciones adecuadas que enseguida veremos. Estas funciones están en la librería libsocket.a, con la que tendremos que enlazar nuestros programas. Las declaraciones de las funciones y las constantes predefinidas necesarias para trabajar con sockets se hallan en los ficheros:  

![PHOTO4](/images/tema1-photo4.png)

La comunicación entre dos sockets depende del tipo al que pertenezcan estos sockets. Ambos deben tener el mismo tipo para que la comunicación sea posible. 

![PHOTO5](/images/tema1-photo5.png)

Estos tipos pueden ser:
- **Stream.** Los sockets de este tipo, una vez conectados, permanecen unidos hasta que se cierran los extremos. Este canal de comunicación es como un flujo. Los datos que se van volcando en un socket llegan directamente al socket del otro extremo en el mismo orden en que los hemos enviado. La dirección del otro socket sólo hay que suministrar al hacer la conexión, no en cada envío. Es análogo a una comunicación telefónica en la que la dirección del otro interlocutor (su número de teléfono) se da sólo para iniciar la comunicación. Una vez iniciada, todo lo que hablamos por el teléfono llega automáticamente al otro interlocutor y en el mismo orden en que nosotros lo hemos pronunciado. Estos sockets son del tipo SOCK_STREAM y se comunican mediante el protocolo TCP (Transmission Control Protocol). 
- **Datagram.** Los sockets de este tipo se reconectan cada vez que necesitamos enviar algo. Por tanto en cada envío hay que volver a especificar la dirección del otro socket. Además, no hay garantía de que el receptor reciba los paquetes en el mismo orden en el que los hemos enviado (ni siquiera hay garantía de que lo reciba: el paquete puede perderse en el camino debido a un fallo de la red y el emisor no es informado de ello para que lo reenvíe). Es análogo al sistema de correos: en cada carta es necesario escribir la dirección del destinatario y las cartas no llegan necesariamente en el mismo orden en que las enviamos, además si una carta se pierde, el emisor no es informado de ello por correos. Estos sockets son del tipo SOCK_DGRAM y se comunican mediante el protocolo UDP (User Datagram Protocol).

## Desarrollo de aplicaciones. Tipo de servicios 

![PHOTO6](/images/tema1-photo6.png)

Al hablar de la arquitectura cliente/servidor, hay la posibilidad de implementar los servidores de dos formas distintas: 
- Servidores con estado, que son aquellos en los que el servidor almacena algún tipo de información sobre anteriores conexiones de un cliente. 
- Servidores sin estado, que son aquellos en los que la relación entre el cliente y el servidor depende únicamente de la petición en curso del cliente. 

Teniendo en cuenta la tecnología involucrada en el desarrollo de aplicaciones distribuidas utilizando la interfaz de sockets, podríamos hacer nuevas clasificaciones entre las posibles implementaciones de los servidores. Así, si nos fijamos en el protocolo utilizado para realizar las comunicaciones, podemos clasificar a los servidores como: 
- **Servidores orientados a la conexión.** Son aquellos en los que la comunicación entre el cliente y el servidor se realiza utilizando el protocolo TCP. 
- **Servidores orientados a los datagramas.** La comunicación entre el cliente y el servidor se realiza utilizando el protocolo UDP de IP. 

Sin embargo, si nos fijamos en la forma en la que el servidor atiende a sucesivos clientes, podemos hacer una clasificación mucho más interesante: 
- **Servidores iterativos.** Un servidor decimos que es iterativo cuando atiende a los clientes de uno en uno. Cuando un servidor iterativo está atendiendo a un cliente y se recibe una solicitud de servicio de otro cliente, el sistema mantiene a este último en una cola de espera hasta que el servidor termina de atender al primero de ellos. Los servidores iterativos son adecuados cuando el tiempo de servicio no es elevado. Esto es, cuando el tiempo que emplea un servidor en atender una petición cualquiera no supera un cierto límite dependiente de la aplicación, el sistema y la arquitectura sobre la que se ejecuta el programa servidor.
- **Servidores concurrentes.** Decimos que un servidor es concurrente cuando es capaz de atender peticiones de varios clientes simultáneamente. La concurrencia puede ser aparente o real según haya un único proceso servidor atendiendo a múltiples clientes, que sería el caso de la concurrencia aparente; o bien tengamos varios procesos atendiendo cada uno de ellos a un cliente diferente (concurrencia real). 

### Concurrencia real 

Para conseguir la concurrencia real en nuestro servidor será necesario que, cada vez que se reciba una petición de un cliente, un proceso independiente se encargue de atenderla. Como el coste de crear un nuevo proceso es elevado (en tiempo de ejecución y de recursos del sistema consumidos), este tipo de concurrencia es útil en aquellos casos en los que:
 
La respuesta del servidor requiere un trabajo muy significativo de acceso a los dispositivos de entrada/salida de la máquina (una consulta en una base de datos, por ejemplo) lo cual permite que, mientras el servicio a un determinado cliente está bloqueado a la espera de los dispositivos de entrada/salida, el servidor puede atender otro cliente. 
El tiempo de procesamiento entre las peticiones de los distintos clientes varía mucho. Por esta causa no se puede estimar un tiempo de respuesta uniforme para cada petición razón por la que algunos clientes tendrían que esperar excesivamente para ser atendidos o incluso, se perderían sus peticiones. 
El servidor se ejecuta en máquinas multiprocesadoras permitiendo que una instancia del servidor pueda ejecutarse en cada uno de los procesadores del sistema.

### Concurrencia aparente 

En este tipo de concurrencia, se consigue que un servidor atienda las peticiones de múltiples clientes con únicamente un proceso activo. Este tipo de estrategia permite conjugar los beneficios de tener múltiples procesos servidores pero sin la sobrecarga de crear dichos procesos. A pesar de eso, este tipo de implementación no es aplicable a todas las clases de servidores. Sólamente un cierto tipo de ellos pueden hacer uso de esta técnica. 
