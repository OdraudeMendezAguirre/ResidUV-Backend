-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-07-2022 a las 07:05:29
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `residuv`
--
CREATE DATABASE IF NOT EXISTS `residuv` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `residuv`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE IF NOT EXISTS `alumno` (
  `Matricula` varchar(10) NOT NULL DEFAULT 'Zs',
  `Contrasena` varchar(25) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `ApellidoP` varchar(20) NOT NULL,
  `ApellidoM` varchar(20) NOT NULL,
  `Region` varchar(20) NOT NULL DEFAULT 'Orizaba/Cordoba',
  `Facultad` varchar(50) NOT NULL,
  `ProgramaEducativo` varchar(50) NOT NULL,
  `Semestre` tinyint(2) NOT NULL,
  `PreguntaID` int(11) NOT NULL,
  `Respuesta` varchar(40) NOT NULL,
  PRIMARY KEY (`Matricula`),
  UNIQUE KEY `PreguntaID` (`PreguntaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contribuciones`
--

CREATE TABLE IF NOT EXISTS `contribuciones` (
  `Matricula` varchar(10) NOT NULL,
  `FechaRegistro` date NOT NULL DEFAULT current_timestamp(),
  `ContribucionesID` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `ResiduosID` int(11) NOT NULL,
  PRIMARY KEY (`ContribucionesID`),
  UNIQUE KEY `Matricula` (`Matricula`),
  UNIQUE KEY `ResiduosID` (`ResiduosID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE IF NOT EXISTS `preguntas` (
  `PreguntaID` int(11) NOT NULL,
  `Pregunta` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`PreguntaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `residuos`
--

CREATE TABLE IF NOT EXISTS `residuos` (
  `ResiduosID` int(11) NOT NULL,
  `Tipo` text NOT NULL,
  PRIMARY KEY (`ResiduosID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`PreguntaID`) REFERENCES `preguntas` (`PreguntaID`);

--
-- Filtros para la tabla `contribuciones`
--
ALTER TABLE `contribuciones`
  ADD CONSTRAINT `contribuciones_ibfk_1` FOREIGN KEY (`Matricula`) REFERENCES `alumno` (`Matricula`),
  ADD CONSTRAINT `contribuciones_ibfk_2` FOREIGN KEY (`ResiduosID`) REFERENCES `residuos` (`ResiduosID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
