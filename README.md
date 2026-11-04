# SoftwareLovers — Landing

Plantilla de landing para una empresa de software, hecha con HTML, CSS y JavaScript
vanilla: sin dependencias, sin paso de build y sin peticiones a servicios externos
salvo el envío del formulario.

## Contenido

- `index.html` — estructura semántica, metadatos SEO y formulario de contacto.
- `css/styles.css` — tokens de diseño, tema oscuro y animaciones.
- `js/main.js` — validación del formulario y envío vía Web3Forms.
- `assets/img/` — favicon e ilustraciones SVG de los servicios y del equipo.

## Cómo verla

Abre `index.html` en el navegador o sirve la carpeta:

```bash
python -m http.server 8000
```

## Antes de publicar

- Sustituir la marca «SoftwareLovers» por la definitiva.
- Reemplazar el dominio `https://example.com/` en canonical, Open Graph y JSON-LD.
- Configurar `ACCESS_KEY` de Web3Forms en `js/main.js`.
- Revisar las ilustraciones SVG de `assets/img/` y los enlaces marcados con `TODO`.

## Accesibilidad

- Un solo `h1`, jerarquía de encabezados sin saltos y enlace de salto al contenido.
- Contraste mínimo AA en textos y controles.
- La animación del hero se desactiva con `prefers-reduced-motion`.

## Créditos

- Animación aurora del hero basada en el Pen de
  [htmldesdecero](https://codepen.io/htmldesdecero/pen/pvoOgoY), con licencia MIT.
- Tipografía: stack de fuentes del sistema, sin fuentes externas.
