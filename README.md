#  Prueba Técnica – Gestión de Productos

Aplicación web fullstack para la gestión de **productos, categorías y proveedores**

---

##  Tecnologías utilizadas

###  Backend

* Node.js
* Express
* Sequelize (ORM)
* PostgreSQL
* Swagger (Documentación API)
* Docker

###  Frontend

* React
* Vite
* Axios

---

##  Funcionalidades

###  Categorías

* Crear categoría
* Listar categorías
* Editar categoría
* Eliminar categoría

### Proveedores

* Crear proveedor
* Listar proveedores
* Editar proveedor
* Eliminar proveedor

###  Productos

* Crear producto
* Listar productos
* Ver detalle
* Editar producto
* Eliminar producto

---

##  Relaciones

* Un **producto** pertenece a una **categoría**
* Un **producto** pertenece a un **proveedor**

---

##  Configuración del proyecto

###  1. Clonar repositorio

```bash
git clone 
cd backend
```

---

###  2. Variables de entorno

Crear archivo `.env` en la raíz del backend:

```env
DB_NAME=productos_db
DB_USER=postgres
DB_PASS=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
PORT=3001
```

---

###  3. Ejecutar base de datos con Docker

```bash
docker-compose up -d
```

---

###  4. Instalar dependencias

```bash
npm install
```

---

###  5. Ejecutar backend

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3001
```

---

###  6. Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  Documentación API (Swagger)

La API cuenta con documentación interactiva:

-> http://localhost:3001/api-docs

Desde ahí puedes:

* Ver todos los endpoints
* Probar peticiones
* Enviar datos directamente

---

## Endpoints principales

### Productos

| Método | Endpoint       |
| ------ | -------------- |
| GET    | /productos     |
| GET    | /productos/:id |
| POST   | /productos     |
| PUT    | /productos/:id |
| DELETE | /productos/:id |

---

### Categorías

| Método | Endpoint        |
| ------ | --------------- |
| GET    | /categorias     |
| POST   | /categorias     |
| PUT    | /categorias/:id |
| DELETE | /categorias/:id |

---

### Proveedores

| Método | Endpoint         |
| ------ | ---------------- |
| GET    | /proveedores     |
| POST   | /proveedores     |
| PUT    | /proveedores/:id |
| DELETE | /proveedores/:id |

---

## Modelo de datos

### Producto

* id
* nombre
* precio
* categoriaId
* proveedorId

### Categoría

* id
* nombre

### Proveedor

* id
* nombre
* contacto

---

## Validaciones

Se implementaron validaciones usando Sequelize:

* Campos obligatorios
* Tipos de datos
* Valores numéricos válidos
* Longitud de texto

---

## Manejo de errores

* 400 → Error de validación
* 404 → Recurso no encontrado
* 500 → Error interno del servidor

Ejemplo:

```json
{
  "errores": ["El nombre es obligatorio"]
}
```

---

## Docker

El proyecto incluye configuración para:

* PostgreSQL
* pgAdmin

Ejecutar:

```bash
docker-compose up -d
```


## Autor

**Mario Acosta**

---



---
