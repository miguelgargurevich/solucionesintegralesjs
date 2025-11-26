PROMPT – Crear Backend Ultra Moderno para Soluciones Integrales JS

Quiero que generes un backend empresarial completo, moderno, modular y seguro para SOLUCIONES INTEGRALES JS S.A.C.

Debe funcionar como API REST y opcionalmente exponer endpoints GraphQL.
Este backend estará conectado al frontend Next.js que ya generaste.

⸻

🧱 STACK TECNOLÓGICO (OBLIGATORIO)
	•	Node.js 20
	•	NestJS 10 (arquitectura modular empresarial)
	•	TypeScript
	•	Prisma ORM
	•	PostgreSQL
	•	Zod para validaciones
	•	JWT + Refresh Tokens
	•	RBAC completo (roles y permisos)
	•	Swagger/OpenAPI 3
	•	Docker + docker-compose
	•	Helmet + Rate limiting
	•	S3 / Supabase Storage para archivos

⸻

🧩 ARQUITECTURA QUE DEBE GENERAR

Quiero una arquitectura modular estilo “empresa mediana”, con carpetas así:

/src
  /modules
    /auth
    /users
    /roles
    /projects
    /services
    /clients
    /contact
    /uploads
    /mail
    /analytics
  /core
    prisma/
    guards/
    interceptors/
    decorators/
    filters/
    common/
  /config
  main.ts
  app.module.ts


  Los módulos deben estar completamente separados, listos para escalar.

⸻

🔐 SEGURIDAD OBLIGATORIA
	1.	JWT + refresh tokens
	2.	RBAC completo:
	•	admin
	•	manager
	•	engineer
	•	viewer
	3.	Rutas protegidas con decoradores tipo:

	@Roles('admin', 'manager')

	4.	Rate limiter inteligente
	5.	Validaciones estrictas con Zod
	6.	Sanitización de inputs
	7.	Helmet para protección por headers

	📦 MODELOS DE BASE DE DATOS – PRISMA (OBLIGATORIO)

Incluye los siguientes modelos:

1️⃣ Users
	•	id
	•	name
	•	email
	•	password
	•	roleId
	•	createdAt
	•	updatedAt

2️⃣ Roles
	•	id
	•	name
	•	permissions (json)
	•	users (relation)

3️⃣ Projects
	•	id
	•	title
	•	description
	•	images (string[])
	•	category (enum: estructuras, piping, obras_civiles, mantenimiento, montajes)
	•	clientId
	•	createdAt
	•	updatedAt

4️⃣ Clients
	•	id
	•	name
	•	logo
	•	description
	•	contactName
	•	contactPhone
	•	contactEmail

5️⃣ Services
	•	id
	•	title
	•	description
	•	icon
	•	category
	•	images (string[])

6️⃣ Contact Messages
	•	id
	•	name
	•	email
	•	phone
	•	message
	•	createdAt

⸻

📨 MÓDULO DE CORREO

Debe permitir:
	•	enviar correos desde formularios de contacto
	•	enviar correos automáticos a la empresa
	•	usar Resend, Nodemailer o SendGrid

⸻

📁 MÓDULO DE UPLOADS

Debe permitir:
	•	subir imágenes (proyectos, clientes)
	•	subida múltiple
	•	validación de MIME
	•	almacenamiento en Supabase Storage o S3
	•	endpoint protegido por rol

⸻

🔎 MÓDULO DE ANALYTICS

Debe guardar:
	•	visitas
	•	páginas vistas
	•	origen del tráfico
	•	navegador
	•	timestamp

Este módulo debe exponer dashboards JSON preparados para conectarse con el frontend.

⸻

📚 DOCUMENTACIÓN SWAGGER

Generar:
	•	Swagger UI accesible en /docs
	•	Seguridad con Bearer token
	•	Todos los módulos documentados

⸻

🧪 TESTS

Debe incluir tests:
	•	unitarios (Jest)
	•	e2e (Supertest)

⸻

🐳 DOCKER

Debe generar:
	•	Dockerfile
	•	docker-compose.yml con:
	•	backend
	•	postgres
	•	pgAdmin
	•	volumes persistentes

⸻

🎯 ENTREGABLES QUE DEBE PRODUCIR GEMINI

Quiero que entregues:
	1.	La estructura completa del proyecto NestJS
	2.	Todos los módulos listos para producción
	3.	Prisma schema completo
	4.	Scripts de migración
	5.	Endpoints REST completos
	6.	Controladores + servicios + repositorios
	7.	Tests base
	8.	Dockerfile + docker-compose
	9.	Instrucciones finales para correr el backend:

	npm install
npx prisma migrate dev
npm run start:dev

El backend debe ser robusto, escalable y listo para llevarlo a producción en Render, Railway, AWS o Azure.

⸻

🚀 FIN DEL PROMPT BACKEND