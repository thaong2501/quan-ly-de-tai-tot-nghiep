-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2021 at 11:03 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlydetai`
CREATE DATABASE quanlydetai;
USE quanlydetai;
--

-- --------------------------------------------------------

--
-- Table structure for table `baitap`
--

CREATE TABLE `baitap` (
  `ma_baitap` int(11) NOT NULL,
  `ma_nhom` int(11) NOT NULL,
  `tieude` varchar(256) NOT NULL,
  `noidung` varchar(10000) DEFAULT NULL,
  `ngaydang` datetime DEFAULT current_timestamp(),
  `hannop` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `baitap`
--

INSERT INTO `baitap` (`ma_baitap`, `ma_nhom`, `tieude`, `noidung`, `ngaydang`, `hannop`) VALUES
(1, 1, 'Nộp báo cáo tiến độ tuần 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis vulputate ligula, ac convallis velit luctus et. Proin eleifend ex sem, eget ornare ipsum imperdiet a.', '2021-08-31 10:07:24', '2021-09-01 00:00:00'),
(7, 1, 'Nộp báo cáo tiến độ tuần 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis vulputate ligula, ac convallis velit luctus et. Proin eleifend ex sem, eget ornare ipsum imperdiet a.', '2021-09-01 15:29:26', '2021-09-02 00:00:00'),
(9, 1, 'Nộp BM02', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis vulputate ligula, ac convallis velit luctus et. Proin eleifend ex sem, eget ornare ipsum imperdiet a.', '2021-09-01 16:39:30', '2021-09-04 00:00:00');

--
-- Triggers `baitap`
--
DELIMITER $$
CREATE TRIGGER `tg_after_insert_baitap` AFTER INSERT ON `baitap` FOR EACH ROW INSERT INTO `chitietbaitap`(`ma_baitap`,`ma_sv`) 
SELECT NEW.ma_baitap, ma_sv 
from chitietnhom 
WHERE ma_nhom = NEW.ma_nhom
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_before_delete_baitap` BEFORE DELETE ON `baitap` FOR EACH ROW DELETE FROM chitietbaitap 
WHERE ma_baitap = OLD.ma_baitap
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chitietbaitap`
--

CREATE TABLE `chitietbaitap` (
  `ma_chitietbaitap` int(11) NOT NULL,
  `ma_baitap` int(11) NOT NULL,
  `ma_sv` varchar(12) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `diem` smallint(6) DEFAULT NULL,
  `thoigiannop` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietbaitap`
--

INSERT INTO `chitietbaitap` (`ma_chitietbaitap`, `ma_baitap`, `ma_sv`, `file`, `diem`, `thoigiannop`) VALUES
(1, 1, 'SV2020000123', NULL, NULL, NULL),
(2, 1, 'SV2021200000', NULL, NULL, NULL),
(10, 1, 'SV2018603659', NULL, NULL, NULL),
(22, 7, 'SV2018603659', 'BaoCao.docx', 10, '2021-09-01 16:38:21'),
(23, 7, 'SV2020000123', NULL, NULL, NULL),
(24, 7, 'SV2021200000', NULL, NULL, NULL),
(28, 9, 'SV2018603659', 'BaoCao.docx', NULL, '2021-09-01 17:16:15'),
(29, 9, 'SV2020000123', NULL, NULL, NULL),
(30, 9, 'SV2021200000', NULL, NULL, NULL);

--
-- Triggers `chitietbaitap`
--
DELIMITER $$
CREATE TRIGGER `tg_before_delete_chitietbaitap` BEFORE DELETE ON `chitietbaitap` FOR EACH ROW DELETE FROM ykien
WHERE ma_chitietbaitap = OLD.ma_chitietbaitap
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chitietnhom`
--

CREATE TABLE `chitietnhom` (
  `ma_nhom` int(11) NOT NULL,
  `ma_sv` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chitietnhom`
--

INSERT INTO `chitietnhom` (`ma_nhom`, `ma_sv`) VALUES
(1, 'SV2018603659'),
(1, 'SV2020000123'),
(1, 'SV2021200000');

