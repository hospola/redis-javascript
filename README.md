[![progress-banner](https://backend.codecrafters.io/progress/redis/c3f177ca-b4e8-4660-96fa-eb6fd01300d4)](https://app.codecrafters.io/users/codecrafters-bot?r=2qF)

# Mi propia implementación de Redis

Este proyecto tiene como objetivo construir desde cero un servidor Redis en JavaScript. Sirve como ejercicio de aprendizaje para entender el funcionamiento interno de Redis, incluyendo la gestión de estructuras de datos en memoria, persistencia y protocolo de comunicación.

## Instrucciones de instalación

1. Clona el repositorio:

   ```bash
   git clone <URL-del-repositorio>
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```

## Ejecución

Inicia el servidor Redis con:

```bash
node app/main.js [--dir <ruta> --dbfilename <archivo>]
```

- Opcional: `--dir` y `--dbfilename` permiten especificar directorio y nombre de archivo para persistencia.
- Por defecto el servidor escucha en `127.0.0.1:6379`.

## Uso

Conéctate al servidor con `redis-cli` u otro cliente compatible en el puerto 6379:

```bash
redis-cli -p 6379
```

Ejemplos de comandos:

- PING:
  ```redis
  PING
  # Respuesta: PONG
  ```
- SET y GET:
  ```redis
  SET clave valor
  GET clave
  # Respuesta: valor
  ```
- ECHO:
  ```redis
  ECHO "hola"
  # Respuesta: hola
  ```
- CONFIG GET:
  ```redis
  CONFIG GET dir
  CONFIG GET dbfilename
  ```
