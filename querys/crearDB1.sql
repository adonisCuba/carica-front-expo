-- Eliminar tablas existentes en orden para evitar errores de referencia
DROP TABLE IF EXISTS cargas CASCADE;
DROP TABLE IF EXISTS formaDePago CASCADE;
DROP TABLE IF EXISTS presentacion CASCADE;
DROP TABLE IF EXISTS material CASCADE;
DROP TABLE IF EXISTS ubicaciones CASCADE;
DROP TABLE IF EXISTS camiones CASCADE;
DROP TABLE IF EXISTS camioneros CASCADE;
DROP TABLE IF EXISTS dadores CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS tipoEquipo CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

SELECT 'Todas las tablas relacionadas han sido eliminadas correctamente.' AS status;
 --Crear tabla Roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE CHECK (nombre IN ('driver', 'loader'))
);

-- Insertar roles
INSERT INTO roles (nombre) VALUES 
('driver'), 
('loader');
 --Crear tabla TipoEquipo
CREATE TABLE tipoEquipo (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);
 --Crear tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    imgURL TEXT,
    tipoUsuario VARCHAR(20) NOT NULL CHECK (tipoUsuario IN ('Camionero', 'Dador')),
    rol_id INT REFERENCES roles(id) -- Relación con la tabla Roles
);
--CREATE TABLE public.roles (
--    id bigint primary key generated always as identity,
--    nombre text NOT NULL UNIQUE CHECK (nombre IN ('driver', 'loader'))
--);
--
---- Insertar roles
--INSERT INTO public.roles (nombre) VALUES 
--('driver'), 
--('loader');
--CREATE TABLE public.usuarios (
--    id bigint primary key generated always as identity,
--    nombre text NOT NULL,
--    apellido text NOT NULL,
--    dni text NOT NULL UNIQUE,
--    email text NOT NULL UNIQUE,
--    contraseña text NOT NULL,
--    telefono text NOT NULL,
--    imgURL text,
--    tipoUsuario text NOT NULL CHECK (tipoUsuario IN ('Camionero', 'Dador')),
--    rol_id bigint REFERENCES public.roles(id) -- Relación con la tabla Roles
--);
--
-- Crear tabla Camioneros
CREATE TABLE camioneros (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Crear tabla Camiones
CREATE TABLE camiones (
    id SERIAL PRIMARY KEY,
    patente VARCHAR(20) NOT NULL UNIQUE,
    camionero_id INT NOT NULL REFERENCES camioneros(id) ON DELETE CASCADE,
    marca VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL,
    tipoEquipo_id INT NOT NULL REFERENCES tipoEquipo(id),
    conductor_nombre VARCHAR(255) NOT NULL
);

-- Crear tabla Dadores
CREATE TABLE dadores (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Crear tabla Ubicaciones
CREATE TABLE ubicaciones (
    id SERIAL PRIMARY KEY,
    direccion VARCHAR(255) NOT NULL,
    numeracion VARCHAR(50),
    provincia VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255) NOT NULL
);

-- Crear tabla Material
CREATE TABLE material (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

-- Crear tabla Presentacion
CREATE TABLE presentacion (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

-- Crear tabla FormaDePago
CREATE TABLE formaDePago (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

-- Crear tabla Cargas
CREATE TABLE cargas (
    id SERIAL PRIMARY KEY,
    dador_id INT NOT NULL REFERENCES dadores(id) ON DELETE CASCADE,
    camionero_id INT REFERENCES camioneros(id) ON DELETE SET NULL,
    peso VARCHAR(50) NOT NULL,
    ubicacionInicial_id INT NOT NULL REFERENCES ubicaciones(id),
    ubicacionFinal_id INT NOT NULL REFERENCES ubicaciones(id),
    telefonoDador VARCHAR(20) NOT NULL,
    puntoReferencia TEXT,
    material_id INT NOT NULL REFERENCES material(id),
    presentacion_id INT NOT NULL REFERENCES presentacion(id),
    valorViaje VARCHAR(50) NOT NULL,
    pagoPor VARCHAR(50) NOT NULL CHECK (pagoPor IN ('PorKm', 'MontoFijo', 'TarifaporKG', 'PorBulto', 'Otros')),
    otroPagoPor TEXT,
    fechaCarga DATE NOT NULL,
    fechaDescarga DATE NOT NULL,
    formaDePago_id INT NOT NULL REFERENCES formaDePago(id)
);

-- Población inicial de datos (Opcional)

-- Roles (ya insertados arriba)

-- TipoEquipo
INSERT INTO tipoEquipo (descripcion) VALUES 
('Tolva'), ('Camioneta'), ('Furgon'), ('Chasis'), ('Acloplado'), ('Carreton'), ('CamionJaula');

-- Material
INSERT INTO material (descripcion) VALUES 
('Soja'), ('Trigo'), ('Maiz'), ('Fertilizante'), ('Maderas'), ('Papa'), ('Mani'), ('Vaca'), ('Cerdo'), ('Otro');

-- Presentacion
INSERT INTO presentacion (descripcion) VALUES 
('Bolsa'), ('Big Bag'), ('Pallet'), ('Granel Bulto'), ('Otros');

-- FormaDePago
INSERT INTO formaDePago (descripcion) VALUES 
('Efectivo'), ('Transferencia'), ('Cheque'), ('E-check'), ('Otros');

-- Confirmar eliminación

