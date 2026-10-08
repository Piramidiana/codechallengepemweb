const form = document.querySelector("#form");
const judul = document.querySelector("#judul");
const matkul = document.querySelector("#matkul");
const deadline = document.querySelector("#deadline");
const daftar = document.querySelector("#daftar");
const error = document.querySelector("#error");
const counter = document.querySelector("#counter");

let tugas = [];
let filter = "semua";
let id = 1;

function render() {
  daftar.innerHTML = "";

  let tampil = tugas;

  if (filter === "aktif") {
    tampil = tugas.filter(item => !item.selesai);
  }

  if (filter === "selesai") {
    tampil = tugas.filter(item => item.selesai);
  }

  tampil.forEach(function (item) {
    const li = document.createElement("li");
    li.dataset.id = item.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.selesai;

    const teks = document.createElement("span");
    teks.textContent =
      `${item.judul} - ${item.matkul} - ${item.deadline}`;

    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";

    li.append(checkbox, teks, hapus);
    daftar.append(li);
  });

  const jumlahAktif = tugas.filter(item => !item.selesai).length;
  counter.textContent = jumlahAktif + " tugas aktif";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  error.textContent = "";

  if (judul.value.trim().length < 3) {
    error.textContent = "Judul minimal 3 karakter";
    return;
  }

  if (deadline.value === "") {
    error.textContent = "Deadline wajib diisi";
    return;
  }

  tugas.push({
    id: id,
    judul: judul.value.trim(),
    matkul: matkul.value,
    deadline: deadline.value,
    selesai: false
  });

  id++;

  form.reset();
  render();
});

daftar.addEventListener("click", function (e) {
  const li = e.target.closest("li");

  if (!li) return;

  const tugasId = Number(li.dataset.id);

  if (e.target.tagName === "BUTTON") {
    tugas = tugas.filter(item => item.id !== tugasId);
  }

  if (e.target.type === "checkbox") {
    const item = tugas.find(item => item.id === tugasId);
    item.selesai = e.target.checked;
  }

  render();
});

document.querySelector("#semua").addEventListener("click", function () {
  filter = "semua";
  render();
});

document.querySelector("#aktif").addEventListener("click", function () {
  filter = "aktif";
  render();
});

document.querySelector("#selesai").addEventListener("click", function () {
  filter = "selesai";
  render();
});

render();