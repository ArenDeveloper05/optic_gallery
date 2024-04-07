const inputs = document.querySelectorAll(".panel-head > input");
const button = document.querySelector(".panel-head > button");
const panelBody = document.querySelector(".panel-body");
const searchInput = document.querySelector(".panel-headings-search > input");
const dataFromStorage = localStorage.getItem("opticGalleryData");
let opticGalleryData = [];
if (!dataFromStorage || Array.isArray(JSON.parse(dataFromStorage)) !== true) {
  updateStorage([]);
} else {
  opticGalleryData = JSON.parse(dataFromStorage);
}

drawTable(opticGalleryData);

function updateStorage(val) {
  localStorage.setItem("opticGalleryData", JSON.stringify(val));
}

function addInfo(obj) {
  const { info, isGood } = validateInputs();
  if (isGood) {
    opticGalleryData.push(info);
    clearTableContent();
    drawTable(opticGalleryData);
    clearInputValues();
    updateStorage(opticGalleryData);
  }
}

button.addEventListener("click", addInfo);

function validateInputs() {
  const info = {
    id:
      opticGalleryData.length === 0
        ? 1
        : opticGalleryData[opticGalleryData.length - 1].id + 1,
    isEdit: false,
  };
  let isGood = true;
  inputs.forEach((el) => {
    info[el.name] = el.value.trim();
    if (el.value.trim()) {
      el.style.border = "none";
    } else {
      el.style.border = "4px solid red";
      isGood = false;
    }
  });
  return { info, isGood };
}

function drawTable(dt) {
  dt.forEach((el) => {
    const row = document.createElement("div");
    row.classList.add("panel-body-item");

    const id = document.createElement("p");
    id.textContent = el.id;

    const nameP = document.createElement("p");
    nameP.textContent = el.name;
    const nameInput = document.createElement("input");
    nameInput.value = el.name;

    const modelP = document.createElement("p");
    modelP.textContent = el.model;
    const modelInput = document.createElement("input");
    modelInput.value = el.model;

    const colorP = document.createElement("p");
    colorP.textContent = el.color;
    const colorInput = document.createElement("input");
    colorInput.value = el.color;

    const priceP = document.createElement("p");
    priceP.textContent = el.price;
    const priceInput = document.createElement("input");
    priceInput.value = el.price;

    const buyerP = document.createElement("p");
    buyerP.textContent = el.buyer;
    const buyerInput = document.createElement("input");
    buyerInput.value = el.buyer;

    const countP = document.createElement("p");
    countP.textContent = el.count;
    const countInput = document.createElement("input");
    countInput.value = el.count;

    const delButton = document.createElement("button");
    delButton.classList.add("panel-body-item-del");
    delButton.textContent = "Ջնջել";
    delButton.addEventListener("click", () => {
      deleteRow(el.id);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("panel-body-item-edit");
    editButton.textContent = "Խմբագրել";
    editButton.addEventListener("click", () => {
      if (el.isEdit) {
        el.name = nameInput.value.trim();
        el.model = modelInput.value.trim();
        el.color = colorInput.value.trim();
        el.price = priceInput.value.trim();
        el.buyer = buyerInput.value.trim();
        el.count = countInput.value.trim();
      }
      editRow(el.id);
    });

    if (el.isEdit) {
      row.append(
        id,
        nameInput,
        modelInput,
        colorInput,
        priceInput,
        buyerInput,
        countInput,
        delButton,
        editButton
      );
    } else {
      row.append(
        id,
        nameP,
        modelP,
        colorP,
        priceP,
        buyerP,
        countP,
        delButton,
        editButton
      );
    }
    panelBody.appendChild(row);
  });
}

function clearInputValues() {
  inputs.forEach((el) => {
    el.value = "";
  });
}

function clearTableContent() {
  panelBody.innerHTML = "";
}

function deleteRow(id) {
  opticGalleryData = opticGalleryData.filter((item) => item.id !== id);
  clearTableContent();
  drawTable(opticGalleryData);
  updateStorage(opticGalleryData);
}

function editRow(id) {
  opticGalleryData = opticGalleryData.map((item) => {
    if (item.id === id) {
      item.isEdit = !item.isEdit;
    }
    return item;
  });
  clearTableContent();
  drawTable(opticGalleryData);
  updateStorage(opticGalleryData);
}

function searchProduct(text) {
  const searchedData = opticGalleryData.filter(
    (item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.model.toLowerCase().includes(text.toLowerCase()) ||
      item.color.toLowerCase().includes(text.toLowerCase()) ||
      item.price.toLowerCase().includes(text.toLowerCase()) ||
      item.buyer.toLowerCase().includes(text.toLowerCase()) ||
      item.count.toLowerCase().includes(text.toLowerCase())
  );
  clearTableContent();
  drawTable(searchedData);
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addInfo();
  }
});

searchInput.addEventListener("input", () => {
  searchProduct(searchInput.value);
});
