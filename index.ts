const app: HTMLElement | null = document.getElementById("app");
// const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c1");
const canvasV: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c2");

// const ctx = canvas.getContext("2d");
const ctx2 = canvasV.getContext("2d");

const vid: HTMLVideoElement | null = <HTMLVideoElement>document.getElementById("video");
navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(x => {
    vid.srcObject = x;
    canvasV.width = 320;
    canvasV.height = 240;
});


let pixel: ImageData | undefined;
let videoPixel: ImageData | undefined;


setInterval(() => {
    ctx2?.drawImage(vid, 0,0,320,240);
    videoPixel = ctx2?.getImageData(0, 0, canvasV.width, canvasV.height);
    let symbolCol = "";
    if (videoPixel) {
        for (let i = 0; i < videoPixel?.height; i = i + 2) {
            for (let j = 0; j < videoPixel.width; j = j + 1) {
                const posX = j * 4;
                const posY = i * 4;
                const pos = (posY * videoPixel.width) + posX;
                if (true) {
                    const red = videoPixel.data[pos];
                    const green = videoPixel.data[pos + 1];
                    const blue = videoPixel.data[pos + 2];
                    const total = red + green + blue;
                    const averageColor = total / 3;
                    const symbol = convertToSymbol(averageColor);
                    symbolCol += symbol;
                }
            }
            symbolCol += "<br/>";
            let asciVideo = document.getElementById('asciVideo');
            if (asciVideo) {
                asciVideo.innerHTML = symbolCol;
            }
        }
    }

}, 10);

function convertToSymbol(g: number) {
    if (g > 250) return "$";
    else if (g > 240) return "@";
    else if (g > 220) return "B";
    else if (g > 200) return "%";
    else if (g > 180) return "8";
    else if (g > 160) return "&";
    else if (g > 140) return "W";
    else if (g > 120) return "M";
    else if (g > 100) return "#";
    else if (g > 80) return "*";
    else if (g > 60) return "o";
    else if (g > 40) return "a";
    else if (g > 20) return "h";
    else {
        return "k";
    }

}


