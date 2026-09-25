const subjects = [
  "Giải tích 1",
  "Đại số tuyến tính",
  "Xác suất thống kê",
  "Tin học đại cương",
  "Xây dựng ứng dụng Web"
];

function calculateAverage(scores) {
  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
}

function classify(avg) {
  if (avg >= 8.0) return "Giỏi";
  if (avg >= 6.5) return "Khá";
  if (avg >= 5.0) return "Trung bình";
  return "Yếu";
}

document.getElementById("scoreForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let hasError = false;

  const nameInput = document.getElementById("studentName");
  const nameErr = document.getElementById("nameError");
  const studentName = nameInput.value.trim();

  if (!studentName) {
    nameErr.textContent = "Vui lòng nhập tên sinh viên.";
    nameInput.classList.add("error-input");
    hasError = true;
  } else {
    nameErr.textContent = "";
    nameInput.classList.remove("error-input");
  }

  const scores = [];
  for (let i = 1; i <= 5; i++) {
    const input = document.getElementById(`score${i}`);
    const err = document.getElementById(`err${i}`);
    const val = input.value.trim();

    if (val === "") {
      err.textContent = "Không được để trống.";
      input.classList.add("error-input");
      hasError = true;
    } else {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0 || num > 10) {
        err.textContent = "Điểm phải từ 0 đến 10.";
        input.classList.add("error-input");
        hasError = true;
      } else {
        err.textContent = "";
        input.classList.remove("error-input");
        scores.push(num);
      }
    }
  }

  if (hasError) return;

  const avg = calculateAverage(scores);
  const rank = classify(avg);

  document.getElementById("resName").textContent = studentName;
  document.getElementById("resAvg").textContent = avg.toFixed(2);

  const resRank = document.getElementById("resRank");
  resRank.textContent = rank;
  resRank.className = "badge";

  if (rank === "Giỏi") resRank.classList.add("badge-gioi");
  else if (rank === "Khá") resRank.classList.add("badge-kha");
  else if (rank === "Trung bình") resRank.classList.add("badge-tb");
  else resRank.classList.add("badge-yeu");

  const tbody = document.getElementById("resultTableBody");
  tbody.innerHTML = "";
  subjects.forEach((subj, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${subj}</td>
      <td><strong>${scores[idx].toFixed(1)}</strong></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("resultSection").classList.remove("hidden");
});
