🟦 Guía paso a paso para abrir la app GameShelf desde cero en un móvil
✅ Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

    XAMPP para crear y gestionar tu base de datos local.

    Visual Studio Code para desarrollar y lanzar tu app.

    Node.js ya instalado (incluye npm).

    La app Expo Go en tu móvil.

    Tu proyecto GameShelf ya descargado y configurado.

    El móvil y el PC deben estar conectados a la misma red Wi-Fi.

🛠️ PASOS COMPLETOS PARA ABRIR LA APP
🔶 Paso 1: Abrir XAMPP

    Abre el programa XAMPP Control Panel.

    Haz clic en Start en los módulos de:

        Apache

        MySQL

    Asegúrate de que los botones se ponen en verde, indicando que están activos.

🔷 Paso 2: Abrir phpMyAdmin

    Abre tu navegador (Chrome, Firefox…).

    Escribe en la barra de direcciones:

    http://localhost/phpmyadmin

    Se abrirá phpMyAdmin.

    Verifica que la base de datos de GameShelf esté creada (por ejemplo, una tabla con juegos).

        Puedes ver, añadir o modificar registros desde aquí manualmente si lo necesitas.

🟢 Paso 3: Abrir Visual Studio Code

    Abre Visual Studio Code.

    Abre la carpeta donde está tu proyecto GameShelf (Archivo > Abrir carpeta...).

    Asegúrate de que el proyecto carga correctamente.

💻 Paso 4: Iniciar el servidor Expo

    En Visual Studio Code, abre una terminal integrada:

        Ve a Terminal > Nuevo terminal.

    Escribe el siguiente comando:

    npm start

    Se abrirá una ventana en tu navegador llamada Expo Developer Tools.

    Verás un código QR en pantalla.

📱 Paso 5: Abrir la app en el móvil con Expo Go

    Abre la app Expo Go en tu móvil.

        Si no la tienes: búscala y descárgala desde Google Play (Android) o App Store (iOS).

    Pulsa en "Scan QR Code".

    Escanea el código QR que aparece en tu navegador (Expo Developer Tools).

    Espera unos segundos… ¡y la app GameShelf se abrirá en tu móvil!

⚠️ Problemas comunes y soluciones
Problema	Solución
El móvil no detecta la app	Asegúrate de estar conectado a la misma red Wi-Fi.
El código QR no funciona	En Expo Developer Tools, cambia de LAN a Tunnel.
No carga la base de datos	Asegúrate de haber iniciado XAMPP y que la tabla está creada correctamente.
📝 Consejos extra

    Puedes añadir juegos a mano desde phpMyAdmin (pestaña "Insertar" en tu tabla).

    Para que la app muestre los datos correctamente, asegúrate de que está haciendo la llamada a http://localhost/... desde la IP de tu PC si usas un móvil real. Ejemplo:

        http://192.168.1.50/api/juegos.php
