---
title: "Lời giải Đề thi HSG Quốc Gia 2026 - Môn Tin Học"
date: "2026-04-17"
author: "Thanh Nhan"
tags: "Algorithms, VOI"
summary: "Tổng hợp lời giải các bài toán trong đề thi HSG Quốc Gia 2026 - Môn Tin Học"
---

Đề ngày 1: [Day 1](https://oj.vnoi.info/contest/voi26_day1)

Đề ngày 2: [Day 2](https://oj.vnoi.info/contest/voi26_day2)

# Bài 1: Dãy đèn 
- Tag: BFS 

## Tóm tắt
Có $N (N \le 666)$ bóng đèn và mỗi bóng đèn có $3$ trạng thái (Tắt, Vàng, Đỏ). Mỗi thao tác sẽ có $2$ loại là:
- Theo chiều kim đồng hồ: tắt -> vàng -> đỏ -> tắt
- Ngược chiều kim đồng hồ: tắt -> đỏ -> vàng -> tắt

Trong mỗi thao tác sẽ chọn $X$ bóng đèn để tác động theo chiều kim đồng hồ và $Y$ bóng đèn theo chiều ngược kim đồng hồ $(X + Y \le 5)$.

Có $Q$ truy vấn, mỗi truy vấn cho biết $L, R$, yêu cầu đếm số thao tác tối thiểu để đưa các bóng đèn trong đoạn $[L, R]$ về trạng thái tắt.


## Lời giải
### Subtask 1, 2, 3: $Q \le 5$

Ta cần nhận ra rằng với một đoạn liên tiếp từ $L$ đến $R$, điều quan trọng không phải là trạng thái của từng bóng ở từng vị trí, mà chỉ là **có bao nhiêu bóng đang tắt, bao nhiêu bóng đang vàng, bao nhiêu bóng đang đỏ**.

Thật vậy, nếu gọi:
- $vang$: số bóng vàng
- $do$: số bóng đỏ
- $tat$: số bóng tắt

thì luôn có: $vang + do + tat = R - L + 1$

nên khi đã biết $vang$ và $do$ thì ta cũng suy ra được ngay $tat$. Vì thế, mỗi trạng thái chỉ cần biểu diễn bởi cặp $(vang, do)$.

Do đề bài yêu cầu số thao tác **ít nhất**, lại chỉ có tối đa $5$ truy vấn, nên với mỗi truy vấn ta có thể xử lý độc lập bằng **BFS** trên không gian trạng thái.

Cụ thể, với đoạn đang xét, ta tạo mảng `cnt[667][667]`, trong đó:

- `cnt[v][d]` là số thao tác ít nhất để đi từ trạng thái có `v` bóng vàng, `d` bóng đỏ về trạng thái toàn tắt
- trạng thái bắt đầu là trạng thái ứng với đoạn $[L, R]$
- trạng thái đích là `cnt[0][0]`

**ĐPT**: $O(Q \cdot N^2)$

### Subtask AC

Với một đoạn có độ dài `len`, ta nhận thấy trạng thái của đoạn chỉ phụ thuộc vào:

- `vang`: số bóng đang màu vàng,
- `do`: số bóng đang màu đỏ,
- `tat = len - vang - do`: số bóng đang tắt.

Do đó, với mỗi đoạn, ta chỉ cần lưu trạng thái dưới dạng cặp `(vang, do)`.

Gọi: $dp[vang][do]$ là số thao tác ít nhất để đưa một đoạn hiện tại về trạng thái toàn tắt.

Với mỗi truy vấn `[L, R]`, ta tính:

- `len = R - L + 1`
- `vang`: số bóng vàng trong đoạn
- `do`: số bóng đỏ trong đoạn

bằng mảng cộng dồn.

Sau đó gom các truy vấn có cùng độ dài `len` vào chung một nhóm. Khi đã xử lý xong mọi trạng thái của độ dài `len`, ta chỉ việc lấy trực tiếp đáp án `dp[vang][do]` cho các truy vấn trong nhóm đó.

**Bây giờ chuyển trạng thái như thế nào???** *Phần này tự nghĩ để tăng tư duy nhé*

Ta cần tìm số thao tác ít nhất để đưa mọi trạng thái về `(0, 0)`, tức là toàn bộ bóng đều tắt. Thay vì BFS từ từng truy vấn, ta BFS ngược từ trạng thái đích `(0, 0)`.

Ban đầu: $dp[0][0] = 0$

> Nếu làm theo cách này thì ĐPT sẽ là $O(n^3)$ máy chấm có thể khá mạnh nhưng mà vẫn hơi lo lắng bị TLE.

**Tối ưu:**

Nếu một trạng thái có quá nhiều bóng đang tắt, cụ thể: $tat > X + Y$


thì trong một thao tác ta chỉ có thể tác động lên nhiều nhất `X + Y` bóng, nên luôn tồn tại ít nhất một bóng tắt "dư" không ảnh hưởng gì đến đáp án.

Do đó, trạng thái có cùng `(vang, do)` nhưng khác nhau ở số bóng tắt dư sẽ có cùng đáp án. Nhờ vậy, khi tăng `len` từ nhỏ lên lớn, ta không cần tính lại toàn bộ từ đầu.

Cụ thể, với mỗi `len`, ta chỉ cần khởi tạo BFS từ những trạng thái có: $1 \le tat \le \min(len, X + Y)$ rồi lan ra các trạng thái còn lại.

Đây chính là ý tưởng để AC được bài này, chạy thực nghiệm thì số trạng thái chạm đến rất là ít.


## Note
$3$ sub đầu khá dễ nên cố gắng cắn hết, còn sub AC thì nếu bạn có cảm nhận tốt thì hẵng làm, và lưu ý ở sub AC do **BFS ngược** nên là lúc thực hiện thao tác cũng sẽ bị ngược (thường sẽ bug ở đây).

### Code tham khảo: [Link](https://ideone.com/G05FYb)

# Bài 2: Quà Noel

- Tag: Binary search, Segment Tree

## Tóm tắt
Có $N (N \le 10^5)$ loại quà, loại quà thứ $i$ sẽ có $S_i$ món và mỗi món khối lượng là $W_i (S_i, W_i \le 10^5)$. Mỗi túi quà có đúng $K$ món và không có $2$ món nào cùng một loại quà và tổng khối lượng không được vượt quá $M$.

Có $Q (Q \le 10^5)$ truy vấn thuộc $2$ loại:
- Cho $M, K, T (M, K, T \le 10^9)$ Hỏi có thể tạo ra $T$ túi quà mà tổng khối lượng không vượt quá $M$ hay không?
- Cho $M, K (M, K \le 10^9)$ Hỏi có thể tạo được nhiều nhất bao nhiêu túi quà mà tổng khối lượng không vượt quá $M$?

## Lời giải
### Subtask 1: $S_i = 1$
$S_i$ = 1 nên mỗi loại quà chỉ có $1$ món. Suy ra không cần để ý đến điều kiện có $2$ loại quà thuộc cùng một túi.
- Với truy vấn loại 1: Người thông minh như bạn sẽ nghĩ đến việc ưu tiên chọn các món quà có khối lượng nhỏ trước. **Sắp xếp lại các loại quà theo $W_i$ tăng dần**. Mỗi túi có $K$ món nên tổng số vật ta lấy sẽ là $K \times T$. Nếu $K \times T \le N$ và tổng khối lượng của $K \times T$ món quà nhỏ nhất nhỏ hơn hoặc bằng $M$ thì ta có thể tạo ra $T$ túi quà.
- Với truy vấn loại 2: Tìm ra tổng giá trị lớn nhất có thể tạo được mà vẫn không vượt quá $M$. Suy ra dùng `upper_bound` trên mảng tổng tiền tố. Giả sử lúc này chọn được `cnt` loại quà thì số túi quà tối đa là $\frac{cnt}{K}$.

**ĐPT:** $O(Q \cdot log(n))$

### Subtask 2, 3: $N, Q \le 1000$
Bây giờ cái khó là chúng ta phải để ý đến điều kiện không để $2$ loại quà thuộc cùng một túi. 

Với truy vấn $1$, nếu suy nghĩ bình thường thì rất khó để viết được hàm kiểm tra. Mình thử đổi suy nghĩ một chút để viết hàm kiểm tra dễ nhất là hỏi xem với **mỗi loại quà thì có thể chọn đối đa bao nhiêu món** (lưu ý vẫn giữ tư tưởng tham lam ở sub 1 nên sẽ duyệt các món quà từ nhỏ đến lớn). Vậy khi xét đến một món quà chúng ta cần biết:
- `S_i`: số lượng món quà
- `need`: cần bao nhiêu món quà nữa mới đủ $K \times T$ món.
- `T`: số lượng túi quà (do không có 2 loại quà nằm cùng 1 túi nên tối đa chỉ là $T$)

Suy ra chúng ta chỉ lấy được tối đa là `min(S_i, need, T)` món.
```cpp
bool check(int t, int m, int k) {
    int tong = 0;
    int need = k * t; // tong so qua can lay
    for(int j = 1; j <= n; j++) {
        int lay = min({a[j].se, need, t});
        tong += lay * a[j].fi;
        need -= lay;
        if(need == 0) break;
    }
    if(need == 0 && tong <= m) return 1;
    else return 0;
    // ĐPT: O(N)
}
```

Với truy vấn $2$, chúng ta tinh ý nhận ra một điều rằng nếu tạo được $T$ túi thì luôn tạo được một số túi nhỏ hơn $T$. Từ đây nghĩ đến chúng ta hoàn toàn có thể chặt nhị phân theo $T$ và sử dụng lại hàm `check()` ở bên trên.

**ĐPT**: $O(Q \cdot N \cdot log(10^9))$

### Subtask 4: Chỉ có câu hỏi loại 1
Ở sub 2, 3 chúng ta đã có hàm `check(T, M, K)` để kiểm tra xem có thể tạo được đúng `T` túi quà hay không. Tuy nhiên cách làm đó là `O(N)` cho mỗi lần kiểm tra nên không thể chạy được với giới hạn lớn. Ý tưởng bây giờ là phải tăng tốc hàm kiểm tra này.

Vẫn sort các loại quà theo khối lượng tăng dần như cũ. Khi cần tạo `T` túi quà, với loại quà thứ `i` thì số món tối đa có thể lấy là:

$$
\min(S_i, T)
$$

vì mỗi túi chỉ chứa nhiều nhất một món của loại đó.

Nếu gọi:

$$
dem[i] = \sum_{j=1}^{i} \min(S_j, T)
$$

là tổng số món tối đa có thể lấy từ `i` loại quà nhẹ nhất, và

$$
sum[i] = \sum_{j=1}^{i} \min(S_j, T)\cdot W_j
$$

là tổng khối lượng nhỏ nhất tương ứng, thì để tạo được `T` túi quà ta cần lấy đúng:

$$
K \cdot T
$$

món quà. Khi đó chỉ cần tìm vị trí lớn nhất `pos` sao cho:

$$
dem[pos] \le K \cdot T
$$

suy ra tổng khối lượng nhỏ nhất cần dùng sẽ là:

$$
sum[pos] + (K \cdot T - dem[pos]) \cdot W_{pos+1}
$$

Nếu giá trị này không vượt quá `M` thì đáp án là `1`, ngược lại là `0`.

Vấn đề là với mỗi truy vấn thì `T` lại thay đổi, nên không thể xây lại toàn bộ hai mảng `dem` và `sum` từ đầu.

---

Ta nhận thấy không có thao tác cập nhật nào trên dữ liệu gốc, nên hoàn toàn có thể xử lý **offline**. Sắp xếp các truy vấn theo `T` tăng dần.

Với một giá trị `T` cố định, hãy tưởng tượng chia các loại quà thành hai nhóm:

- **Nhóm A:** các loại có `S_i <= T`, khi đó  
  $$\min(S_i, T) = S_i$$
- **Nhóm B:** các loại có `S_i > T`, khi đó  
  $$\min(S_i, T) = T$$

Ban đầu nếu `T = 0` thì nhóm A rỗng, nhóm B chứa tất cả các loại quà. Khi `T` tăng dần, sẽ có một vài loại rời khỏi B và chuyển sang A. Ta cần một cấu trúc dữ liệu hỗ trợ:

- cập nhật nhanh khi một loại quà chuyển nhóm,
- tính nhanh tổng số lượng món và tổng khối lượng của một prefix để mô phỏng việc lấy các món quà nhẹ nhất trước.

Cấu trúc phù hợp ở đây là **Segment Tree**.

---

Trên Segment Tree, tại mỗi node ta lưu 4 thông tin:

- `dem`: tổng số món của các loại đã thuộc nhóm A trong đoạn này,
- `sum`: tổng khối lượng tương ứng của các loại đã thuộc nhóm A,
- `cnt`: số phần tử trong đoạn đã thuộc nhóm A,
- `sum_fi`: tổng khối lượng `W_i` của các loại vẫn còn thuộc nhóm B.

Ý nghĩa của các giá trị này là:

- với phần tử đã ở nhóm A thì đóng góp số lượng là `S_i`,
- với phần tử còn ở nhóm B thì đóng góp số lượng là `T`.

Do đó, nếu đang xét một đoạn bất kỳ thì:

- tổng số món tối đa có thể lấy trong đoạn là

$$
dem + (\text{số phần tử chưa vào A}) \cdot T
$$

- tổng khối lượng nhỏ nhất tương ứng là

$$
sum + sum\_fi \cdot T
$$

Khi `T` tăng đến mức một loại quà thỏa `S_i <= T`, ta chỉ cần update điểm tương ứng trên cây để chuyển nó từ nhóm B sang nhóm A.

---

Bây giờ cần tính nhanh tổng khối lượng nhỏ nhất để lấy đúng $K \times T$ món quà.

Ta truy vấn trên Segment Tree theo kiểu tham lam từ trái sang phải:

- nếu đoạn trái đã đủ số lượng món cần lấy thì đi xuống trái,
- nếu chưa đủ thì lấy toàn bộ đoạn trái rồi sang phải lấy phần còn thiếu.

Vì các loại quà đã được sort theo `W_i` tăng dần nên cách làm này đúng với tư tưởng luôn lấy quà nhẹ nhất trước.

Nhờ đó, với mỗi truy vấn loại 1, sau khi xử lý cây đúng với giá trị `T`, ta tính được trực tiếp tổng khối lượng nhỏ nhất của $K \cdot T$ món quà. Chỉ cần so sánh với `M` là xong.

**ĐPT:**$O((N + Q)\log N)$


### Subtask AC
Bây giờ có thêm truy vấn loại 2: với `M, K`, hỏi tạo được nhiều nhất bao nhiêu túi quà.

Ta nhận thấy nếu tạo được `T` túi thì luôn tạo được mọi số túi nhỏ hơn `T`. Suy ra đáp án có tính chất đơn điệu, hoàn toàn có thể **chặt nhị phân theo số túi `T`**.

Nếu làm chặt nhị phân riêng từng truy vấn thì vẫn quá chậm. Vì vậy ta dùng kỹ thuật **parallel binary search**:

- với mỗi truy vấn loại 2 chưa xác định xong đáp án, lấy `mid = (L + R) / 2`,
- gom tất cả các giá trị `mid` này lại thành một danh sách truy vấn kiểm tra,
- xử lý toàn bộ danh sách đó bằng đúng thủ tục offline + Segment Tree của subtask 4,
- nếu kiểm tra thành công thì cập nhật đáp án và tăng cận trái,
- ngược lại giảm cận phải.

Mỗi vòng lặp chặt nhị phân chỉ cần một lần xử lý offline cho toàn bộ các truy vấn loại 2.

---

Ngoài ra, trong code có thêm một tối ưu nhỏ:

Ta tính trước:

$$
pre\_cnt[i] = \sum_{j=1}^{i} S_j,\qquad
pre\_sum[i] = \sum_{j=1}^{i} S_j \cdot W_j
$$

Giả sử một truy vấn loại 2 có thể lấy được tổng cộng `so_luong` món quà nhẹ nhất mà vẫn không vượt quá `M`, thì số túi tối đa chắc chắn không vượt quá:

$$
T_0 = \left\lfloor \frac{so\_luong}{K} \right\rfloor
$$

Nếu `T_0` đã lớn hơn hoặc bằng `max(S_i)` thì đáp án chính là `T_0`, vì khi đó mọi loại quà đều đã thuộc nhóm A, không còn bị ràng buộc bởi `T` nữa. Trường hợp này có thể trả lời ngay mà không cần chặt nhị phân tiếp.


**ĐPT:**$O((N + Q)\log N \log(10^9))$

## Note

Để code được bài này thì tay cũng phải rất là to, tuy nhiên nếu như bạn làm được sub 4 và đã từng đọc qua parallel binary search thì chắc chắn AC được bài này nhưng mà nên cố gắng cài khéo kiểu có thể dùng hàm để giúp sub4 phục vụ được cho sub5 đỡ phải code quá dài.

### Code tham khảo: [Link](https://ideone.com/nMXfrC)

# Bài 3: Bài đăng
- Tag: Sweepline

## Tóm tắt
Có $N (N \le 3\times10^5)$ bài đăng, mỗi bài đăng sẽ có chủ đề là $A_i (A_i \le N)$.

Một đoạn $[L, R]$ là một đoạn toàn vẹn nếu như với mỗi chủ đề $t$ hoặc là không có bài đăng nào trong đoạn từ $L$ đến $R$ hoặc tất cả đều nằm trong đoạn $[L, R]$.

Có $Q (Q \le 3 \times 10^5)$ truy vấn, mỗi truy vấn cho $2$ số $U, V$. Yêu cầu đếm số lượng đoạn toàn vẹn $[L, R]$ thỏa mãn $U \le L \le R \le V$

## Lời giải
### Subtask 1: $N, Q \le 50$
Tạo trước $2$ mảng `pre[]` và `nxt[]` với ý nghĩa:
- `pre[i]` là vị trí đầu tiên có cùng chủ đề với $i$
- `nxt[i]` là vị trí cuối cùng có cùng chủ đề với $i$

Bây giờ với mỗi truy vấn chúng ta chỉ cần duyệt qua mọi đoạn $[L, R]$ rồi kiểm tra xem với mọi $i \in [L, R]$ thì $pre[i] \ge L$ và $nxt[i] \le R$ là được.

**ĐPT**: $O(Q \times N^3)$

### Subtask 2: $N \le 500$

Để ý rằng tổng số đoạn liên tiếp phải xét tính toàn vẹn là $N^2$. Nên chúng ta sẽ chuẩn bị trước (precompute) để xem với mỗi đoạn $[L, R]$ thì có toàn vẹn hay không. Sau đó dùng mảng cộng dồn 2 chiều để trả lời truy vấn. Vậy mỗi truy vấn chỉ tốn  $O(1)$ để trả lời.

```cpp
for(int i = n; i >= 1; i--) {
    for(int j = i; j <= n; j++) {
        bool ok = 1;
        for(int k = i; k <= j; k++) {
            if(pre[k] < i) {
                ok = 0;
                break;
            }
            if(nxt[k] > j) {
                ok = 0;
                break;
            }
        }
        if(ok) {
            ans[i][j] = ans[i][j - 1] + ans[i + 1][j] - ans[i + 1][j - 1] + 1;
        }
        else {
            ans[i][j] = ans[i][j - 1] + ans[i + 1][j] - ans[i + 1][j - 1];
        }
    }
}
```

**ĐPT**: $O(N^3 + Q)$

### Subtask 3: $N \le 5000$
Để ý rằng điều kiện chúng ta đang cần để kiểm tra một đoạn toàn vẹn là:
+ `min(pre[]) >= L`
+ `max(nxt[]) <= R`

Vậy chúng ta luôn duy trì `min` và `max` để kiểm tra điều kiện trên. Mà thấy rằng có thể dùng `min` và `max` của đoạn $[L, R - 1]$ để tính cho đoạn $[L, R]$ mà không cần phải duyệt lại hết từ $L$ đến $R$. Vậy chúng ta sẽ giảm được $1$ vòng for so với subtask 2 (ý tưởng vẫn sẽ precompte mảng cộng dồn rồi in ra đáp án trong $O(1)$).

```cpp
for(int i = 1; i <= n; i++) {
    int minn = n + 1;
    int maxx = 0;
    for(int j = i; j <= n; j++) {
        minn = min(minn, pre[j]);
        maxx = max(maxx, nxt[j]);
        if(minn >= i && maxx <= j) ans[i][j] = 1;
        if(minn < i) break;
    }
}

for(int i = n; i >= 1; i--) {
    for(int j = i + 1; j <= n; j++) {
        ans[i][j] += ans[i + 1][j] + ans[i][j - 1] - ans[i + 1][j - 1];
    }
}
```

**ĐPT**: $O(N^2 + Q)$

### Subtask 4: $Q = 1,\ U = 1,\ V = N$
Lúc này ta chỉ cần đếm tổng số đoạn toàn vẹn trên toàn bộ mảng, tức là số cặp `(L, R)` sao cho đoạn `[L, R]` là toàn vẹn.

Nhắc lại, đoạn `[L, R]` là toàn vẹn khi và chỉ khi:

- với mọi `i` thuộc `[L, R]` thì $pre[i] \ge L$,
- với mọi `i` thuộc `[L, R]` thì $nxt[i] \le R$.

Ngoài ra, hiển nhiên còn có hai điều kiện biên:

- `pre[L] = L`, vì nếu bài ở vị trí `L` còn xuất hiện ở bên trái thì đoạn không thể toàn vẹn;
- `nxt[R] = R`, vì nếu bài ở vị trí `R` còn xuất hiện ở bên phải thì đoạn cũng không thể toàn vẹn.


Vậy bây giờ ta tách bài toán thành hai phần:

#### 1. Với một vị trí `L`, những `R` nào có thể ghép với nó?
Trước hết, `L` chỉ có thể là đầu đoạn nếu `pre[L] = L`.

Khi đã cố định `L`, điều kiện cần là trên toàn bộ đoạn `[L, R]` không được có phần tử nào vi phạm $pre[i] \ge L$, hay nói cách khác:

$$
\min(pre[L \to R]) \ge L
$$

Do đó, với mỗi vị trí `L` thỏa `pre[L] = L`, ta tìm vị trí đầu tiên ở bên phải làm điều kiện trên bị phá vỡ, tức là vị trí đầu tiên có `pre[i] < L`. Gọi vị trí đó là `x`, khi đó mọi `R < x` đều còn hợp lệ.

Vì vậy ta lưu:

$$
L[i] = x - 1
$$

nghĩa là nếu chọn đầu đoạn tại `i` thì mọi $R \in [i, L[i]]$ đều thỏa điều kiện về `pre`.

Phần này có thể tính bằng stack đơn điệu.


#### 2. Với một vị trí `R`, những `L` nào có thể ghép với nó?
Tương tự, `R` chỉ có thể là cuối đoạn nếu `nxt[R] = R`.

Khi đã cố định `R`, điều kiện cần là trên toàn bộ đoạn `[L, R]` không được có phần tử nào vi phạm $nxt[i] \le R$. Ta sẽ tiền xử lý một mảng `R[]` mang ý nghĩa:

- nếu `i` có thể là cuối đoạn,
- thì chỉ cần chọn `L` nằm trong đoạn `[R[i], i]` là sẽ thỏa điều kiện về `nxt`.

Nói cách khác, với mỗi vị trí `i` là một cuối đoạn hợp lệ, nó sẽ “hoạt động” cho mọi đầu đoạn `L` sao cho:

$$
L \le R[i]
$$


### Sweepline
Bây giờ ta duyệt `L` tăng dần từ trái sang phải.

Tại thời điểm đang xét một `L = i`:

- những vị trí `R` nào thỏa $L \le R[R]$ sẽ được coi là **active**,
- và một cặp `(L, R)` là hợp lệ nếu:
  - `R` đang active,
  - đồng thời $R \in [i, L[i]]$.

Vậy bài toán còn lại chỉ là:

> Với mỗi `i`, đếm xem có bao nhiêu vị trí `R` đang active nằm trong đoạn `[i, L[i]]`.

Phần này chỉ cần dùng Fenwick Tree để:
- bật / tắt một vị trí `R` khi nó trở thành active hoặc hết active,
- query số lượng phần tử active trên một đoạn.


**ĐPT**: $O(N\cdot log(N))$

### Subtask AC
Ở sub 4, ta đã có 2 mảng `L[]` và `R[]` với đúng ý nghĩa sau:

- nếu `l` có thể là đầu đoạn (`pre[l] = l`) thì mọi $r \in [l, R[l]]$ sẽ thỏa điều kiện về `pre`,
- nếu `r` có thể là cuối đoạn (`nxt[r] = r`) thì mọi $l \in [L[r], r]$ sẽ thỏa điều kiện về `nxt`.

Vậy một đoạn `[l, r]` là toàn vẹn và nằm trong truy vấn `[u, v]` khi và chỉ khi:

- $l \ge u$,
- $r \le v$,
- $pre[l] = l$,
- $nxt[r] = r$,
- $r \le R[l]$,
- $l \ge L[r]$.



Bây giờ xử lý offline các truy vấn `(u, v)` theo `v` tăng dần.

Ta sweep từ trái sang phải theo `r`. Ý tưởng là tại thời điểm đang xét một vị trí `r`, ta sẽ đếm xem có bao nhiêu vị trí `l` có thể ghép với nó để tạo thành một đoạn toàn vẹn kết thúc tại `r`.

Muốn làm vậy, ta coi mỗi vị trí `l` thỏa `pre[l] = l` là một đầu đoạn hợp lệ.  
Tuy nhiên nó không hợp lệ mãi mãi, mà chỉ hoạt động trên đoạn:

$$
[l, R[l]]
$$

nên ta tạo 2 event:

- tại vị trí `l`: bật `l`,
- tại vị trí `R[l] + 1`: tắt `l`.

Nghĩa là khi sweep đến một vị trí `r`, những `l` đang active chính là các đầu đoạn vẫn còn có thể ghép với một cuối đoạn ở vị trí `r`.


Tiếp theo, nếu `r` thỏa `nxt[r] = r` thì nó có thể là cuối đoạn. Khi đó điều kiện còn lại là:

$$
l \in [L[r], r]
$$

tức là mọi `l` đang active nằm trong đoạn `[L[r], r]` sẽ tạo thành một cặp `(l, r)` hợp lệ.

Vì vậy, khi gặp một `r` là cuối đoạn hợp lệ, ta cộng thêm `1` cho tất cả các vị trí `l` đang active trong đoạn `[L[r], r]`.


Bây giờ xét một truy vấn `(u, v)`.

Do ta đang xử lý offline theo `v` tăng dần, nên đến thời điểm sweep xong vị trí `v`, mọi đoạn toàn vẹn có `r <= v` đều đã được cộng vào cấu trúc dữ liệu. Khi đó đáp án của truy vấn chỉ còn là:

> trong các đầu đoạn `l` từ `u` đến `v`, mỗi `l` hiện đã đóng góp bao nhiêu đoạn toàn vẹn có $r \le v$?

Tức là chỉ cần lấy tổng trên đoạn `[u, v]`.


Để hỗ trợ các thao tác trên, ta dùng Segment Tree lưu cho mỗi vị trí `l`:

- `active`: hiện tại `l` có đang active hay không,
- `sum`: đã có bao nhiêu đoạn toàn vẹn bắt đầu tại `l`,
- `lazy`: lazy propagation.

Khi gặp một `r` là cuối đoạn hợp lệ, ta update cộng `1` trên đoạn `[L[r], r]`, nhưng chỉ những vị trí `l` đang active mới thực sự được cộng. Vì vậy trong node segment tree, khi update ta cộng:

$$
val \times active
$$

thay vì cộng đều cho toàn bộ đoạn.

Cuối cùng, với mỗi truy vấn `(u, v)`, ta chỉ cần query tổng trên đoạn `[u, v]` tại thời điểm sweep đến `v`.


**ĐPT**: $O((N + Q)\log N)$





## Note

Bài này cũng là một bài yêu cầu tay phải rất to. Nên VOI27 ai đi thi thì nhớ luyện code nhiều bài tay to trước =)))

### Code tham khảo: [Link](https://ideone.com/ajM0zt)


# Bài 4: Tất niên


# Bài 5: Cây Thông


# Bài 6: Cắm trại (Coming soon)




