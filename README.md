# MAKE-FILE-CONFIG

Web Config Builder chạy trực tiếp trên GitHub Pages.

## Chức năng

- Import nhiều file.
- Phân tích source cơ bản.
- Nhận diện function.
- Nhận diện variable.
- Convert sang XML.
- Convert sang JSON.
- Convert sang INI.
- Convert sang DAT.
- Convert sang CFG.
- Convert sang CONF.
- RAW output.
- Preview.
- Download.

## Hỗ trợ input

.cpp
.cc
.c
.h
.hpp
.java
.kt
.xml
.json
.ini
.cfg
.conf
.dat
.txt

## Cách chạy GitHub Pages

1. Tạo repository mới trên GitHub.

2. Đặt tên:

MAKE-FILE-CONFIG

3. Upload toàn bộ file và thư mục.

4. Vào:

Settings
→ Pages

5. Chọn:

Deploy from a branch

6. Chọn:

Branch: main
Folder: / (root)

7. Save.

Sau khi GitHub build xong,
website sẽ chạy bằng index.html.

## DAT

DAT hiện tại sử dụng schema riêng:

MFC1

sau đó là payload được encode dạng hexadecimal.

Đây không phải một chuẩn DAT chung.

## Native SO

File .so không thể tạo bằng cách
đổi tên .cpp thành .so.

Muốn tạo .so thật cần compiler/toolchain
native riêng như GCC/Clang hoặc Android NDK.