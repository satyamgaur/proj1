const images = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title:
      "a man and a woman trying to cook a meal together in a modern kitchen.jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2022.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-may-2022.key",
  },
];

let selected = 0;

const truncateString = (str) => {
    if(str.length <= 23) return str;
    return str.substr(0, 10) + "..." + str.substr(str.length - 10);
};

const createImgPreview = (image, index) => {
    let imgPreviewDiv = document.createElement('div');
    imgPreviewDiv.classList.add("img-preview", `preview-${index}`);
    imgPreviewDiv.innerHTML = `
        <img src="${image.previewImage}" alt="">
        <div class="img-preview-title">${truncateString(image.title)}</div>
    `;
    imgPreviewDiv.addEventListener("click", () => changeSelection(index));
    return imgPreviewDiv;
};

const leftPanel = document.querySelector('.left-panel');
const imgPanel = document.querySelector('.img-panel');
const fullImage = document.querySelector(".full-image img");
const fullImageTitle = document.querySelector(".full-image input");

fullImageTitle.addEventListener("change", () => changeTitle(fullImageTitle.value))

const changeFullImage = () => {
    fullImage.setAttribute("src", images[selected].previewImage);
}

const changeFullImageTitle = () => {
    fullImageTitle.value = images[selected].title;
    console.log(selected, images[selected].title);
}

images.forEach((image, index) => {
    leftPanel.append(createImgPreview(image, index));
});

const changeSelectedImage = () => {
    changeFullImage();
    changeFullImageTitle();
}

// changeSelectedImage();

const changeTitle = (newTitle) => {
    images[selected].title = newTitle;
    const previewTitle = document.querySelector(`.preview-${selected} div`);
    previewTitle.innerHTML = truncateString(newTitle);
}

const changeSelection = (index) => {
    const prevSelected = document.querySelector(`.preview-${selected}`);
    const newSelected = document.querySelector(`.preview-${index}`);
    prevSelected.classList.remove("selected");
    newSelected.classList.add("selected");
    selected = index;
    changeSelectedImage();
}

document.addEventListener("keydown", (event) => {
    let newIndex = selected;
    if(event.key === "ArrowDown") newIndex = (selected + 1) % images.length;
    else if(event.key === "ArrowUp") newIndex = (selected - 1 + images.length) % images.length;
    else return;
    changeSelection(newIndex);
})

changeSelection(selected);
