# FrontInventario

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

El proyecto se encuentra dividido en 4 modulos:
Dashboard: contiene tanto los modulos que se utilizan en los procesos de cada rol (carpetal module), ademas de los componentes que se muestran en ambos roles (home, not-found).

general: contiene los componentes que se utilizan a lo largo del proyecto front (dialog, spinner), ademas de un archivo global que se utliza para almacenar los mensajes que se utilizan en toda la web.

login: contiene todos los componentes ts, css, html para el proceso del login de los usuarios.

services: contiene los diferentes servicios que se utilizan en el proyecto front. (se conecta al back desarrollado en java framework spring boot).

## install modules
Ejecutar el comando `npm i`, psrs descargar los modulos de angular

## Development server
Ejecutar el comando `npm start`, el cual permitira ejecutar el proyecto en modo de desarrollo `http://localhost:4200/`, se coloco un proxy ya que los servicios se estaban ejecutando en localhost y evitar errores de cors.
Para cambiar la url del back se debe modificar el archivo environments.ts `_url`, con la url de donde se 
encuentra ejecutando el back.
Ejecutar `npm prod` para suprimir el proxy

## Build server
Ejecutar el comando `npm build` para generar los archivos ejecutables (carpeta dist) para subir a servidor

## user server
Existe un un usuario administrador con el cual se inicia sesion para crear los empleados y generar los usuarios
user: DRomero
password:12345

Como administrador se desplegara un menu en el panel izquierdo (Administrador) el cual nos redirigira a la sección donde se mostrara la lista de empleados, la opcion para crea un nuevo empleado y dentro del listado de empleado tenemos la opcion para generar el usuario respectivo.

Como empleado, se desplegara un menu en la seccion izquierda (Empleado) el cual nos redirigira a la sección para actualizar los datos del empleado. Para cerrar sesión se encuentra definido un boton en la parte superior derecha.