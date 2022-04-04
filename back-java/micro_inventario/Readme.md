# Plantilla Base para la coodificación de microservicios.

## Requerimientos
* Servidor WildFly
* IDE STS

## Configuración del driver jdbc de PostgreSQL para la base de datos.


1.- Bajar el jdbc de la base de datos´postgresql-42.2.5.jar´ de la pagina oficial de postgresql y pegar en el path : *home_wildfly\modules\system\layers\base\org\postgresql\main*
> De ser necesario se debe crear las carpetas antes de crear el archivo module.xml

2.- Crear un archivo llamado module.xml en el path: *home_wildfly\modules\system\layers\base\org\postgresql\main*


3.- Pegar el codigo en el archivo module.xml
> El valor del atributo path de la etiqueta <resource-root debe ser el nombre del jar que se descargo y pego en la carpeta main.

''''

	<?xml version="1.0" encoding="UTF-8"?>
	<module xmlns="urn:jboss:module:1.3" name="org.postgresql">
	    <resources>
	        <resource-root path="postgresql-42.2.5.jar"/>
	        <!-- Make sure this matches the name of the JAR you are installing -->
	    </resources>
	    <dependencies>
	        <module name="javax.api"/>
	        <module name="javax.transaction.api"/>
	    </dependencies>
	</module>
''''

## Configuración del datasource


1. Abrir el archivo ´home_wildfly/configuration/standalone/configuration/standalone.xml´ y dentro de la etiqueta ´<datasources>´ crear un nuevo datasource.

'''

	<datasource jndi-name="java:jboss/datasources/PostgreSQLDataSource" pool-name="PostgreSQLDataSourcePool" enabled="true" use-java-context="true" statistics-enabled="true">
	                    <connection-url>jdbc:postgresql://localhost:5432/FuncionariosMAG</connection-url>
	    <driver>postgresql</driver>
	    <security>
	        <user-name>postgres</user-name>
	        <password>magap1.2</password>
	    </security>
	</datasource>
'''

2. En el caso de que no este incluido el driver en el archivo standalone.xml agregar las lineas dentro de la etiqueta ´<drivers>´
'''
<driver name="postgresql" module="org.postgresql">                    	<driver-class>org.postgresql.Driver</driver-class>
</driver>
'''

## Configuración de usuario widfly

1. Vaya al directorio binario o bin bajo el directorio de instalación del servidor JBoss.
2. Ejecute el script add-user.
    *Linux add-user.sh
    *Windows add-user.bat
3. Siga las solicitudes para generar un nuevo usuario para poder administrar el servidor y subir el war para desplegar el backend.
4. La url para ver desplegar la documentacion swagger es la siguiente:
"http://dominio:puerto/micro_inventario/swagger-ui.html#/".

## Desplegar servidor y subir war
1. Para ejecutar el servidor debemos ejecutar el archvio standalone.bat, que se encuentra en la carpeta bin.
2. Una vez configurado el usuario widfly debemos dirigirnos a la url del panel administrativo asumiendo que es local (http://localhost:9990/console/index.html).
3. Tenemos la pagina de inicio de wildfly' damos clic en consola de administración.
4. Estamos en el menú de consola en la cual daremos clic en DEPLOYMENTS.
5. Pondremos en Add / Upload Deployment.
6. Buscamos el archivo en nuestra pc (war que se genera en el proyecto con el siguiente comando) mvn clean install -DskipTests
7. Lo seleccionamos y abrimos el archivo .war
8. Le damos en Next para cargar el archivo
9. Damos los nombre, Enable en "ON" y finalizamos
10. nos aparecerá una ventana de confirmación y salimos. Y listo ya podremos consummir los servicios web desde el front respectivo.