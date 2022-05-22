const images = [];
const leftPanel = document.querySelector(".left-panel");
const imgPanel = document.querySelector(".img-panel");
const fullImage = document.querySelector(".full-image img");
const fullImageTitle = document.querySelector(".full-image input");
let selected = 0;

const truncateString = (str) => {
  	if (str.length <= 23) return str;
 	return str.substr(0, 10) + "..." + str.substr(str.length - 10);
};

const createImgPreview = (image, index) => {
  	let imgPreviewDiv = document.createElement("div");
  	imgPreviewDiv.classList.add("img-preview", `preview-${index}`);
  	imgPreviewDiv.innerHTML = `
        <img src="${image.previewImage}" alt="">
        <div class="img-preview-title">${truncateString(image.title)}</div>
    `;
	imgPreviewDiv.addEventListener("click", () => changeSelection(index));
	return imgPreviewDiv;
};

const changeFullImage = () => {
  	fullImage.setAttribute("src", images[selected].previewImage);
};

const changeFullImageTitle = () => {
  	fullImageTitle.value = images[selected].title;
};

const changeSelectedImage = () => {
  	changeFullImage();
  	changeFullImageTitle();
};

const changeTitle = (newTitle) => {
  	images[selected].title = newTitle;
  	const previewTitle = document.querySelector(`.preview-${selected} div`);
  	previewTitle.innerHTML = truncateString(newTitle);
};

const changeSelection = (index) => {
  	const prevSelected = document.querySelector(`.preview-${selected}`);
  	const newSelected = document.querySelector(`.preview-${index}`);
  	prevSelected.classList.remove("selected");
  	newSelected.classList.add("selected");
  	selected = index;
  	changeSelectedImage();
};

document.addEventListener("keydown", (event) => {
  	let newIndex = selected;
  	if (event.key === "ArrowDown") newIndex = (selected + 1) % images.length;
  	else if (event.key === "ArrowUp") newIndex = (selected - 1 + images.length) % images.length;
  	else return;
  	changeSelection(newIndex);
});

fullImageTitle.addEventListener("change", () =>
  	changeTitle(fullImageTitle.value)
);

fetch("data.json")
  	.then((data) => data.json())
  	.then((fetchedImages) => {
    	fetchedImages.forEach((image, index) => {
      		leftPanel.append(createImgPreview(image, index));
      		images.push(image);
    	});
  	})
  	.then(() => changeSelection(selected));
