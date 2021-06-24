-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 24 Haz 2021, 15:00:06
-- Sunucu sürümü: 5.7.34-0ubuntu0.18.04.1
-- PHP Sürümü: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `freedbtech_leongodx`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `freehesap`
--

CREATE TABLE `freehesap` (
  `id` int(11) NOT NULL,
  `mail` text NOT NULL,
  `pass` text NOT NULL,
  `time_ago` text NOT NULL,
  `url` text NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `freehesap`
--

INSERT INTO `freehesap` (`id`, `mail`, `pass`, `time_ago`, `url`, `status`) VALUES
(1, 'test@test.com', '1234', '1624383208878', 'test', 'ok'),
(2, 'test1@gmail.com', '12334', '1624464535047', 'test1', 'ok'),
(3, 'test3@gmail.com', '132435435465476456', '1624464342957', 'test3', 'ok');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `freehesap`
--
ALTER TABLE `freehesap`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `freehesap`
--
ALTER TABLE `freehesap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
