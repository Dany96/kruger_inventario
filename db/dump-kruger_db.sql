--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2022-04-03 22:36:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 208 (class 1259 OID 16904)
-- Name: catalog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.catalog (
    id integer NOT NULL,
    nombre character varying,
    descripcion jsonb
);


ALTER TABLE public.catalog OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16902)
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.catalog_id_seq OWNER TO postgres;

--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 207
-- Name: catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.catalog_id_seq OWNED BY public.catalog.id;


--
-- TOC entry 201 (class 1259 OID 16466)
-- Name: employe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employe (
    id integer NOT NULL,
    cedula character varying NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    correo character varying(200) NOT NULL,
    fecha_nac timestamp without time zone,
    direccion character varying(250),
    telefono character varying,
    estado_vac integer,
    tipo_vac integer,
    fecha_vac timestamp without time zone,
    num_dosis integer,
    estado smallint DEFAULT 1 NOT NULL
);


ALTER TABLE public.employe OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16464)
-- Name: employe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employe_id_seq OWNER TO postgres;

--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 200
-- Name: employe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employe_id_seq OWNED BY public.employe.id;


--
-- TOC entry 205 (class 1259 OID 16493)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(100) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16491)
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_id_seq OWNER TO postgres;

--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 204
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.role.id;


--
-- TOC entry 203 (class 1259 OID 16485)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    id_employe smallint NOT NULL,
    id_rol smallint NOT NULL,
    usuario character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    fecha_creacion timestamp without time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16483)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 206 (class 1259 OID 16646)
-- Name: usr_role; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.usr_role AS
 SELECT u.id,
    u.id_employe,
    u.usuario,
    r.nombre AS rol,
    u.password
   FROM public."user" u,
    public.role r
  WHERE (u.id_rol = r.id);


ALTER TABLE public.usr_role OWNER TO postgres;

--
-- TOC entry 2878 (class 2604 OID 16907)
-- Name: catalog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catalog ALTER COLUMN id SET DEFAULT nextval('public.catalog_id_seq'::regclass);


--
-- TOC entry 2874 (class 2604 OID 16469)
-- Name: employe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe ALTER COLUMN id SET DEFAULT nextval('public.employe_id_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 16496)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- TOC entry 2876 (class 2604 OID 16488)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3023 (class 0 OID 16904)
-- Dependencies: 208
-- Data for Name: catalog; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.catalog VALUES (1, 'estadoVacunacion', '{"estadoVac": [{"id": 1, "value": "Vacunado"}, {"id": 2, "value": "No Vacunado"}]}');
INSERT INTO public.catalog VALUES (2, 'tipoVacunacion', '{"tipoVac": [{"id": 1, "value": "Sputnik"}, {"id": 2, "value": "AstraZeneca"}, {"id": 3, "value": "Pfizer"}, {"id": 4, "value": "Jhonson&Jhonson"}]}');


--
-- TOC entry 3017 (class 0 OID 16466)
-- Dependencies: 201
-- Data for Name: employe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employe VALUES (1, '0940526536', 'Daniel Bryan', 'Romero Franco', 'danielbry96@hotmail.com', '1996-05-30 00:00:00', 'Quitumbe, Amaruñam s33', '0999606969', 1, 1, '2022-02-01 00:00:00', 3, 1);


--
-- TOC entry 3021 (class 0 OID 16493)
-- Dependencies: 205
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role VALUES (1, 'Administrador', 'Rol con todos los permisos ');
INSERT INTO public.role VALUES (2, 'Empleado', 'Rol con permiso a actualizar sus datos');


--
-- TOC entry 3019 (class 0 OID 16485)
-- Dependencies: 203
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (1, 1, 1, 'DRomero', '827ccb0eea8a706c4c34a16891f84e7b', '2022-03-30 00:00:00');


--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 207
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.catalog_id_seq', 2, true);


--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 200
-- Name: employe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employe_id_seq', 6, true);


--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 204
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_seq', 2, true);


--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


--
-- TOC entry 2880 (class 2606 OID 16474)
-- Name: employe pk_employe; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employe
    ADD CONSTRAINT pk_employe PRIMARY KEY (id);


--
-- TOC entry 2884 (class 2606 OID 16498)
-- Name: role pk_rol; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT pk_rol PRIMARY KEY (id);


--
-- TOC entry 2882 (class 2606 OID 16490)
-- Name: user pk_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT pk_user PRIMARY KEY (id);


-- Completed on 2022-04-03 22:36:10

--
-- PostgreSQL database dump complete
--

