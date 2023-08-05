var cropper;

document.getElementById('imageInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function() {
        var img = document.getElementById('uploadedImage');
        var imgContainer = document.getElementById('uploadedImageContainer');
        img.src = reader.result;
        img.style.display = 'block';

        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(img, {
            aspectRatio: 1,
            viewMode: 1,
            movable: true,
            zoomable: false,
            crop: function(event) {
            }
        });

        var imgRatio = img.naturalWidth / img.naturalHeight;
        if (imgRatio > 1) {
            imgContainer.style.width = '100%';
            imgContainer.style.height = 100 / imgRatio + '%';
        } else {
            imgContainer.style.width = imgRatio * 100 + '%';
            imgContainer.style.height = '100%';
        }

        document.getElementById('convertedContainer').style.display = 'none';
        document.getElementById('downloadButton').style.display = 'none';
    }

    reader.readAsDataURL(file);
});

document.getElementById('convertButton').addEventListener('click', function() {
    if (!cropper) {
        alert('請先選擇一張圖片並裁切正方形');
        return;
    }

    var croppedCanvas = cropper.getCroppedCanvas({
        width: 64,
        height: 64
    });

    croppedCanvas.toBlob(function(blob) {
        var convertedImg = document.getElementById('convertedImg');
        var convertedContainer = document.getElementById('convertedContainer');
        convertedImg.src = URL.createObjectURL(blob);
        convertedContainer.style.display = 'block';
        document.getElementById('downloadButton').style.display = 'block';
    });
});

document.getElementById('downloadButton').addEventListener('click', function() {
    var convertedImg = document.getElementById('convertedImg');
    var link = document.createElement('a');
    link.href = convertedImg.src;
    link.download = 'server-icon.png';
    link.click();
});

document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');
    const uploadedImage = document.getElementById('uploadedImage');

    const hasUploaded = uploadedImage.src !== '#';

    imageContainer.addEventListener('click', function() {
        if (!hasUploaded) {
            imageInput.click();
        }
    });
});

