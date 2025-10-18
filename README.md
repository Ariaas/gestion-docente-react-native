# 📱 Sistema de Gestión Docente - React Native

Aplicación móvil del Sistema de Gestión Docente de la **Universidad Politécnica Territorial de Lara "Andrés Eloy Blanco"** (UPTAEB).

## 🚀 Características

- ✅ Pantalla de login con diseño responsive
- ✅ Dashboard con tarjetas de navegación
- ✅ Navegación entre pantallas con React Navigation
- ✅ Diseño adaptable para móviles y tablets
- ✅ Componentes reutilizables y bien estructurados
- ✅ Compatible con Expo SDK 54

## 📋 Requisitos previos

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- **Expo Go** app en tu dispositivo móvil ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

## 🔧 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/gestion-docente-react-native.git
cd gestion-docente-react-native
```

2. **Instalar las dependencias:**
```bash
npm install --legacy-peer-deps
```

## 🎯 Ejecutar la aplicación

**Iniciar el servidor de desarrollo:**
```bash
npm start
```

**Opciones disponibles:**
- 📱 Escanea el código QR con **Expo Go** para ver en tu dispositivo
- 🤖 Presiona `a` para abrir en emulador Android
- 🍎 Presiona `i` para abrir en simulador iOS
- 🌐 Presiona `w` para abrir en navegador web

## 📁 Estructura del proyecto

```
Gestion-Docente-React-Native/
├── assets/                 # Imágenes y recursos
│   ├── icon.png
│   ├── splash.png
│   └── ...
├── components/             # Componentes reutilizables
│   ├── LoginHeader.js
│   ├── LoginForm.js
│   ├── DashboardHeader.js
│   └── DashboardCard.js
├── screens/                # Pantallas de la aplicación
│   ├── LoginScreen.js      # Pantalla de inicio de sesión
│   └── DashboardScreen.js  # Panel de control
├── App.js                  # Componente principal con navegación
├── app.json                # Configuración de Expo
├── package.json            # Dependencias del proyecto
└── README.md               # Este archivo
```

## 🛠️ Tecnologías utilizadas

- **React Native** 0.81.4
- **Expo** SDK 54
- **React Navigation** 6.x
- **React** 19.1.0

## 📱 Pantallas

### Login
- Diseño moderno con logo de la UPTAEB
- Campos de usuario y contraseña
- Botón de acceso
- Enlace de recuperación de contraseña

### Dashboard
- Header con mensaje de bienvenida
- Grid de tarjetas con módulos:
  - 👨‍🏫 Docentes
  - 🔧 Espacios
  - 👥 Sección
  - 📚 Unidad Curricular
  - 📋 Malla Curricular
  - 📊 Reportes

## ⚠️ Nota importante

Esta versión incluye **únicamente la interfaz visual**. Las funcionalidades de autenticación y conexión con el backend están pendientes de implementación.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del Sistema de Gestión Docente de la UPTAEB.

## 👥 Autores

- **UPTAEB** - Universidad Politécnica Territorial de Lara "Andrés Eloy Blanco"

## 📞 Soporte

Si tienes problemas o preguntas, consulta la [documentación de Expo](https://docs.expo.dev/).
