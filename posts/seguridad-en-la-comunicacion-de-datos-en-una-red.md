---
title: "Seguridad en la comunicación de datos en una red: IPSec (IP Secure) y VPN (Virtual Private Network"
date: "2021-12-01"
---

IPSec (abreviatura de Internet Protocol Security) es un conjunto de protocolos cuya función es asegurar las comunicaciones sobre el Protocolo de Internet (IP) autenticando y/o cifrando cada paquete IP en un flujo de datos. IPsec también incluye protocolos para el establecimiento de claves de cifrado.

Los protocolos de IPsec actúan en la capa de red, la capa 3 del modelo OSI.Otros protocolos de seguridad para Internet de uso extendido, como SSL, TLS y SSH operan de la capa de transporte (capas OSI 4 a 7) hacia arriba. Esto hace que IPsec sea más flexible, ya que puede ser utilizado para proteger protocolos de la capa 4, incluyendo TCP y UDP, los protocolos de capa de transporte más usados. IPsec tiene una ventaja sobre SSL y otros métodos que operan en capas superiores. Para que una aplicación pueda usar IPsec no hay que hacer ningún cambio, mientras que para usar SSL y otros protocolos de niveles superiores, las aplicaciones tienen que modificar su código.

IPsec está implementado por un conjunto de protocolos criptográficos para asegurar el flujo de paquetes, garantizar la autenticación mutua y establecer parámetros criptográficos.

La arquitectura de seguridad IP utiliza el concepto de asociación de seguridad (SA) como base para construir funciones de seguridad en IP. Una asociación de seguridad es simplemente el paquete de algoritmos y parámetros (tales como las claves) que se está usando para cifrar y autenticar un flujo particular en una dirección. Por lo tanto, en el tráfico normal bidireccional, los flujos son asegurados por un par de asociaciones de seguridad. La decisión final de los algoritmos de cifrado y autenticación (de una lista definida) le corresponde al administrador de IPsec.

Para decidir qué protección se va a proporcionar a un paquete saliente, IPsec utiliza el índice de parámetro de seguridad (SPI), un índice a la base de datos de asociaciones de seguridad (SADB), junto con la dirección de destino del header del paquete, que juntos identifican de forma única una asociación de seguridad para dicho paquete. Para un paquete entrante se realiza un procedimiento similar; en este caso IPsec coge las claves de verificación y descifrado de la base de datos de asociaciones de seguridad.

En el caso de multicast, se proporciona una asociación de seguridad al grupo, y se duplica para todos los receptores autorizados del grupo. Puede haber más de una asociación de seguridad para un grupo, utilizando diferentes SPIs, y por ello permitiendo múltiples niveles y conjuntos de seguridad dentro de un grupo. De hecho, cada remitente puede tener múltiples asociaciones de seguridad, permitiendo autenticación, ya que un receptor sólo puede saber que alguien que conoce las claves ha enviado los datos. Hay que observar que el estándar pertinente no describe cómo se elige y duplica la asociación a través del grupo; se asume que un interesado responsable habrá hecho la elección.
## Modos de funcionamiento

IPSec cuenta con dos modos principales de funcionamiento: Modo Transporte y Modo Túnel.
En modo transporte, sólo la carga útil (los datos que se transfieren) del paquete IP es cifrada y/o autenticada. El enrutamiento permanece intacto, ya que no se modifica ni se cifra el IP Header; sin embargo, cuando se utiliza la Authentication Header (AH), las direcciones IP no pueden ser traducidas, ya que esto invalidará el hash. Las capas de transporte y aplicación están siempre aseguradas por un hash, de forma que no pueden ser modificadas de ninguna manera (por ejemplo traduciendo los números de puerto TCP y UDP). El modo transporte se utiliza para comunicaciones ordenador a ordenador.

En el modo túnel, todo el paquete IP (datos más headers del mensaje) es cifrado y/o autenticado. Debe ser entonces encapsulado en un nuevo paquete IP para que funcione el enrutamiento. El modo túnel se utiliza para comunicaciones red a red (túneles seguros entre routers, p.e. para VPNs) o comunicaciones ordenador a red u ordenador a ordenador sobre Internet. El propósito de este modo es establecer una comunicación segura entre dos redes remotas sobre un canal inseguro.

![REDES1](/images/redes.jpeg)

## Headers

### IP Header

![REDES2](/images/redes2.jpeg)

