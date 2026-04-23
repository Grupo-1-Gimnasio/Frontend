# Cambios Realizados por Archivo

## `src/pages/public/HomePage.jsx`

- Se añadió `useState` para guardar las actividades destacadas.
- Se añadió `useEffect` para llamar a `getActivities()` al montar la página.
- Se maneja la respuesta de la API con validación `Array.isArray(data)` para evitar errores si el backend devuelve algo distinto a un array.
- Se añadió manejo básico de error con `catch` para dejar la lista vacía si la petición falla.
- Se pasó el estado `featuredActivities` a `FeaturedActivitiesSection`.

## `src/components/home/FeaturedActivitiesSection.jsx`

- Se añadió un valor por defecto en las props: `featuredActivities = []`.
- Se evitó llamar `.map()` sobre un valor `undefined`.
- Se añadió un bloque visible cuando no hay actividades para mostrar.
- Se hizo más robusta la lectura de campos del JSON:
  - `weekDay` o `week_day`
  - `startHour` o `start_hour`
  - `endHour` o `end_hour`
- Se construye el horario final con el formato `Día HH:MM - HH:MM`.

## `src/services/activitiesService.js`

- Se simplificó la función `getActivities()`.
- Se eliminó el `try/catch` redundante.
- La función ahora hace la petición con `axios.get(API_URL)` y devuelve directamente `response.data`.

## `src/data/homeContent.js`

- Se eliminaron imports de imágenes que no se estaban usando.
- Esto limpia el archivo y elimina errores de lint por variables declaradas pero no utilizadas.

## Resultado

- La sección de actividades deja de romperse si la API responde de forma inesperada.
- La home ya puede mostrar las actividades reales del backend.
- El código quedó más estable y más fácil de mantener.