--
-- Triggers `chitietnhom`
--
DELIMITER $$
CREATE TRIGGER `tg_after_insert_chitietnhom` AFTER INSERT ON `chitietnhom` FOR EACH ROW INSERT INTO `chitietbaitap`(`ma_baitap`,`ma_sv`) 
SELECT ma_baitap, NEW.ma_sv 
from baitap
WHERE ma_nhom = NEW.ma_nhom
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_before_delete_chitietnhom` BEFORE DELETE ON `chitietnhom` FOR EACH ROW DELETE chitietbaitap FROM chitietbaitap
INNER JOIN baitap on baitap.ma_baitap = chitietbaitap.ma_baitap 
WHERE ma_nhom = OLD.ma_nhom and ma_sv = OLD.ma_sv
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `detai`
--

CREATE TABLE `detai` (
  `ma_detai` int(11) NOT NULL,
  `ma_theloai` int(11) NOT NULL,
  `ma_gv` varchar(12) NOT NULL,
  `ma_sv` varchar(12) NOT NULL,
  `tendetai` varchar(100) NOT NULL,
  `mota` varchar(10000) DEFAULT NULL,
  `pheduyet` tinyint(1) NOT NULL DEFAULT 0,
  `hoanthanh` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detai`
--

INSERT INTO `detai` (`ma_detai`, `ma_theloai`, `ma_gv`, `ma_sv`, `tendetai`, `mota`, `pheduyet`, `hoanthanh`) VALUES
(7, 8, 'GV2021080011', 'SV2021200000', 'Xây dựng website tìm kiếm việc làm', NULL, 1, 0),
(8, 6, 'GV2021080012', 'SV2018601856', 'Nâng cao chất lượng phần mềm với test tự động', NULL, 0, 0),
(9, 8, 'GV2021080012', 'SV2018604249', 'Xây dựng hệ thống website Booking Hotel', NULL, 0, 0),
(10, 4, 'GV2021080010', 'SV2020000123', 'Nhận dạng và theo dõi chuyển động của khuông mặt trong video', NULL, 0, 0),
(11, 1, 'GV2021080010', 'SV2021100005', 'Tìm hiểu công nghệ thực tại ảo và ứng dụng', NULL, 0, 0),
(12, 3, 'GV2021080010', 'SV2021100006', 'Tìm hiểu chuẩn mã dữ liệu DES và ứng dụng vào thi tuyển đại học', NULL, 0, 0),
(13, 4, 'GV2021080011', 'SV2021200001', 'Ứng dụng trí tuệ nhân tạo để phát hiện gian lận thi cử', NULL, 1, 0),
(14, 8, 'GV2021080010', 'SV2021200002', 'Xây dựng hệ thống website streaming game', NULL, 1, 0),
(15, 9, 'GV2021080010', 'SV2021100003', 'Xây dựng phần mềm quản lý học sinh trên thiết bị điện thoại thông minh', 'aaaaaaa', 1, 0),
(16, 4, 'GV2021080011', 'SV2021100006', 'Xây dựng phần mềm điểm danh học viên phòng tập sử dụng nhận dạng khuôn mặt', NULL, 1, 0),
(21, 1, 'GV2021080010', 'SV2018603659', 'demo 2', '', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `detaimau`
--

CREATE TABLE `detaimau` (
  `ma_detaimau` int(11) NOT NULL,
  `ma_theloai` int(11) NOT NULL,
  `ma_gv` varchar(12) NOT NULL,
  `tendetai` varchar(100) NOT NULL,
  `mota` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detaimau`
--

INSERT INTO `detaimau` (`ma_detaimau`, `ma_theloai`, `ma_gv`, `tendetai`, `mota`) VALUES
(4, 8, 'GV2021080010', 'Xây dựng website bán hàng sử dụng ngôn ngữ PHP', NULL),
(5, 3, 'GV2021080010', 'Tìm hiểu chuẩn mã dữ liệu DES và ứng dụng vào thi tuyển đại học', NULL),
(8, 4, 'GV2021080010', 'Ứng dụng trí tuệ nhân tạo để phát hiện gian lận thi cử', NULL),
(9, 9, 'GV2021080010', 'Xây dựng phần mềm hỗ trợ quản lý điểm cho khoa CNTT', NULL),
(10, 8, 'GV2021080011', 'Xây dựng Website bán máy tính qua mạng.', NULL),
(11, 1, 'GV2021080011', 'Nghiên cứu và xây dựng ứng dụng iOS Camera với các hiệu ứng', NULL),
(12, 4, 'GV2021080010', 'Nhận dạng và theo dõi chuyển động của khuông mặt trong video', NULL),
(13, 9, 'GV2021080011', 'Xây dựng ứng dụng vận chuyển hàng hóa logistic', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `giaovien`
--

CREATE TABLE `giaovien` (
  `ma_gv` varchar(12) NOT NULL,
  `gioihansinhvien` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `giaovien`
--

INSERT INTO `giaovien` (`ma_gv`, `gioihansinhvien`) VALUES
('GV2021080010', 10),
('GV2021080011', 15),
('GV2021080012', 20);

-- --------------------------------------------------------

--
-- Table structure for table `khoahoc`
--

CREATE TABLE `khoahoc` (
  `ma_khoahoc` int(11) NOT NULL,
  `tenkhoahoc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khoahoc`
--

INSERT INTO `khoahoc` (`ma_khoahoc`, `tenkhoahoc`) VALUES
(1, 'K13'),
(2, 'K14'),
(3, 'K15');

-- --------------------------------------------------------

--
-- Table structure for table `nganh`
--

CREATE TABLE `nganh` (
  `ma_nganh` int(11) NOT NULL,
  `tennganh` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nganh`
--

INSERT INTO `nganh` (`ma_nganh`, `tennganh`) VALUES
(1, 'Công nghệ thông tin'),
(2, 'Kỹ thuật phần mềm'),
(3, 'Khoa học máy tính'),
(4, 'Hệ thống thông tin');

-- --------------------------------------------------------

--
-- Table structure for table `nhom`
--

CREATE TABLE `nhom` (
  `ma_nhom` int(11) NOT NULL,
  `ma_gv` varchar(12) NOT NULL,
  `tennhom` varchar(100) NOT NULL,
  `hoatdong` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nhom`
--

INSERT INTO `nhom` (`ma_nhom`, `ma_gv`, `tennhom`, `hoatdong`) VALUES
(1, 'GV2021080010', 'N01-KTPM01K13', 1),
(2, 'GV2021080011', 'N01-CNTT01K13', 1),
(3, 'GV2021080012', 'N03-KHMT01K13', 1),
(4, 'GV2021080010', 'N02-KTPM01K13', 1),
(5, 'GV2021080011', 'N01-KTPM01K15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sinhvien`
--

CREATE TABLE `sinhvien` (
  `ma_sv` varchar(12) NOT NULL,
  `ma_nganh` int(11) NOT NULL,
  `ma_khoahoc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sinhvien`
--

INSERT INTO `sinhvien` (`ma_sv`, `ma_nganh`, `ma_khoahoc`) VALUES
('SV2018601856', 2, 1),
('SV2018603659', 2, 1),
('SV2018604249', 2, 1),
('SV2020000123', 1, 3),
('SV2021100003', 1, 1),
('SV2021100004', 3, 1),
('SV2021100005', 4, 1),
('SV2021100006', 2, 1),
('SV2021200000', 2, 2),
('SV2021200001', 1, 2),
('SV2021200002', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `ma_taikhoan` varchar(12) NOT NULL,
  `matkhau` varchar(256) NOT NULL,
  `loaitaikhoan` tinyint(4) NOT NULL,
  `hoten` varchar(128) NOT NULL,
  `hoatdong` tinyint(1) DEFAULT 1,
  `ngaysinh` date DEFAULT NULL,
  `anh` varchar(100) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `sdt` varchar(15) DEFAULT NULL,
  `diachi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`ma_taikhoan`, `matkhau`, `loaitaikhoan`, `hoten`, `hoatdong`, `ngaysinh`, `anh`, `email`, `sdt`, `diachi`) VALUES
('AD2021000123', '$2y$10$KD1d9FiZbxVv7HtgcD9ALeRov8PwqCj4xwCi.xGi36RvGLHt9OhGK', 1, 'Admin', 1, '2000-11-18', NULL, 'admin@email.com', '099998888', 'Đại học công nghiệp Hà Nội'),
('GV2021080010', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 2, 'Hoàng Vy Anh', 1, '1990-01-01', 'GV2021080010.png', 'ngan@email.com', '0811112222', 'Bắc Từ Liêm, Hà Nội'),
('GV2021080011', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 2, 'Doãn Hải Giang', 1, '1990-01-02', NULL, 'haigiang@email.com', '0922223333', 'Cầu Giấy, Hà Nội'),
('GV2021080012', '$2y$10$wSGaqAdi4xIaUay/5CwXX.8Sm2ZpnnwU.DAVfx54CxnYTVRLUE8S6', 2, 'Nguyễn Văn An', 1, '2000-01-01', NULL, 'a@email.com', '0123456789', 'Hải Dương'),
('SV2018601856', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 3, 'Hoàng Văn Thắng', 1, '2000-11-18', 'SV2018601856.jpg', 'hoangthang@email.com', '099998888', 'Thường Tín, Hà Nội'),
('SV2018603659', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 3, 'Nguyễn Phương Thảo', 1, '2000-01-25', 'SV2018603659.jpg', 'nguyenthao@email.com', '0123456789', 'Đông Anh, Hà Nội'),
('SV2018604249', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 3, 'An Thị Thanh Thảo', 1, '2000-01-01', 'SV2018604249.png', 'anthao@email.com', '0912345678', 'Hải Dương'),
('SV2020000123', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 3, 'Nguyễn Thị Bình', 1, '2000-02-02', NULL, 'b@email.com', '0987654321', 'Bắc Ninh'),
('SV2021100003', '$2y$10$24P4Mu/9VqsEvPNqrtsBzeVTD9fdqJh2Gk6OQz240G/e2ckfmT2sW', 3, 'Nguyễn Tiến Đạt', 1, '2000-02-17', NULL, 'dat@gmail.com', '0123456789', 'Hà Nội'),
('SV2021100004', '$2y$10$vouPYqlS5FbHDj3u9Tebl.CC2Dvl0/lie3qXWeKI.NTE/bJNi3rUi', 3, 'Phạm Gia Linh', 1, '2000-02-06', NULL, 'linh@gmail.com', '0123482789', 'Hà Nội'),
('SV2021100005', '$2y$10$Yg2VQdVed3SILMaVEqM1.ei8J4NvAcEbEGqxGcCNAgt7bwJ9UAdxm', 3, 'Hoàng Yến Nhi', 1, '2000-11-16', NULL, 'nhi@gmail.com', '0123482789', 'Hải Phòng'),
('SV2021100006', '$2y$10$GXvTwp01ZqOEaC3BhCFvQ.U3sdDIqRql21QxpVGiKc7uWNUujBIKC', 3, 'Vũ Duy Anh', 1, '2000-11-01', NULL, 'danh@gmail.com', '0639482789', 'Thái Bình'),
('SV2021200000', '$2y$10$a36SHIau8hk9aqQuvYwtzuIvmXfkQ/Rxfxiu0vOJMHThT.ARq794S', 3, 'Nguyễn Văn Toàn', 0, '2002-01-01', NULL, 'toan@email.com', '09xxxxxxxx', 'Hà Nội'),
('SV2021200001', '$2y$10$x6el0NP/vHBcW97ko7q1keVRXULgKdl3mHJF1oKf2Y1qI.3OKQXua', 3, 'Nguyễn Bảo Ngân', 1, '2001-06-13', NULL, 'ngan@gmail.com', '0972482789', 'Nam Định'),
('SV2021200002', '$2y$10$0bTP1hcsMtwBpMhlcURqdeTHOHPrfJZfZTAX8fhY/MvqxM/bu.qW.', 3, 'Trần Thu Giang', 1, '2001-06-16', NULL, 'gaing@gmail.com', '0972482274', 'Hà Nội');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `ma_theloai` int(11) NOT NULL,
  `tentheloai` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`ma_theloai`, `tentheloai`) VALUES
(1, 'Khác'),
(2, 'Big data'),
(3, 'An toàn bảo mật thông tin'),
(4, 'Trí tuệ nhân tạo'),
(5, 'Thiết kế game'),
(6, 'Kiểm thử'),
(7, 'Điện toán đám mây'),
(8, 'Website'),
(9, 'Ứng dụng di động/ máy tính');

-- --------------------------------------------------------

--
-- Table structure for table `ykien`
--

CREATE TABLE `ykien` (
  `ma_ykien` int(11) NOT NULL,
  `ma_chitietbaitap` int(11) NOT NULL,
  `ma_taikhoan` varchar(12) NOT NULL,
  `noidung_ykien` varchar(10000) DEFAULT NULL,
  `thoigian_ykien` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ykien`
--

INSERT INTO `ykien` (`ma_ykien`, `ma_chitietbaitap`, `ma_taikhoan`, `noidung_ykien`, `thoigian_ykien`) VALUES
(40, 22, 'SV2018603659', 'qqqqq wwwwww', '2021-09-01 16:38:19'),
(42, 22, 'GV2021080010', 'good', '2021-09-01 16:40:09'),
(43, 28, 'SV2018603659', 'demo', '2021-09-01 17:16:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baitap`
--
ALTER TABLE `baitap`
  ADD PRIMARY KEY (`ma_baitap`),
  ADD KEY `fk_baitap_nhom` (`ma_nhom`);

--
-- Indexes for table `chitietbaitap`
--
ALTER TABLE `chitietbaitap`
  ADD PRIMARY KEY (`ma_chitietbaitap`),
  ADD UNIQUE KEY `ma_baitap` (`ma_baitap`,`ma_sv`),
  ADD KEY `fk_chitietbaitap_baitap` (`ma_baitap`),
  ADD KEY `fk_chitietbaitap_sinhvien` (`ma_sv`);

--
-- Indexes for table `chitietnhom`
--
ALTER TABLE `chitietnhom`
  ADD PRIMARY KEY (`ma_nhom`,`ma_sv`),
  ADD KEY `fk_chitietnhom_sinhvien` (`ma_sv`);

--
-- Indexes for table `detai`
--
ALTER TABLE `detai`
  ADD PRIMARY KEY (`ma_detai`),
  ADD KEY `fk_detai_theloai` (`ma_theloai`),
  ADD KEY `fk_detai_giaovien` (`ma_gv`),
  ADD KEY `fk_detai_sinhvien` (`ma_sv`);

--
-- Indexes for table `detaimau`
--
ALTER TABLE `detaimau`
  ADD PRIMARY KEY (`ma_detaimau`),
  ADD KEY `ma_theloai` (`ma_theloai`),
  ADD KEY `ma_gv` (`ma_gv`);

--
-- Indexes for table `giaovien`
--
ALTER TABLE `giaovien`
  ADD PRIMARY KEY (`ma_gv`);

--
-- Indexes for table `khoahoc`
--
ALTER TABLE `khoahoc`
  ADD PRIMARY KEY (`ma_khoahoc`);

--
-- Indexes for table `nganh`
--
ALTER TABLE `nganh`
  ADD PRIMARY KEY (`ma_nganh`);

--
-- Indexes for table `nhom`
--
ALTER TABLE `nhom`
  ADD PRIMARY KEY (`ma_nhom`),
  ADD KEY `fk_nhom_giaovien` (`ma_gv`);

--
-- Indexes for table `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD PRIMARY KEY (`ma_sv`),
  ADD KEY `fk_sinhvien_nganh` (`ma_nganh`),
  ADD KEY `fk_sinhvien_khoahoc` (`ma_khoahoc`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`ma_taikhoan`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`ma_theloai`);

--
-- Indexes for table `ykien`
--
ALTER TABLE `ykien`
  ADD PRIMARY KEY (`ma_ykien`),
  ADD KEY `fk_ykien_baitap` (`ma_chitietbaitap`),
  ADD KEY `fk_ykien_taikhoan` (`ma_taikhoan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `baitap`
--
ALTER TABLE `baitap`
  MODIFY `ma_baitap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `chitietbaitap`
--
ALTER TABLE `chitietbaitap`
  MODIFY `ma_chitietbaitap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `detai`
--
ALTER TABLE `detai`
  MODIFY `ma_detai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `detaimau`
--
ALTER TABLE `detaimau`
  MODIFY `ma_detaimau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `khoahoc`
--
ALTER TABLE `khoahoc`
  MODIFY `ma_khoahoc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nganh`
--
ALTER TABLE `nganh`
  MODIFY `ma_nganh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `nhom`
--
ALTER TABLE `nhom`
  MODIFY `ma_nhom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `theloai`
--
ALTER TABLE `theloai`
  MODIFY `ma_theloai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `ykien`
--
ALTER TABLE `ykien`
  MODIFY `ma_ykien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `baitap`
--
ALTER TABLE `baitap`
  ADD CONSTRAINT `fk_baitap_nhom` FOREIGN KEY (`ma_nhom`) REFERENCES `nhom` (`ma_nhom`);

--
-- Constraints for table `chitietbaitap`
--
ALTER TABLE `chitietbaitap`
  ADD CONSTRAINT `fk_chitietbaitap_baitap` FOREIGN KEY (`ma_baitap`) REFERENCES `baitap` (`ma_baitap`),
  ADD CONSTRAINT `fk_chitietbaitap_sinhvien` FOREIGN KEY (`ma_sv`) REFERENCES `sinhvien` (`ma_sv`);

--
-- Constraints for table `chitietnhom`
--
ALTER TABLE `chitietnhom`
  ADD CONSTRAINT `fk_chitietnhom_nhom` FOREIGN KEY (`ma_nhom`) REFERENCES `nhom` (`ma_nhom`),
  ADD CONSTRAINT `fk_chitietnhom_sinhvien` FOREIGN KEY (`ma_sv`) REFERENCES `sinhvien` (`ma_sv`);

--
-- Constraints for table `detai`
--
ALTER TABLE `detai`
  ADD CONSTRAINT `fk_detai_giaovien` FOREIGN KEY (`ma_gv`) REFERENCES `giaovien` (`ma_gv`),
  ADD CONSTRAINT `fk_detai_sinhvien` FOREIGN KEY (`ma_sv`) REFERENCES `sinhvien` (`ma_sv`),
  ADD CONSTRAINT `fk_detai_theloai` FOREIGN KEY (`ma_theloai`) REFERENCES `theloai` (`ma_theloai`);

--
-- Constraints for table `detaimau`
--
ALTER TABLE `detaimau`
  ADD CONSTRAINT `detaimau_ibfk_1` FOREIGN KEY (`ma_theloai`) REFERENCES `theloai` (`ma_theloai`),
  ADD CONSTRAINT `detaimau_ibfk_2` FOREIGN KEY (`ma_gv`) REFERENCES `giaovien` (`ma_gv`);

--
-- Constraints for table `giaovien`
--
ALTER TABLE `giaovien`
  ADD CONSTRAINT `fk_giaovien_taikhoan` FOREIGN KEY (`ma_gv`) REFERENCES `taikhoan` (`ma_taikhoan`);

--
-- Constraints for table `nhom`
--
ALTER TABLE `nhom`
  ADD CONSTRAINT `fk_nhom_giaovien` FOREIGN KEY (`ma_gv`) REFERENCES `giaovien` (`ma_gv`);

--
-- Constraints for table `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD CONSTRAINT `fk_sinhvien_khoahoc` FOREIGN KEY (`ma_khoahoc`) REFERENCES `khoahoc` (`ma_khoahoc`),
  ADD CONSTRAINT `fk_sinhvien_nganh` FOREIGN KEY (`ma_nganh`) REFERENCES `nganh` (`ma_nganh`),
  ADD CONSTRAINT `fk_sinhvien_taikhoan` FOREIGN KEY (`ma_sv`) REFERENCES `taikhoan` (`ma_taikhoan`);

--
-- Constraints for table `ykien`
--
ALTER TABLE `ykien`
  ADD CONSTRAINT `fk_ykien_chitietbaitap` FOREIGN KEY (`ma_chitietbaitap`) REFERENCES `chitietbaitap` (`ma_chitietbaitap`),
  ADD CONSTRAINT `fk_ykien_taikhoan` FOREIGN KEY (`ma_taikhoan`) REFERENCES `taikhoan` (`ma_taikhoan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