Este header carga con todo el tráfico que estaremos considerando. Definamos cada una de sus secciones: 
- **ver**: Es la versión del protocolo IP. IPsec se monta sobre IPv4.
- **hlen**: Longitud del header, en palabras de 32 bits. Su valor mínimo es de 5 para un header correcto, y el máximo de 15. El tamaño del header nunca incluye el tamaño del payload o del siguiente header.
- **TOS**: Indica una serie de parámetros sobre la calidad de servicio deseada durante el tránsito por una red. Algunas redes ofrecen prioridades de servicios, considerando determinado tipo de paquetes “más importantes” que otros (en particular estas redes solo admiten los paquetes con prioridad alta en momentos de sobrecarga).
- **pkt len**: Es el tamaño total, en octetos, del datagrama, incluyendo el tamaño del header y el de los datos. El tamaño máximo de los datagramas usados normalmente es de 576 octetos (64 de headers y 512 de datos). Una máquina no debería envíar datagramas mayores a no ser que tenga la certeza de que van a ser aceptados por la máquina destino. En caso de fragmentación este campo contendrá el tamaño del fragmento, no el del datagrama original.
- **ID**: Indica el identificador del fragmento actual en caso de que el paquete estuviera fragmentado
- **fgls**: Actualmente utilizado sólo para especificar valores relativos a la fragmentación de paquetes:
    - bit 0: Reservado; debe ser 0
    - bit 1: 0 = Divisible, 1 = No Divisible (DF)
    - bit 2: 0 = Último Fragmento, 1 = Fragmento Intermedio (le siguen más fragmentos) (MF)
    
    La indicación de que un paquete es indivisible debe ser tenida en cuenta bajo cualquier circunstancia. Si el paquete necesita ser fragmentado, no se enviará.
- **frag offset**: En paquetes fragmentados indica la posición, en unidades de 64 bits, que ocupa el paquete actual dentro del datagrama original. El primer paquete de una serie de fragmentos contendrá en este campo el valor 0.
- **TTL**: Indica el máximo número de routers que un paquete puede atravesar. Cada vez que algún nodo procesa este paquete disminuye su valor en uno por cada router que pase. Cuando llegue a ser 0, el paquete no será reenviado.
- **Proto**: Indica el protocolo de siguiente nivel utilizado en la parte de datos del datagrama.

### IPSec AH Header
AH está dirigido a garantizar integridad sin conexión y autenticación de los datos de origen de los datagramas IP. Para ello, calcula un Hash Message Authentication Code (HMAC) a través de algún algoritmo hash operando sobre una clave secreta, el contenido del paquete IP y las partes inmutables del datagrama. Este proceso restringe la posibilidad de emplear NAT, que puede ser implementada con NAT transversal. Por otro lado, AH puede proteger opcionalmente contra ataques de repetición utilizando la técnica de ventana deslizante y descartando paquetes viejos. AH protege la carga útil IP y todos los campos del header de un datagrama IP excepto los campos mutantes, es decir, aquellos que pueden ser alterados en el tránsito. En IPv4, los campos del Header IP mutantes (y por lo tanto no autenticados) incluyen TOS, Flags, Offset de fragmentos, TTL y suma de verificación del header. AH opera directamente por encima de IP, utilizando el protocolo IP número 51. Un Header AH mide 32 bits, y se organizan de la siguiente manera: 

![REDES3](/images/redes3.jpeg)

- **next hdr**: Identifica cuál es el siguiente protocolo, es decir, cual es el protocolo que será autentificado, cuál es el payload.
- **AH len**: El tamaño del paquete AH.
- **RESERVED**: Reservado para futuras aplicaciones. Debe estar a 0
- **Security parameters index (SPI)**: Indica los parámetros de seguridad, que en combinación con los parámetros IP, identifican la asociación de seguridad del paquete
- **Sequence Number**: Es un número creciente usado para prevenir ataques por repetición. El número está incluido en los datos encriptados, así que cualquier alteración será detectada
- **Authentication Data**: Contiene el valor de identificación de integridad. Puede contener relleno.Se calcula sobre el paquete entero, incluidas la mayoría de los headers. El que recibe calcula otra vez el hash, y si este no coincide, el paquete se tira.

## ESP (Encapsulating Security Payload)

![vpn](/images/vpn.jpeg)

Añadir encriptación hace que ESP sea un poco más complicado, ya que la encapsulación rodea a la carga útil es algo más que precederá con AH: ESP incluye cabecera y campos para dar soporte a la encriptación y a una autentificación opcional. Además, provee los modos de transporte y túnel, los cuales nos son ya familiares.

Las RFCs de IPsec no insisten demasiado en un sistema particular de encriptación, pero normalmente se utiliza DES, triple-DES, AES o Blowfish para asegurar la carga útil de “ojos indiscretos”. El algoritmo usado para una conexión en particular es definido por la Security Association (SA), y esta SA incluye no sólo el algoritmo, también la llave usada.

A diferencia de AH, que da una pequeña cabecera antes de la carga útil, ESP rodea la carga útil con su protección. Los parámetros de seguridad Index y Sequence Number tienen el mismo propósito que en AH, pero nos encontramos como relleno en la cola del paquete el campo “siguiente campo” y el opcional “Authentication data”.

