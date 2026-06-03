# 🌹 Álvaro & Gabriela — Nuestro Viaje

Un homenaje visual e interactivo a los viajes compartidos.

---

## 📂 Estructura del proyecto

```
nuestro-viaje/
├── index.html               ← Página principal
├── css/
│   └── style.css            ← Todos los estilos (románticos, responsivos)
├── js/
│   ├── countries.js         ← ✏️ AQUÍ configuras países y fotos
│   └── app.js               ← Lógica: tabs, galería, lightbox, animaciones
└── fotos/
    ├── espana/              ← Tus fotos de España
    ├── italia/
    ├── francia/
    ├── hungria/
    ├── austria/
    ├── albania/
    ├── irlanda/
    ├── alemania/
    ├── eslovaquia/
    ├── republica-checa/
    ├── estonia/
    └── finlandia/
```

---

## 🚀 Cómo usar

### Paso 1 — Añade tus fotos

1. Copia tus imágenes a la carpeta del país correspondiente.
   Por ejemplo: `fotos/espana/playa.jpg`

2. Abre `js/countries.js` y añade los nombres al array `images`:

```js
{
  id: "espana",
  // ...
  images: ["playa.jpg", "museo.jpg", "noche.jpg"]
}
```

### Paso 2 — Lanza un servidor local

**Opción A — Python (recomendado, sin instalar nada extra):**
```bash
# Desde la carpeta del proyecto:
python3 -m http.server 8080
# Abre: http://localhost:8080
```

**Opción B — Node.js:**
```bash
npx serve .
```

**Opción C — VS Code:**
Instala la extensión *Live Server* y pulsa "Go Live".

> ⚠️ No abras `index.html` directamente como archivo (`file://`).
> Las imágenes solo cargan correctamente desde un servidor local.

---

## 🎨 Personalización

### Cambiar el texto de un país

En `js/countries.js`, edita los campos de cada país:

```js
{
  name:        "España",
  tagline:     "Donde todo empezó",      // subtítulo bajo el nombre
  quote:       "El hogar siempre huele a ti.",  // frase romántica
  accentColor: "#b03030",               // color del acento (título, borde)
  bgTone:      "#fff9f5",               // color de fondo suave del panel
}
```

### Añadir un país nuevo

1. Crea la carpeta: `fotos/nombre-pais/`
2. Añade un objeto nuevo al array `COUNTRIES` en `countries.js`
3. ¡Automáticamente aparece como pestaña!

---

## 📱 Responsivo

| Pantalla      | Comportamiento                        |
|---------------|---------------------------------------|
| Escritorio    | Pestañas horizontales, galería 4 col  |
| Tablet        | Pestañas horizontales, galería 3 col  |
| Móvil         | Menú hamburguesa, galería 2 col       |

---

## ✨ Características

- **Portada animada** con pétalos cayendo y tipografía script
- **12 pestañas independientes**, una por país
- **Galería masonry** con animación de entrada escalonada
- **Lightbox** con navegación por teclado, botones y swipe táctil
- **Transición suave** de color de fondo al cambiar de país
- **100% vanilla HTML/CSS/JS** — sin dependencias externas

---

*Hecho con ♡ por Álvaro para Gabriela*
