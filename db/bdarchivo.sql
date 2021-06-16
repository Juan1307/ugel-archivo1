-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2021 a las 01:54:02
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdarchivo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbladmin`
--

CREATE TABLE `tbladmin` (
  `id_admin` int(11) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `ndni` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbladmin`
--

INSERT INTO `tbladmin` (`id_admin`, `usuario`, `ndni`, `password`) VALUES
(1, 'master', '74241735', '$2y$10$db244xtf.OXTmENAVVm43O9EZzZ9qBPn.BhKep/ZW2sufcfRsAiD6'),
(2, 'LHOYOS', '40995221', '$2y$10$TNEAld9En1KvoT/rvEzchOj0PtFUppgkmKKq8KBC8MEcG2kpffKGm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblarchivos`
--

CREATE TABLE `tblarchivos` (
  `id_archivo` int(11) NOT NULL,
  `id_resolucion` int(11) NOT NULL,
  `nombre_ori` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_sys` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tamano` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `url_archivo` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `f_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tblarchivos`
--

INSERT INTO `tblarchivos` (`id_archivo`, `id_resolucion`, `nombre_ori`, `nombre_sys`, `tipo`, `tamano`, `url_archivo`, `f_creacion`) VALUES
(41, 84, 'exportDataThu Oct 08 2020.pdf', 'UQ_84_US5fb43840e0102', '.pdf', '1632', NULL, '2020-11-17 15:53:20'),
(42, 84, 'iagramas_del_uml.pdf', 'UQ_84_US5fb43840e120b', '.pdf', '95216', NULL, '2020-11-17 15:53:20'),
(44, 75, 'jnjsite-com-php-que-es-un-singleton-y-para-que-nos-puede-servir-.pdf', 'UQ_75_US5fbad8dee69d1', '.pdf', '975675', NULL, '2020-11-22 16:32:14'),
(48, 71, 'jnjsite-com-php-que-es-un-singleton-y-para-que-nos-puede-servir-.pdf', 'UQ_71_US5fbad9685c276', '.pdf', '975675', NULL, '2020-11-22 16:34:32'),
(49, 71, 'es-stackoverflow-com-questions-3537-subir-archivos-con-angularjs-en-nginx.pdf', 'UQ_71_US5fbad9685ce0e', '.pdf', '492705', NULL, '2020-11-22 16:34:32'),
(50, 82, 'iagramas_del_uml.pdf', 'UQ_82_US5fbaf6ca5ce50', '.pdf', '95216', NULL, '2020-11-22 18:39:54'),
(60, 93, 'es-vuejs-org-v2-guide-list-html-v-for-con-v-if.pdf', 'UQ_93_IN5fcac8ba3f601', '.pdf', '254770', NULL, '2020-12-04 18:39:38'),
(61, 93, 'iagramas_del_uml.pdf', 'UQ_93_IN5fcac8ba3ffe2', '.pdf', '95216', NULL, '2020-12-04 18:39:38'),
(62, 78, 'jnjsite-com-php-que-es-un-singleton-y-para-que-nos-puede-servir-.pdf', 'UQ_78_IN5fcaca4c219c2', '.pdf', '975675', NULL, '2020-12-04 18:46:20'),
(63, 78, 'stackoverflow-com-questions-67699-how-to-clone-all-remote-branches-in-git.pdf', 'UQ_78_IN5fcaca4c40bbc', '.pdf', '1115183', NULL, '2020-12-04 18:46:20'),
(64, 96, 'iagramas_del_uml.pdf', 'UQ_96_IN5fceac4e98fa7', '.pdf', '95216', NULL, '2020-12-07 17:27:26'),
(65, 98, 'iagramas_del_uml.pdf', 'UQ_98_IN5fcead3232e32', '.pdf', '95216', NULL, '2020-12-07 17:31:14'),
(72, 103, 'jnjsite-com-php-que-es-un-singleton-y-para-que-nos-puede-servir-.pdf', 'UQ_103_IN5fceb0d20823e', '.pdf', '975675', NULL, '2020-12-07 17:46:42'),
(74, 108, 'stackoverflow-com-questions-67699-how-to-clone-all-remote-branches-in-git.pdf', 'UQ_108_US5fceb62ca93ca', '.pdf', '1115183', NULL, '2020-12-07 18:09:32'),
(75, 110, 'jnjsite-com-php-que-es-un-singleton-y-para-que-nos-puede-servir-.pdf', 'UQ_110_US5fceb7a512b3f', '.pdf', '975675', NULL, '2020-12-07 18:15:49'),
(76, 110, 'es-stackoverflow-com-questions-3537-subir-archivos-con-angularjs-en-nginx.pdf', 'UQ_110_US5fceb7a513689', '.pdf', '492705', NULL, '2020-12-07 18:15:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblarea`
--

CREATE TABLE `tblarea` (
  `id_area` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblarea`
--

INSERT INTO `tblarea` (`id_area`, `nombre`) VALUES
(1, 'PERSONAL-PROYECTOS-WAMS'),
(2, 'ADMINISTRACIÃ“N'),
(3, 'PERSONAL-NEXUS'),
(4, 'PROCESO ADMINISTRATIVO'),
(5, 'PERSONAL PROYECTOS-MRR'),
(6, 'PROBANDO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcontrol`
--

CREATE TABLE `tblcontrol` (
  `id_control` int(11) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `nfolios` varchar(5) NOT NULL,
  `f_entrega` date DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblcontrol`
--

INSERT INTO `tblcontrol` (`id_control`, `id_personal`, `id_area`, `nfolios`, `f_entrega`, `estado`) VALUES
(2, 2, 1, '3', '2020-11-05', 0),
(3, 1, 4, '12', '2021-01-04', 1),
(4, 2, 3, '1113', '2020-12-02', 0),
(6, 1, 3, '2', '2021-01-14', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblinstitucion`
--

CREATE TABLE `tblinstitucion` (
  `id_institucion` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nivel` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblinstitucion`
--

INSERT INTO `tblinstitucion` (`id_institucion`, `nombre`, `nivel`) VALUES
(1, 'SANTO TORIBIO ADA #123 12', 'INICIAL'),
(2, 'TEREZA DE GUARNIZ AYABACA 123', 'PRIMARIA'),
(3, 'REGISTRO 3 PRUEVA  ASDASD', 'SECUNDARIA'),
(4, 'ASDASD RES 222', 'SECUNDARIA'),
(5, 'SANTOS DE CAJAMARCA SAN MARCOS', 'PRIMARIA'),
(6, 'POSTEANDO', 'PRIMARIA'),
(7, 'CERCA DE POSTEANDO', 'PRIMARIA'),
(8, 'JUANES #123', 'SECUNDARIA'),
(9, 'IGLESIAS DE SAN VALENTINA', 'PRIMARIA'),
(10, 'SANTO DOMINGO DE RAMOOS #123', 'INICIAL'),
(11, 'PARA VER SI FUNCIONA N /Q1', 'INICIAL'),
(12, 'SADASDASASD', 'SECUNDARIA'),
(13, 'PARA VER SI FUNCIONA ARE', 'SECUNDARIA'),
(14, 'POSTEANDO', 'SECUNDARIA'),
(15, 'REGISTRO 15', 'PRIMARIA'),
(16, 'SAN MARCOS DE CATALUÑA 123#', 'PRIMARIA'),
(17, 'ANGELES DE CELENDIN 123', 'INICIAL'),
(18, 'EL GATO', 'INICIAL'),
(19, 'SAN CRISTOBAL DE RAMUO #123', 'PRIMARIA'),
(20, 'MIGUEL DE CAJAMARCA #123333', 'INICIAL'),
(21, 'EDITANDO LO NUEVO', 'INICIAL'),
(22, 'INSTI PRUEBA TESTER', 'INICIAL'),
(23, 'SECUNDARIA DE RAMON', 'SECUNDARIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmotivo`
--

CREATE TABLE `tblmotivo` (
  `id_motivo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblmotivo`
--

INSERT INTO `tblmotivo` (`id_motivo`, `descripcion`) VALUES
(1, 'CONCEDER LICENCIA CON GOCE DE REMUNERACIONES'),
(2, 'RECONOCER EL PAGO POR TIEMPO DE SERVICIO- CTS'),
(3, 'ENCARGAR FUNCIONES DE DIRECTOR'),
(4, 'RECTIFICAR LA RD N° 3166-2019'),
(5, 'OTORGAR SUBSIDIO POR LUTO Y SEPELIO'),
(6, 'RECONOCER EL PAGO POR SERVICIOS PERSONALES'),
(7, 'CONCEDER LICENCIA SIN GOCE DE REMUNERACIONES'),
(8, 'DESIGNAR FEDATARIOS DE LA UGEL CAJAMARCA'),
(9, 'RECONOCER Y APROBAR DEUDA TOTAL EN ATENCIÃ“N A MANDATO JUDICIAL'),
(10, 'APROBAR CONTRATO'),
(11, 'RECONOCER Y FELICITAR POR HABER CUMPLIDO 25 AÃ‘OS DE SERVICIO'),
(12, 'RECONOCER Y FELICITAR POR HABER CUMPLIDO 30 AÑOS DE SERVICIO'),
(13, 'DECLARAR IMPROCEDENTE AL RECURSO ADMINISTRATIVO DE RECONSIDERACIÃ“N'),
(14, 'RECONOCER EL PAGO EN PLANILLA CONTINUA EN ATENCIÃ“N A MANDATO JUDICIAL'),
(15, 'RECONOCER 02 HORAS ADICIONALES'),
(16, 'DESIGNAR COORDINADORES PEDAGÃ“GICOS Y TUTORIA DE LA IIEE-JEC  IE JESUS DE NAZARET'),
(17, 'CUMPLIR CON LO ORDENADO EN LA RDR NÂ° 1936-2019'),
(18, 'APROBAR EL INCREMENTO DEL 5 POR CIENTO'),
(19, 'PROBANDO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblpersonal`
--

CREATE TABLE `tblpersonal` (
  `id_personal` int(11) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblpersonal`
--

INSERT INTO `tblpersonal` (`id_personal`, `nombres`, `apellidos`) VALUES
(1, 'ASDASD', 'CASTILLOSS'),
(2, 'JUAN DE ALMAGRA', 'SADASD'),
(3, 'CASTREJOÓN VARGAS', 'RAMONES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblresolucion`
--

CREATE TABLE `tblresolucion` (
  `id_resolucion` int(11) NOT NULL,
  `id_motivo` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `nresolucion` varchar(5) NOT NULL,
  `nproyecto` varchar(5) NOT NULL,
  `f_emision` date DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `est_tbl` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblresolucion`
--

INSERT INTO `tblresolucion` (`id_resolucion`, `id_motivo`, `id_area`, `nresolucion`, `nproyecto`, `f_emision`, `estado`, `est_tbl`) VALUES
(2, 1, 1, '4502', '5336', '2019-06-24', 0, 0),
(3, 2, 1, '4508', '0842', '2019-06-24', 1, 0),
(4, 3, 1, '4796', '5682', '2019-07-05', 0, 0),
(5, 6, 2, '4795', '4830', '2019-06-05', 1, 0),
(6, 5, 1, '4794', '0891', '2019-07-05', 1, 0),
(7, 2, 1, '4793', '0644', '2019-07-05', 0, 0),
(8, 5, 1, '4792', '0791', '2019-07-05', 1, 0),
(9, 2, 1, '4791', '0808', '2019-07-05', 1, 0),
(10, 7, 1, '4790', '5467', '2019-07-05', 1, 0),
(11, 8, 1, '4789', '0888', '2019-07-05', 1, 0),
(12, 9, 1, '47882', '0831', '2019-02-05', 1, 0),
(13, 10, 3, '4787', '3674', '2019-07-05', 1, 0),
(14, 10, 3, '4786', '3673', '2019-07-05', 1, 0),
(15, 10, 3, '4785', '3672', '2019-07-05', 1, 0),
(16, 10, 3, '4784', '3671', '2019-07-05', 1, 0),
(17, 10, 3, '4733', '3670', '2019-07-05', 1, 0),
(18, 10, 3, '4782', '3669', '2019-07-05', 1, 0),
(19, 10, 3, '4781', '3668', '2019-07-05', 1, 0),
(20, 10, 3, '4780', '3667', '2019-07-05', 1, 0),
(21, 1, 3, '4779', '3666', '2019-07-05', 1, 0),
(22, 10, 3, '4778', '3665', '2019-07-05', 1, 0),
(23, 10, 3, '47773', '36643', '2019-07-05', 0, 0),
(24, 10, 3, '4776', '3663', '2019-07-05', 1, 0),
(25, 10, 3, '4775', '3662', '2019-07-05', 1, 0),
(26, 10, 3, '4774', '3661', '2019-07-05', 1, 0),
(27, 10, 3, '4797', '3679', '2019-07-05', 1, 0),
(28, 10, 3, '4798', '3677', '2019-07-08', 0, 0),
(29, 11, 1, '4799', '5550', '2019-07-08', 1, 0),
(30, 5, 1, '4800', '0777', '2019-07-08', 1, 0),
(31, 5, 1, '4801', '0781', '2019-07-08', 1, 0),
(32, 12, 1, '4802', '5551', '2019-07-08', 1, 0),
(33, 13, 4, '4804', '4919', '2019-07-08', 0, 0),
(34, 12, 1, '4805', '5549', '2019-07-08', 1, 0),
(35, 12, 1, '4806', '5548', '2019-07-08', 1, 0),
(36, 12, 1, '4807', '5547', '2019-07-08', 1, 0),
(37, 12, 1, '4808', '5544', '2019-07-08', 1, 0),
(38, 11, 1, '4809', '5543', '2019-07-08', 1, 0),
(39, 12, 1, '4810', '5545', '2019-07-08', 1, 0),
(40, 12, 1, '4811', '5546', '2019-07-08', 1, 0),
(41, 14, 1, '4812', '0849', '2019-07-08', 1, 0),
(42, 15, 1, '4813', '0845', '2019-07-08', 1, 0),
(43, 15, 1, '4813', '0845', '2019-07-08', 1, 0),
(44, 14, 1, '4814', '0847', '2019-07-08', 1, 0),
(45, 2, 1, '4815', '0844', '2019-07-08', 1, 0),
(46, 10, 1, '4816', '3678', '2019-07-08', 1, 0),
(47, 10, 1, '4817', '3493', '2019-07-08', 1, 0),
(48, 16, 1, '4803', '0948', '2019-07-08', 1, 0),
(49, 10, 3, '4773', '3658', '2019-07-05', 1, 0),
(50, 10, 3, '4772', '3494', '2019-07-05', 1, 0),
(51, 10, 3, '4771', '3492', '2019-07-05', 1, 0),
(52, 10, 3, '4770', '3491', '2019-07-05', 1, 0),
(53, 10, 3, '4769', '3784', '2019-07-05', 1, 0),
(54, 10, 3, '4768', '3483', '2019-07-05', 1, 0),
(55, 10, 3, '4767', '3482', '2019-07-05', 1, 0),
(56, 6, 1, '4766', '0915', '2019-07-05', 1, 0),
(57, 6, 1, '4765', '0909', '2019-07-05', 1, 0),
(58, 6, 1, '4764', '0855', '2019-07-05', 1, 0),
(59, 6, 1, '4763', '0853', '2019-07-05', 1, 0),
(60, 6, 1, '4762', '0850', '2019-07-05', 1, 0),
(61, 10, 3, '4761', '3657', '2019-07-05', 1, 0),
(62, 10, 3, '4760', '3495', '2019-07-05', 1, 0),
(63, 10, 3, '4759', '3676', '2019-07-05', 1, 0),
(64, 12, 1, '4758', '5541', '2019-07-05', 1, 0),
(65, 11, 1, '4757', '5542', '2019-07-05', 1, 0),
(66, 10, 3, '4756', '3675', '2019-07-05', 1, 0),
(67, 17, 1, '4755', '5540', '2019-07-05', 1, 0),
(68, 12, 1, '4754', '5537', '2019-07-05', 0, 0),
(69, 6, 1, '4753', '0856', '2019-07-05', 1, 0),
(70, 18, 1, '4742', '0954', '2019-07-04', 1, 0),
(71, 10, 3, '4838', '3500', '2019-07-10', 1, 0),
(72, 9, 1, '4837', '0823', '2019-07-10', 0, 0),
(73, 9, 1, '4836', '0823', '2019-07-10', 1, 0),
(74, 5, 1, '4833', '0866', '2019-07-10', 1, 0),
(75, 4, 1, '4834', '0867', '2019-07-10', 0, 0),
(78, 7, 1, '12121', '33333', '2020-08-07', 1, 1),
(82, 5, 2, '11112', '44433', '2020-10-23', 1, 0),
(84, 4, 1, '22222', '23333', '2020-11-25', 1, 0),
(92, 4, 4, '88822', '11012', '2018-03-23', 0, 0),
(93, 3, 3, '12312', '12312', '2019-12-24', 0, 1),
(95, 7, 2, '10111', '10111', '2019-01-01', 1, 1),
(96, 4, 3, '09111', '09111', '2020-02-02', 1, 1),
(97, 10, 2, '08111', '08111', '2020-03-03', 0, 1),
(98, 12, 1, '07111', '07111', '2020-04-04', 1, 1),
(101, 13, 3, '06111', '06111', '2020-12-10', 1, 1),
(102, 15, 3, '05111', '05111', '2018-01-01', 1, 1),
(103, 16, 3, '04111', '04111', '2019-02-01', 1, 1),
(104, 8, 4, '03111', '03111', '2020-12-23', 0, 1),
(105, 17, 4, '02111', '02111', '2020-11-30', 1, 1),
(106, 18, 2, '01111', '01111', '2018-02-02', 1, 1),
(107, 9, 3, '10111', '10111', '2020-02-02', 1, 0),
(108, 10, 2, '09111', '09111', '2020-02-02', 0, 0),
(109, 8, 2, '08111', '08111', '2020-02-01', 1, 0),
(110, 18, 2, '07111', '07111', '2021-01-01', 0, 0),
(111, 2, 2, '06111', '06111', '2019-02-02', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuarios`
--

CREATE TABLE `tblusuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(70) NOT NULL,
  `ndni` varchar(8) DEFAULT NULL,
  `carnet` varchar(15) DEFAULT NULL,
  `contacto` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tblusuarios`
--

INSERT INTO `tblusuarios` (`id_usuario`, `nombres`, `apellidos`, `ndni`, `carnet`, `contacto`) VALUES
(1, 'JUAN ALVARES A', 'CABALLOS AMIGOS', '00011112', '00001232', '123123123'),
(2, 'ELZA DORALIZA', 'VARGAS DE ANILLOS', '12323123', NULL, NULL),
(3, 'PABLO RAUL', 'ALARCON COBEÑAS', '16761201', NULL, NULL),
(4, 'LUIS ANTONIO', 'DANZ SALDAÑA', '45272200', '121312333333', NULL),
(5, 'GINO DAGOBERTO', 'ALBITES BAZANA', '41905777', NULL, NULL),
(6, 'HAYDEE TERESA', 'ALMIRON FLORES', '43097644', NULL, NULL),
(7, 'NORMA CORINA', 'ALVAREZ MENDOZA', '26696519', NULL, NULL),
(8, 'CARMEN ROSA', 'ALVITES LOPEZ DE VARGAS', '45580632', NULL, '123331222'),
(9, 'EVELI BETTY', 'ALZA JAICO', '42215644', NULL, NULL),
(10, 'MIRIAN ROSA', 'ANGULO DE SAENZ', '26672506', NULL, NULL),
(11, 'MIRIAN LILIBETH', 'AREVALO PASCUAL', '43564973', NULL, NULL),
(12, 'NELLY EUGENI', 'AZAÃ‘ERO CARMONA', '44349990', NULL, NULL),
(13, 'MARIA DEL ROSARIO', 'BAZAN DIAZ', '44289800', NULL, NULL),
(14, 'MIRIAM', 'BAZAN MONTOYA', '40956758', NULL, NULL),
(15, 'BERNABE ANTONI', 'BECERRA CABANILLAS', '40827854', NULL, NULL),
(16, 'AZUCENA ELIZABETH', 'BECERRA VASQUEZ', '28073677', NULL, NULL),
(17, 'FANNY MILAGRITOS', 'BRAVO CHAVEZ', '26722861', NULL, NULL),
(18, 'ALEJANDRO', 'BRINGAS CASAS', '26735258', NULL, NULL),
(19, 'MARIA ELIZABETH', 'BRIONES CHAVEZ', '43307051', NULL, NULL),
(20, 'YOLANDA', 'BRIONES VALENCIA', '44003252', NULL, NULL),
(21, 'LILIANA MARILU', 'CABANILLAS GARAMENDI', '45460939', NULL, NULL),
(22, 'JAIME', 'CABANILLAS MEDINA', '42394016', NULL, NULL),
(23, 'DALY GEANNINA', 'CABELLOS MENDOZA', '46941925', NULL, NULL),
(24, 'HUMBERTO', 'CABRERA SALCEDO', '26717497', NULL, NULL),
(25, 'GLADIS EDIN', 'CANTERA RIOS', '26703772', NULL, NULL),
(26, 'NANCY VIOLETA', 'CARRANZA CAMACHO', '42319163', NULL, NULL),
(27, 'SARA', 'CASTREJON VALDEZ', '26731822', NULL, NULL),
(28, 'IRMA IRIS', 'CHOLAN CUSQUISIBAN', '44878884', NULL, NULL),
(29, 'JOE KEN', 'AREVALO VILLAVICENCIO', '26710903', NULL, NULL),
(30, 'FLOR ESTHER', 'CHUNQUE CERQUINA', '41709119', NULL, NULL),
(31, 'DENISSE', 'CHUQUILIN MARQUINA DE TORRES', '41785469', NULL, NULL),
(32, 'HERMAN VITELMO', 'CORREA SANCHEZ', '26717609', NULL, NULL),
(33, 'YOVANA', 'CRUZADO ESPILCO', '42808730', NULL, NULL),
(34, 'LILA JANETH', 'CUSQUISIBAN YOPLA', '46161133', NULL, NULL),
(35, 'MANUEL ALEJANDRO', 'CUSTODIO BENZUNCE', '26703149', NULL, NULL),
(36, 'ELIZABETH DEL ROCIO', 'DE LA CRUZ CHAVEZ', '41103910', NULL, NULL),
(37, 'NANCY MARLENI', 'FERNANDEZ MORI', '26686072', NULL, NULL),
(38, 'ROXANA DEL ROCIO', 'FERNANDEZ RUIZ', '71133207', NULL, NULL),
(39, 'MARIA CONSUELO', 'FLORES MEJIA', '43025057', NULL, NULL),
(40, 'JOSE SMITH', 'FLORES SAAVEDRA', '41785470', NULL, NULL),
(41, 'ALBERTO RICARDO', 'GALVEZ MU', '80626681', NULL, NULL),
(42, 'SEGUNDO AGUSTIN', 'GARCIA MONTOYA', '26704831', NULL, NULL),
(43, 'YESSENIA MARIA', 'GARRAMPIE MENDOZA', '45923295', NULL, NULL),
(44, 'EDGAR ANDRES', 'GONZALO GALLARDO', '26696749', NULL, NULL),
(45, 'FRANCISCO WILFREDO', 'GONZALES GALLARDO', '26688834', NULL, NULL),
(46, 'DARLY', 'GONZALES ROJAS', '40554620', NULL, NULL),
(47, 'ELSA BEATRIZ', 'GRANADOS NOVOA', '26722751', NULL, NULL),
(48, 'NORMA ELIZABETH', 'HERNANDEZ URTEAGA', '40116478', NULL, NULL),
(49, 'LUIS', 'HUACCHA REYES', '41831105', NULL, NULL),
(50, 'PEDRO FLORENTINO', 'HUAMAN ARANDA', '26698870', NULL, NULL),
(51, 'KARINA MARILYN', 'HUARIPATA MENDOZA', '44377722', NULL, NULL),
(52, 'YUDITH', 'HUARIPATA LLANOS', '46071717', NULL, NULL),
(53, 'ROSA ISABEL', 'IZQUIERDO CASTREJON', '40670915', NULL, NULL),
(54, 'MARIA SANTOS', 'JULCA SANCHEZ DE MORERA', '26604041', NULL, NULL),
(55, 'ANA MARIBEL', 'JULCAHUANCA GALVEZ', '45210218', NULL, NULL),
(56, 'MARIA VIOLETA', 'LEON RODRIGUEZ', '26646076', NULL, NULL),
(57, 'WALTER ANIBAL', 'LEON URTEAGA', '26705869', NULL, NULL),
(58, 'FLOR MRGARITA', 'LIMAY SALAZAR', '26714562', NULL, NULL),
(59, 'ROSA', 'LUCANO BUENO', '26644475', NULL, NULL),
(60, 'LILIAM JACQUELINE', 'MALAVER RUITON', '41614501', NULL, NULL),
(61, 'ZOILA ELICIRA', 'MEDINA LOZADA', '27161008', NULL, NULL),
(62, 'NANCY', 'MENDOZA BUGARIN', '44639175', NULL, NULL),
(63, 'ROSA ELENA', 'MENDOZA DE ORRILLO', '27546438', NULL, NULL),
(64, 'JOHANA ELIZABETH', 'MONTENEGRO SALDAÑA', '41236643', NULL, NULL),
(65, 'JESUS IRIS', 'MORI CHAVEZ', '26682734', NULL, NULL),
(66, 'SEGUNDO ERNESTO', 'NAUCA VASQUEZ', '27574909', NULL, NULL),
(67, 'CESAR ELADIO', 'PAICO SANCHEZ', '45215402', NULL, NULL),
(68, 'MARIA ANGELA HORMECINDA', 'ORTIZ ZEGARRA', '26715649', NULL, NULL),
(69, 'ROSA CARMEN', 'PALOMINO QUIROZ', '40241087', NULL, NULL),
(70, 'SONIA ALEJANDRINA', 'PAREDES HERNANDEZ', '19258817', NULL, NULL),
(71, 'PEDRO', 'PISCO GODOY', '43141242', NULL, NULL),
(72, 'DAVID', 'PISCO VEGA', '41173334', NULL, NULL),
(73, 'CORINA', 'PORTILLA DELGADO', '40083389', NULL, NULL),
(74, 'RICHAR HELI A', 'QUIROZ ROMERO', '27993736', NULL, NULL),
(75, 'MARGARITA', 'RAICO AZAÃ‘ERO', '26655810', NULL, NULL),
(76, 'ROSITA', 'RAICO HUARIPATA', '26702461', NULL, NULL),
(77, 'FATIMA', 'RAMOS CORREA', '42202325', NULL, NULL),
(78, 'RUTH NOEMI', 'RAMOS CORREA', '42980864', NULL, NULL),
(79, 'TADEO', 'RODRIGUEZ BRIONES', '44113926', NULL, NULL),
(80, 'SAYDA VERONICA', 'RODRIGUEZ CAMACHO', '40945988', NULL, NULL),
(81, 'EVA MARGOT', 'RODRIGUEZ HUANGAL', '42106842', NULL, NULL),
(82, 'EDITA', 'RODRIGUEZ MACHUCA', '26709584', NULL, NULL),
(83, 'CLARA NINFA', 'SALAZAR GRANDA', '40353066', NULL, NULL),
(84, 'VICENTINA', 'SANCHEZ CONDORIA', '26731490', NULL, NULL),
(85, 'KARINA EDITH', 'SANCHEZ DIAZ', '42190238', NULL, NULL),
(86, 'LUIS ALBERTO', 'SANCHEZ GUTIERREZ', '26722246', NULL, NULL),
(87, 'LIDIA LUZ', 'SANCHEZ MEJIA', '27049648', NULL, NULL),
(88, 'ROSA', 'SAUCEDO CABRERA', '26617987', NULL, NULL),
(89, 'FANNY LUZ', 'SIFUENTES PEREZ', '40751814', NULL, NULL),
(90, 'ORLANDO', 'TACILLA VILLANUEVA', '26729372', NULL, '926479543'),
(91, 'VLADIMIR ALEJANDRO', 'TELLO CHUMACERO', '26718133', NULL, NULL),
(92, 'PASCUALA ELIZABETH', 'TELLO PEREZ', '43176791', NULL, NULL),
(93, 'JAVIER', 'TERRONES CERDAN', '42589304', NULL, NULL),
(94, 'PETER', 'TERRONES GUTIERREZ', '26696250', NULL, NULL),
(95, 'GABRIEL', 'TERRONES VILELA', '26729227', NULL, NULL),
(96, 'IRMA', 'TIRADO CAMPOS', '41353042', NULL, NULL),
(97, 'FERNANDO DAVID', 'TORRES SAENZ', '42993718', NULL, NULL),
(98, 'FLOR LILIANA', 'UCEDA JARA', '26644796', NULL, NULL),
(99, 'RICHARD HOMERO', 'VALERA RODAS', '40028478', NULL, NULL),
(100, 'NELLY', 'VARGAS CABRERA', '80486342', NULL, NULL),
(101, 'PENELOPE DE MILAGROS', 'VARGAS LLANOS', '40355299', NULL, NULL),
(102, 'ERIKA JUDITH', 'VASQUEZ ARELLANO', '44799711', NULL, NULL),
(103, 'NANCY MARIBEL', 'VASQUEZ VILLANUEVA', '26685965', NULL, NULL),
(104, 'FANNY ANITA', 'VELEZMORO TIRADO', '41837945', NULL, NULL),
(105, 'LUZ ELENA', 'VIGO BRICEÃ‘O', '26646394', NULL, NULL),
(106, 'SHIRLEY NOEMI', 'VIGO HUAMAN', '44456502', NULL, NULL),
(107, 'NANCY IRIS', 'VILCHEZ SANCHEZ', '41084178', NULL, NULL),
(108, 'ALAN CARLOS', 'VILLATY PINEDO', '42614176', NULL, NULL),
(109, 'JAQUELIN ROSABEL', 'COJAL CEPEDA', NULL, NULL, NULL),
(110, 'BLANCA ISABEL', 'GUEVARA CHUQUILIN', NULL, NULL, NULL),
(111, 'LUIS ALBERTO', 'COLORADO RAMIREZ', NULL, NULL, NULL),
(112, 'ROCÃO DEL PILAR', 'BANDA LIMAY', NULL, NULL, NULL),
(113, 'JOSE ANCELMO', 'BAZAN VASQUEZ', NULL, NULL, NULL),
(114, 'WILDER', 'ALVARADO GUEVARA', NULL, NULL, NULL),
(115, 'GLORIA', 'MARIN LIMAY', NULL, NULL, NULL),
(116, 'RAUL', 'VASQUEZ TORRES', NULL, NULL, NULL),
(117, 'ROSA', 'CHAFLOQUE VARGAS', NULL, NULL, NULL),
(118, 'JAIRO', 'PEREZ ZAMORA', NULL, NULL, NULL),
(119, 'FLOR MARGARITA', 'TACILLA HUARIPATA', NULL, NULL, NULL),
(120, 'PEDRO HENRY', 'PEREDA QUIROZ', NULL, NULL, NULL),
(121, 'DEISY YOBANA', 'LOBATO QUISPE', NULL, NULL, NULL),
(122, 'SINDIA BEATRIZ', 'TEJADA DE LA CRUZ', NULL, NULL, NULL),
(123, 'MARIA VANESA', 'CASTREJON MALAVER', NULL, NULL, NULL),
(124, 'MARCO RAFAEL', 'CUZCO VASQUEZ', NULL, NULL, NULL),
(125, 'KAREN FIORELA', 'QUIROZ DURAN', NULL, NULL, NULL),
(126, 'KARLA NATALY', 'BRIONES SALDAÃ‘A', NULL, NULL, NULL),
(127, 'JHONY ANDERSON', 'VASQUEZ ARTEAGA', NULL, NULL, NULL),
(128, 'LIZBETH', 'MIRES CAMPOS', NULL, NULL, NULL),
(129, 'DUANY MARCELA', 'MARTOS TEJADA', NULL, NULL, NULL),
(130, 'WALTER OMAR', 'CHANDUCAS CERNA', '42092187', NULL, NULL),
(131, 'JHANET MARISOL', 'BAUTISTA CHAVEZ', '44207878', NULL, NULL),
(132, 'KELLY MEDALY', 'CARRANZA CASTRO', '43703526', NULL, '920825733'),
(133, 'MONICA ELIZABETH', 'CABRERA ALVAREZ', '42195525', NULL, '974812233'),
(134, 'ERICK ALBERTO', 'ROMERO LEZAMA', '45174811', NULL, NULL),
(135, 'MILAGRITOS EMPERATRIZ', 'POSTIJO QUISPE', '70206007', NULL, NULL),
(136, 'JHAMIT YHOBANA', 'MENDOZA BURGARIN', '40450713', NULL, NULL),
(137, 'NORMA PATRICIA', 'MARROQUIN PALACIOS', '26730746', NULL, '979545009'),
(138, 'SEGUNDO JESUS', 'PAJARES YOPLA', '44619598', NULL, NULL),
(139, 'ROGER ARMANDO', 'RIVERA HUERTA', '42642132', NULL, NULL),
(140, 'MILAGROS SANTOS', 'CORONADO NUÃ‘EZ', '40029790', NULL, NULL),
(141, 'CESAR AUGUSTO', 'HUACCHA AQUINO', '42574691', NULL, '931034649'),
(142, 'EVER OSCAR', 'CULQUI BARBA', '43487825', NULL, NULL),
(143, 'VICENTE', 'AZAÃ‘ER CARMONA', NULL, NULL, NULL),
(144, 'VICENTE', 'AZAÃ‘ERO CARMONA', NULL, NULL, NULL),
(145, 'JOSE SANTOS', 'CARRANZA LEON', NULL, NULL, NULL),
(146, 'MARGOT ELIZABETH', 'ALCANTARA MESTANZA', NULL, NULL, NULL),
(147, 'ALAMIRO BENICIO', 'AYAY CORREA', NULL, NULL, NULL),
(148, 'ROLANDO', 'MINCHAN FERNADEZ', NULL, NULL, NULL),
(149, 'MARITTA RUBI', 'VELASQUEZ ROJAS', NULL, NULL, NULL),
(150, 'MARIA ESTHER', 'LOZANO ROJAS DE CACERES', NULL, NULL, NULL),
(151, 'JAIME', 'SALAZAR SALDAÃ‘A', NULL, NULL, NULL),
(152, 'PASUCAL', 'RUMAY ALCANTARA', NULL, NULL, NULL),
(153, 'MARGARITA ELENA', 'CASTILLA FELIX', NULL, NULL, NULL),
(154, 'SARA MARLENE', 'AGUIRRE LEON', NULL, NULL, NULL),
(155, 'PENELOPE', 'SANCHEZ DE MARTOS', NULL, NULL, NULL),
(156, 'NELLO MILDER', 'GUEVARA HERRERA', NULL, NULL, NULL),
(157, 'ENEDINA', 'ABANTO CHAVEZ', NULL, NULL, NULL),
(158, 'NILA ELIZABETH', 'MERCADO RONCAL', NULL, NULL, NULL),
(159, 'CAROL JANET', 'ALVARADO CUBAS', '26684970', NULL, NULL),
(160, 'AMALIA ELIZABETH', 'LOPEZ CHEGNE', '26602113', NULL, NULL),
(161, 'NELLY MANUELA', 'SANCHEZ MARIN', '08922120', '009012222000', NULL),
(162, 'HERMAN ENRIQUE', 'FERNANDEZ JIMENEZ', NULL, NULL, NULL),
(163, 'SONIA LILI', 'TORRES DIAZ', NULL, NULL, NULL),
(164, 'VICTOR', 'DAVILA CUBAS', NULL, NULL, NULL),
(165, 'FRANCISCO JAVIER', 'BOÃ‘ON CHEGNE', NULL, NULL, NULL),
(166, 'PLACIDA MARINA', 'MUÃ‘OZ AMCHUCA', NULL, NULL, NULL),
(167, 'FELIX', 'TELLO VASQUEZ', NULL, NULL, NULL),
(168, 'EDGAR ROBERTO', 'JARA BARRANTES', NULL, NULL, NULL),
(169, 'ROGELIA ERESVITA', 'BECERRA SUAREZ', NULL, NULL, NULL),
(170, 'CARLOS MARTIN', 'CHILON DE LA CRUZ', NULL, NULL, NULL),
(171, 'BIQUI AIDEE', 'PLASENCIA PLASENCIA', NULL, NULL, NULL),
(172, 'SEBASTIAN', 'RAMOS LULAYCO', NULL, NULL, NULL),
(173, 'WILFREDO ENRIQUE', 'MANTILLA TAFUR', NULL, NULL, NULL),
(174, 'JUAN HELMER', 'DIAZ CUBAS', NULL, NULL, NULL),
(175, 'ROSA ESTHER', 'GAMARRA DIAZ', NULL, NULL, NULL),
(176, 'MIGUEL ANGEL', 'RODRIGUEZ CARRION', '99922229', NULL, NULL),
(177, 'MARIA ROSA', 'ARRESTEGUI ALCANTARA', NULL, NULL, NULL),
(178, 'NELSON', 'TORRES LLANOS', NULL, NULL, NULL),
(179, 'DORIS RABEL', 'CERNA PALOMINO', NULL, NULL, NULL),
(180, 'MARLENY HAYDEE', 'BARDALES QUISPE', NULL, NULL, NULL),
(181, 'VILMA DORIS', 'HERAS TERRONES', NULL, NULL, NULL),
(182, 'YSABEL DORIS', 'DIAZ ALCANTARA', NULL, NULL, NULL),
(183, 'IRMA', 'MONTENEGRO QUISPE', '40182014', NULL, NULL),
(184, 'MAGNA DE JESUS', 'PASTOR BECERRA', '40514296', NULL, NULL),
(185, 'GERMAN ELMILO', 'RAMIREZ MALCA', '26612002', NULL, NULL),
(186, 'JUANA FRANCISCA', 'TANTA ESCALANTE', '26695893', NULL, NULL),
(187, 'ANGELICA ANAIS', 'MUÃ‘OZ VILCHEZ', '72546197', NULL, NULL),
(188, 'JEIMER', 'MEJIA FERNANDEZ', NULL, NULL, NULL),
(189, 'CARMEN ISABEL', 'FIGUEROA MESTANZA', NULL, NULL, NULL),
(190, 'JULIO CESAR', 'CASTAÃ‘EDA VASQUEZ', '27928138', NULL, NULL),
(191, 'KATTIA JACKELINI', 'CAMPOS YUPANQUI', '47636294', NULL, '976186258'),
(192, 'ROSA JULIA', 'NUNTON MENDOZA DE SALAZAR', NULL, NULL, NULL),
(193, 'OSCAR GUILLERMO', 'SANCHEZ VILLAR', '42009854', NULL, NULL),
(194, 'FLOR MARIELA', 'ESTELA VILLACORTA', '26714582', NULL, NULL),
(195, 'JHONNY PORFIRIO', 'MENDOZA OCON', '42079984', NULL, NULL),
(196, 'PRESCILA VIOLETA', 'HUAMAN CUEVA', NULL, NULL, NULL),
(197, 'BETTY MARILIS', 'CALDERON GUTIERREZ', NULL, NULL, NULL),
(198, 'ALDO CHARLI', 'MARTOS MACHUCA', '40562138', NULL, NULL),
(199, 'YNES AMPARO', 'SILVA LUNQUI', NULL, NULL, NULL),
(200, 'LUIS ABSALON', 'RODRIGUEZ NINA', NULL, NULL, NULL),
(201, 'JULIO CESAR', 'CASTAÑEDA VASQUEZ', NULL, NULL, NULL),
(202, 'JUAN JOSE', 'VASQUEZ VASQUEZ', NULL, NULL, NULL),
(203, 'CESAR LUIS', 'CHUNQUE QUIROZ', '41642116', NULL, NULL),
(204, 'GLADIS RAQUEL', 'LEON CARDENAS', NULL, NULL, NULL),
(205, 'EDITH MARGOTH', 'BAZAN VARGAS', NULL, NULL, NULL),
(206, 'CARMEN GUZMARA', 'PLASENCIA MORALES', '23111223', NULL, NULL),
(207, 'MONICA MARIBEL VARGAS', 'LEON ABANTO', NULL, NULL, NULL),
(208, 'MONICA MARIBEL', 'LEON OBANDO DE', NULL, NULL, NULL),
(209, 'LIDIA', 'MANTILLA SALAZAR', NULL, NULL, NULL),
(210, 'STRING 1', 'STRING 1', NULL, NULL, NULL),
(212, 'STRING 2', 'STRING 2', NULL, NULL, NULL),
(214, 'STRING 3', 'STRING 3', NULL, '12312312', '123456789'),
(215, 'STRIN CUATRO', 'STRIN CUATRO', '12331232', '19999312', '999999'),
(216, 'STRIN CINCO', 'STRIN CINCO', '12222222', '2231321313', NULL),
(217, 'STRIN SEIS', 'STRIN SEIS', NULL, NULL, NULL),
(218, 'STRIN SIETE', 'STRIN SIETE', '12312312', NULL, NULL),
(219, 'ASD      ASDASD', 'ASDASD', NULL, NULL, NULL),
(220, 'ASDASDASD', 'ASDASDASD', NULL, NULL, NULL),
(221, 'PROBANDO', 'PROBANDO', NULL, NULL, '19999312'),
(222, 'NEL PRRRO', 'AALMOST ME AT', NULL, NULL, '12331231'),
(223, 'ASDASD', 'PROBANDO REGISTRO DE', '11111111', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_detcontrol`
--

CREATE TABLE `tbl_detcontrol` (
  `id_detcontrol` int(11) NOT NULL,
  `id_control` int(11) NOT NULL,
  `id_resolucion` int(11) NOT NULL,
  `f_recepcion` date DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_detcontrol`
--

INSERT INTO `tbl_detcontrol` (`id_detcontrol`, `id_control`, `id_resolucion`, `f_recepcion`, `estado`) VALUES
(2, 2, 82, '2020-12-27', 1),
(3, 3, 109, NULL, 0),
(4, 3, 107, NULL, 0),
(5, 4, 109, '2021-03-11', 1),
(7, 6, 111, '2021-01-07', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_detresolucion`
--

CREATE TABLE `tbl_detresolucion` (
  `id_detresolucion` int(11) NOT NULL,
  `id_resolucion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_institucion` int(11) DEFAULT NULL,
  `f_entrega` date DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_detresolucion`
--

INSERT INTO `tbl_detresolucion` (`id_detresolucion`, `id_resolucion`, `id_usuario`, `id_institucion`, `f_entrega`, `estado`) VALUES
(2, 2, 2, NULL, NULL, 0),
(3, 3, 3, NULL, NULL, 0),
(4, 3, 5, NULL, NULL, 0),
(5, 3, 6, NULL, NULL, 0),
(6, 3, 7, NULL, NULL, 0),
(7, 3, 8, NULL, NULL, 0),
(8, 3, 9, NULL, NULL, 0),
(9, 3, 10, NULL, NULL, 0),
(10, 3, 11, NULL, NULL, 0),
(11, 3, 29, NULL, NULL, 0),
(12, 3, 12, NULL, NULL, 0),
(13, 3, 13, NULL, NULL, 0),
(14, 3, 14, NULL, NULL, 0),
(15, 3, 15, NULL, NULL, 0),
(16, 3, 16, NULL, NULL, 0),
(17, 3, 17, NULL, NULL, 0),
(18, 3, 18, NULL, NULL, 0),
(19, 3, 19, NULL, NULL, 0),
(20, 3, 20, NULL, NULL, 0),
(21, 3, 21, NULL, '2020-01-31', 1),
(22, 3, 22, NULL, NULL, 0),
(23, 3, 23, NULL, NULL, 0),
(24, 3, 24, NULL, NULL, 0),
(25, 3, 25, NULL, NULL, 0),
(26, 3, 26, NULL, NULL, 0),
(27, 3, 27, NULL, NULL, 0),
(28, 3, 28, NULL, NULL, 0),
(29, 3, 30, NULL, NULL, 0),
(31, 3, 31, NULL, NULL, 0),
(32, 3, 32, NULL, NULL, 0),
(33, 3, 33, NULL, NULL, 0),
(34, 3, 34, NULL, NULL, 0),
(35, 3, 35, NULL, NULL, 0),
(36, 3, 4, NULL, NULL, 0),
(37, 3, 36, NULL, NULL, 0),
(38, 3, 37, NULL, NULL, 0),
(39, 3, 38, NULL, NULL, 0),
(40, 3, 39, NULL, NULL, 0),
(41, 3, 40, NULL, NULL, 0),
(42, 3, 41, NULL, NULL, 0),
(43, 3, 42, NULL, NULL, 0),
(44, 3, 43, NULL, NULL, 0),
(45, 3, 45, NULL, NULL, 0),
(46, 3, 46, NULL, NULL, 0),
(47, 3, 47, NULL, NULL, 0),
(48, 3, 48, NULL, NULL, 0),
(49, 3, 49, NULL, NULL, 0),
(50, 3, 50, NULL, NULL, 0),
(51, 3, 51, NULL, NULL, 0),
(52, 3, 52, NULL, NULL, 0),
(53, 3, 53, NULL, NULL, 0),
(54, 3, 54, NULL, NULL, 0),
(55, 3, 56, NULL, NULL, 0),
(56, 3, 55, NULL, NULL, 0),
(57, 3, 57, NULL, NULL, 0),
(58, 3, 58, NULL, NULL, 0),
(59, 3, 59, NULL, NULL, 0),
(60, 3, 60, NULL, NULL, 0),
(61, 3, 61, NULL, NULL, 0),
(62, 3, 62, NULL, NULL, 0),
(63, 3, 63, NULL, NULL, 0),
(64, 3, 64, NULL, NULL, 0),
(65, 3, 65, NULL, NULL, 0),
(66, 4, 109, NULL, NULL, 0),
(67, 5, 110, NULL, NULL, 0),
(68, 5, 111, NULL, NULL, 0),
(69, 5, 112, NULL, NULL, 0),
(70, 5, 113, NULL, NULL, 0),
(71, 5, 114, NULL, NULL, 0),
(72, 5, 115, NULL, NULL, 0),
(73, 6, 116, NULL, NULL, 0),
(74, 7, 117, NULL, NULL, 0),
(75, 8, 118, NULL, NULL, 0),
(76, 9, 119, NULL, NULL, 0),
(77, 10, 120, NULL, NULL, 0),
(78, 11, 121, NULL, NULL, 0),
(79, 11, 122, NULL, NULL, 0),
(80, 11, 123, NULL, NULL, 0),
(81, 11, 124, NULL, NULL, 0),
(82, 11, 125, NULL, NULL, 0),
(83, 11, 126, NULL, NULL, 0),
(84, 11, 127, NULL, NULL, 0),
(85, 11, 128, NULL, NULL, 0),
(86, 12, 129, NULL, NULL, 0),
(87, 13, 130, NULL, NULL, 0),
(88, 14, 131, NULL, NULL, 0),
(89, 15, 132, NULL, '2019-07-10', 1),
(90, 16, 133, NULL, '2019-07-09', 1),
(91, 17, 134, NULL, NULL, 0),
(92, 18, 135, NULL, NULL, 0),
(93, 19, 136, NULL, NULL, 0),
(94, 20, 137, NULL, '2019-07-09', 1),
(95, 21, 138, NULL, NULL, 0),
(96, 22, 90, NULL, '2019-07-10', 1),
(98, 23, 71, NULL, NULL, 0),
(99, 24, 140, NULL, NULL, 0),
(100, 25, 16, NULL, '2019-07-10', 1),
(101, 26, 141, NULL, '2019-07-09', 1),
(102, 27, 139, NULL, NULL, 0),
(103, 28, 142, NULL, NULL, 0),
(104, 29, 144, NULL, NULL, 0),
(105, 30, 145, NULL, NULL, 0),
(106, 31, 146, NULL, NULL, 0),
(107, 32, 147, NULL, NULL, 0),
(108, 33, 148, NULL, NULL, 0),
(109, 34, 149, NULL, NULL, 0),
(110, 35, 150, NULL, NULL, 0),
(111, 36, 151, NULL, NULL, 0),
(112, 37, 152, NULL, NULL, 0),
(113, 38, 152, NULL, NULL, 0),
(114, 39, 153, NULL, NULL, 0),
(115, 40, 154, NULL, NULL, 0),
(116, 41, 155, NULL, NULL, 0),
(117, 42, 156, NULL, NULL, 0),
(118, 43, 156, NULL, NULL, 0),
(119, 44, 157, NULL, NULL, 0),
(120, 45, 158, NULL, NULL, 0),
(121, 46, 159, NULL, NULL, 0),
(122, 47, 160, NULL, NULL, 0),
(123, 48, 161, NULL, NULL, 0),
(124, 48, 162, NULL, NULL, 0),
(125, 48, 163, NULL, NULL, 0),
(126, 48, 164, NULL, NULL, 0),
(127, 48, 165, NULL, NULL, 0),
(128, 48, 166, NULL, NULL, 0),
(129, 48, 167, NULL, NULL, 0),
(130, 48, 168, NULL, NULL, 0),
(131, 48, 169, NULL, NULL, 0),
(132, 48, 170, NULL, NULL, 0),
(133, 48, 171, NULL, NULL, 0),
(134, 48, 172, NULL, NULL, 0),
(135, 48, 173, NULL, NULL, 0),
(136, 48, 174, NULL, NULL, 0),
(137, 48, 175, NULL, NULL, 0),
(138, 48, 176, NULL, NULL, 0),
(139, 48, 177, NULL, NULL, 0),
(140, 48, 178, NULL, NULL, 0),
(141, 48, 179, NULL, NULL, 0),
(142, 48, 180, NULL, NULL, 0),
(143, 48, 181, NULL, NULL, 0),
(144, 48, 182, NULL, NULL, 0),
(145, 49, 183, NULL, NULL, 0),
(146, 50, 184, NULL, NULL, 0),
(147, 51, 185, NULL, NULL, 0),
(148, 52, 186, NULL, NULL, 0),
(149, 53, 187, NULL, '2020-12-07', 1),
(150, 54, 185, NULL, NULL, 0),
(151, 55, 185, NULL, NULL, 0),
(152, 56, 188, NULL, NULL, 0),
(153, 57, 189, NULL, NULL, 0),
(154, 58, 190, NULL, NULL, 0),
(155, 59, 191, NULL, NULL, 0),
(156, 60, 192, NULL, NULL, 0),
(157, 61, 193, NULL, NULL, 0),
(158, 62, 194, NULL, NULL, 0),
(159, 63, 195, NULL, NULL, 0),
(160, 64, 196, NULL, NULL, 0),
(161, 65, 197, NULL, NULL, 0),
(162, 66, 198, NULL, NULL, 0),
(163, 67, 199, NULL, NULL, 0),
(164, 68, 200, NULL, NULL, 0),
(165, 69, 190, NULL, NULL, 0),
(166, 70, 202, NULL, NULL, 0),
(167, 71, 203, NULL, NULL, 0),
(168, 72, 204, NULL, NULL, 0),
(169, 73, 205, NULL, NULL, 0),
(170, 74, 206, NULL, NULL, 0),
(171, 75, 208, NULL, NULL, 0),
(180, 78, 2, 3, '2020-12-06', 1),
(190, 82, 5, NULL, NULL, 0),
(194, 84, 1, NULL, '2020-11-29', 1),
(234, 92, 8, NULL, '2020-12-06', 1),
(235, 92, 7, NULL, NULL, 0),
(236, 92, 6, NULL, NULL, 0),
(237, 92, 15, NULL, '2020-11-29', 1),
(238, 92, 21, NULL, NULL, 0),
(239, 92, 22, NULL, NULL, 0),
(240, 92, 23, NULL, NULL, 0),
(241, 92, 24, NULL, NULL, 0),
(242, 92, 88, NULL, NULL, 0),
(243, 92, 100, NULL, NULL, 0),
(244, 92, 173, NULL, '2020-11-29', 1),
(245, 92, 174, NULL, NULL, 0),
(246, 92, 175, NULL, NULL, 0),
(247, 92, 176, NULL, NULL, 0),
(248, 92, 177, NULL, NULL, 0),
(249, 92, 145, NULL, NULL, 0),
(250, 92, 146, NULL, NULL, 0),
(251, 92, 147, NULL, NULL, 0),
(252, 92, 148, NULL, NULL, 0),
(253, 92, 45, NULL, NULL, 0),
(254, 92, 46, NULL, '2020-12-08', 1),
(255, 92, 47, NULL, NULL, 0),
(256, 92, 44, NULL, NULL, 0),
(257, 92, 65, NULL, NULL, 0),
(259, 92, 67, NULL, '2020-11-29', 1),
(261, 75, 1, NULL, NULL, 0),
(263, 75, 2, NULL, NULL, 0),
(266, 84, 2, NULL, NULL, 0),
(267, 93, NULL, 18, NULL, 0),
(268, 93, NULL, 14, '2020-12-07', 1),
(269, 93, NULL, 16, NULL, 0),
(271, 93, NULL, 9, NULL, 0),
(272, 78, NULL, 18, NULL, 0),
(273, 78, 3, 17, '2020-12-10', 1),
(274, 78, NULL, 10, NULL, 0),
(275, 95, NULL, 16, NULL, 0),
(276, 96, NULL, 1, NULL, 0),
(277, 96, NULL, 10, NULL, 0),
(278, 96, NULL, 21, NULL, 0),
(279, 97, NULL, 22, NULL, 0),
(280, 97, NULL, 19, NULL, 0),
(281, 98, NULL, 20, NULL, 0),
(286, 101, NULL, 20, NULL, 0),
(287, 101, NULL, 18, NULL, 0),
(288, 101, NULL, 22, NULL, 0),
(289, 102, NULL, 4, NULL, 0),
(290, 102, NULL, 21, NULL, 0),
(291, 103, NULL, 14, NULL, 0),
(292, 103, NULL, 13, NULL, 0),
(293, 103, NULL, 15, NULL, 0),
(294, 103, NULL, 16, NULL, 0),
(295, 103, 133, 17, '2020-12-07', 1),
(296, 103, NULL, 22, NULL, 0),
(297, 103, NULL, 21, NULL, 0),
(298, 103, NULL, 20, NULL, 0),
(299, 103, NULL, 19, NULL, 0),
(300, 103, 63, 7, '2020-03-07', 1),
(302, 103, NULL, 5, NULL, 0),
(304, 104, NULL, 11, NULL, 0),
(305, 104, NULL, 10, NULL, 0),
(306, 105, NULL, 10, NULL, 0),
(307, 105, NULL, 1, NULL, 0),
(308, 105, NULL, 3, NULL, 0),
(309, 106, NULL, 8, NULL, 0),
(310, 103, 55, 3, '2019-12-31', 1),
(311, 106, NULL, 20, NULL, 0),
(312, 107, 21, NULL, NULL, 0),
(313, 107, 223, NULL, NULL, 0),
(314, 108, 4, NULL, NULL, 0),
(315, 108, 24, NULL, NULL, 0),
(316, 109, 64, NULL, NULL, 0),
(318, 110, 64, NULL, NULL, 0),
(319, 110, 3, NULL, NULL, 0),
(320, 110, 22, NULL, NULL, 0),
(322, 111, 1, NULL, '2018-12-07', 1),
(323, 109, 4, NULL, NULL, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbladmin`
--
ALTER TABLE `tbladmin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `tblarchivos`
--
ALTER TABLE `tblarchivos`
  ADD PRIMARY KEY (`id_archivo`),
  ADD KEY `fk_archivo_resolucion` (`id_resolucion`);

--
-- Indices de la tabla `tblarea`
--
ALTER TABLE `tblarea`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `tblcontrol`
--
ALTER TABLE `tblcontrol`
  ADD PRIMARY KEY (`id_control`),
  ADD KEY `fk_control_personal_idx` (`id_personal`),
  ADD KEY `fk_control_area_idx` (`id_area`);

--
-- Indices de la tabla `tblinstitucion`
--
ALTER TABLE `tblinstitucion`
  ADD PRIMARY KEY (`id_institucion`);

--
-- Indices de la tabla `tblmotivo`
--
ALTER TABLE `tblmotivo`
  ADD PRIMARY KEY (`id_motivo`);

--
-- Indices de la tabla `tblpersonal`
--
ALTER TABLE `tblpersonal`
  ADD PRIMARY KEY (`id_personal`);

--
-- Indices de la tabla `tblresolucion`
--
ALTER TABLE `tblresolucion`
  ADD PRIMARY KEY (`id_resolucion`),
  ADD KEY `fk_resolucion_motivo_idx` (`id_motivo`),
  ADD KEY `fk_resolucion_areap_idx` (`id_area`);

--
-- Indices de la tabla `tblusuarios`
--
ALTER TABLE `tblusuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `tbl_detcontrol`
--
ALTER TABLE `tbl_detcontrol`
  ADD PRIMARY KEY (`id_detcontrol`),
  ADD KEY `fk_detcontrol_resolucion_idx` (`id_resolucion`),
  ADD KEY `fk_detcontrol_control_idx` (`id_control`);

--
-- Indices de la tabla `tbl_detresolucion`
--
ALTER TABLE `tbl_detresolucion`
  ADD PRIMARY KEY (`id_detresolucion`),
  ADD KEY `fk_detresolucion_usuarios_idx` (`id_usuario`),
  ADD KEY `fk_detresolucion_resolucion_idx` (`id_resolucion`),
  ADD KEY `id_institucion` (`id_institucion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbladmin`
--
ALTER TABLE `tbladmin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tblarchivos`
--
ALTER TABLE `tblarchivos`
  MODIFY `id_archivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `tblarea`
--
ALTER TABLE `tblarea`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tblcontrol`
--
ALTER TABLE `tblcontrol`
  MODIFY `id_control` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tblinstitucion`
--
ALTER TABLE `tblinstitucion`
  MODIFY `id_institucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `tblmotivo`
--
ALTER TABLE `tblmotivo`
  MODIFY `id_motivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tblpersonal`
--
ALTER TABLE `tblpersonal`
  MODIFY `id_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tblresolucion`
--
ALTER TABLE `tblresolucion`
  MODIFY `id_resolucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de la tabla `tblusuarios`
--
ALTER TABLE `tblusuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;

--
-- AUTO_INCREMENT de la tabla `tbl_detcontrol`
--
ALTER TABLE `tbl_detcontrol`
  MODIFY `id_detcontrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_detresolucion`
--
ALTER TABLE `tbl_detresolucion`
  MODIFY `id_detresolucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tblarchivos`
--
ALTER TABLE `tblarchivos`
  ADD CONSTRAINT `fk_archivo_resolucion` FOREIGN KEY (`id_resolucion`) REFERENCES `tblresolucion` (`id_resolucion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tblcontrol`
--
ALTER TABLE `tblcontrol`
  ADD CONSTRAINT `fk_control_area` FOREIGN KEY (`id_area`) REFERENCES `tblarea` (`id_area`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_control_personal` FOREIGN KEY (`id_personal`) REFERENCES `tblpersonal` (`id_personal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tblresolucion`
--
ALTER TABLE `tblresolucion`
  ADD CONSTRAINT `fk_resolucion_areap` FOREIGN KEY (`id_area`) REFERENCES `tblarea` (`id_area`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_resolucion_motivo` FOREIGN KEY (`id_motivo`) REFERENCES `tblmotivo` (`id_motivo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_detcontrol`
--
ALTER TABLE `tbl_detcontrol`
  ADD CONSTRAINT `fk_detcontrol_control` FOREIGN KEY (`id_control`) REFERENCES `tblcontrol` (`id_control`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detcontrol_resolucion` FOREIGN KEY (`id_resolucion`) REFERENCES `tblresolucion` (`id_resolucion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_detresolucion`
--
ALTER TABLE `tbl_detresolucion`
  ADD CONSTRAINT `fk_detresolucion_resolucion` FOREIGN KEY (`id_resolucion`) REFERENCES `tblresolucion` (`id_resolucion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detresolucion_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tbl_detresolucion_institucion` FOREIGN KEY (`id_institucion`) REFERENCES `tblinstitucion` (`id_institucion`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