Es posible usar ESP sin ninguna encriptación (usar el algoritmo NULL), sin embargo estructura el paquete de la misma forma. No nos da ninguna confidencialidad a los datos que estamos transmitiendo, y sólo tiene sentido usarlo con una autenticación ESP. No tiene sentido usar ESP sin encriptación o autenticación (a no ser que estemos simplemente probando el protocolo).

El relleno sirve para poder usar algoritmos de encriptación orientados a bloques, dado que tenemos que crear una carga a encriptar que tenga un tamaño múltiplo de su tamaño de bloque. El tamaño del relleno viene dado por el campo pad len. El campo next hdr nos da el tipo (IP, TCP, UDP,etc) de la carga útil, aunque esto sea usado como un punto para volver hacia atrás en el paquete para ver que hay en el AH.

Además de la encriptación, ESP puede proveer autenticación con la misma HMAC de AH. A diferencia de AH, esta autentifica sólo la cabecera ESP y la carga útil encriptada, no todo el paquete IP. Sorprendentemente, esto no hace que la seguridad de la autentificación sea más débil, pero nos da algunos beneficios importantes.

Cuando un forastero examina un paquete IP que contiene datos ESP, es prácticamente imposible adivinar qué es lo que tiene dentro, excepto por los datos encontrados en la cabecera IP (siendo interesantes las direcciones IP de origen y destino). El atacante va a saber casi seguro que son datos ESP (está en la cabecera que son datos ESP), pero no va a saber de qué tipo es la carga útil.

Incluso la presencia de Authentication Data no puede ser determina solamente con mirar al paquete. Esta resolución está hecha por la Security Parameters Index, que hace referencia al conjunto de parámetros precompartidos para esta conexión.


## VPN

VPN significa "Virtual Private Network" (Red privada virtual) y describe la oportunidad de establecer una conexión protegida al utilizar redes públicas. Las VPN cifran su tráfico en internet y disfrazan su identidad en línea. Esto le dificulta a terceros el seguimiento de sus actividades en línea y el robo de datos. El cifrado se hace en tiempo real.

Una VPN oculta su verdadera dirección IP al permitirle a la red redireccionarla por un servidor remoto especial, alojado por el proveedor de una VPN. Esto significa que si navega en línea con una VPN, el servidor de la VPN se convierte en la fuente de sus datos. Esto significa que su Proveedor de servicios de internet (ISP) y otros terceros no pueden ver los sitios web que visita o qué datos envía y recibe en línea. Una VPN funciona como un filtro que convierte a todos sus datos en texto incomprensible. Si alguien lograra interceptar su información, de nada le sirve.

Una conexión VPN disfraza sus datos en línea y los protege del acceso externo. Cualquiera que tenga acceso a la red y quiera hacerlo puede ver los datos no cifrados. Con una VPN, los hackers y los cibercriminales no pueden descifrar estos datos.

**Cifrado seguro**: Para leer los datos, necesita una clave de cifrado . Sin ella, le llevaría millones de años a una computadora descifrar el código en caso de un ataque de fuerza bruta. Con la ayuda de una VPN, sus actividades en línea se ocultan incluso en redes públicas.

**Disfrazar su paradero**: los servidores de VPN principalmente actúan como sus servidores proxy en internet. Debido a que los datos de ubicación demográficos provienen de un servidor en otro país, su ubicación real no se puede determinar. A esto se suma que, en la mayoría de los casos, los proveedores de estos servicios no guardan registros sobre sus actividades. Por otra parte, algunos proveedores registran su comportamiento, pero no transmiten esa información a terceros. Esto significa que cualquier registro potencial de su comportamiento de usuario permanece oculto de manera permanente.

**Acceso a contenido regional**: el contenido web regional no siempre es accesible desde cualquier parte. Los servicios y los sitios web a menudo contienen contenido que solo puede accederse desde ciertas partes del mundo. Las conexiones estándar utilizan servidores locales en el país para determinar su ubicación. Esto significa que no puede acceder al contenido en casa mientras viaja, y no puede acceder a contenido internacional desde casa. Con la suplantación de ubicación de VPN, se puede cambiar a un servidor a otro país y “cambiar” su ubicación de manera eficaz.

**Transferencia segura de datos**: si trabaja de forma remota, puede necesitar acceder a archivos importantes en la red de su empresa. Por razones de seguridad, este tipo de información requiere una conexión segura. Para obtener acceso a la red, a menudo se requiere una conexión VPN. Los servicios de VPN establecen conexiones con servidores privados y utilizan métodos de cifrado para reducir el riesgo de filtración de datos.
