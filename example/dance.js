{
    const imageElement = document.getElementById("dance");
    const imageCount = 97;

    const images = [];
    for (let imageIndex = 0; imageIndex < imageCount; imageIndex++) {
        const image = new Image();
        image.src = `dance/dance_${imageIndex + 1}.png`;
        images.push(image);
    }

    let imageIndex = 0;
    let imageSpeed = 1;
    setInterval(() => {
        const image = images[imageIndex];
        imageElement.setAttribute("src", image.src);

        let nextImageIndex = imageIndex + imageSpeed;
        if (nextImageIndex < 0 || nextImageIndex >= imageCount) {
            imageSpeed = -imageSpeed;
            nextImageIndex = imageIndex + imageSpeed;
        }
        imageIndex = nextImageIndex;
    }, 30);
}
