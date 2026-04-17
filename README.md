# NAHN | Minimalist Developer Portfolio

Một giao diện Portfolio và Blog cá nhân được thiết kế theo phong cách tối giản, sang trọng (Minimalist Editorial Light Theme). 
Dự án được xây dựng dựa trên React, Vite, và TailwindCSS, bao gồm đầy đủ hệ thống Render Markdown cho kho Blog.

---

## Tính năng nổi bật

- 🎨 **Minimalist Design**: Tập trung vào Typography mạnh mẽ, hiệu ứng kính (Glassmorphism), và không gian hiển thị (Whitespace).
- 🌠 **Particle Network**: Hiệu ứng nền 3D tương tác.
- 💻 **Terminal About Me**: Hiệu ứng Terminal dòng lệnh kết hợp ID Card 3D cực kỳ sáng tạo.
- 📝 **Markdown Blog Engine**: Hệ thống đọc và render Blog tự động từ thư mục Local. Hỗ trợ tô màu Code chuẩn Mac OS.

---

## 🛠 Cách Viết Bài Blog Mới (Markdown Guide)

Hệ thống Blog được tự động hóa hoàn toàn. Bạn **không cần viết code React** để thêm bài mới. 

### Bước 1: Tạo file Markdown
Đi tới thư mục `src/posts/`. Tạo một tệp mới có đuôi là `.md`.
*(Ví dụ: `src/posts/huong-dan-giai-toan.md` sẽ tạo ra link `/blog/huong-dan-giai-toan`).*

### Bước 2: Thêm Meta Data (Frontmatter)
Để Web nhận diện được tên bài, tác giả và ngày viết, COPY đoạn khung khai báo sau và DÁN lên trên cùng của file `.md` vừa tạo:

```markdown
---
title: "Nhập Tên Bài Viết Của Bạn Vào Đây"
date: "2026-06-01"
author: "Thanh Nhan"
tags: "Competitive Programming"
summary: "Nói ngắn gọn về nội dung bài viết để nó hiện ở ngoài danh sách..."
---

(Bắt đầu viết bài từ dòng này...)
Bạn cứ dùng `# H1`, `## H2` hoặc tuỳ ý như một file Text bình thường.
```

### Bước 3: Chèn Cửa Sổ Code (Code Block)
Để chèn các đoạn Code C++, Python hay Java. Bạn cứ đặt code vào giữa cặp 3 dấu backticks quen thuộc (kèm tên ngôn ngữ). Hệ thống sẽ tự động vẽ một cái **Khung Cửa Sổ Mac OS** bọc lấy đoạn Code siêu đỉnh!

````markdown
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "NAHN" << endl;
    return 0;
}
```
````

### Bước 4: Deploy (Cập nhật lên Web)
Sau khi viết xong file `.md`, bạn chỉ cần Push Code lên Github. Hệ thống **Gihub Actions** sẽ tự động build lại toàn bộ Web và cập nhật bài viết mới lên cho bạn.

---

## 🚀 Chạy thử ở môi trường Local

Cài đặt Dependency:
```bash
npm install
```

Khởi chạy Server:
```bash
npm run dev
```

Truy cập `http://localhost:5173` để chạy thử Web.
