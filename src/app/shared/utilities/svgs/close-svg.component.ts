import { Component, input } from "@angular/core";

@Component({
  selector: 'atp-close-svg',
  template: `
    <svg [attr.width]="width() + 'px'" [attr.height]="height() + 'px'" [attr.stroke]="stroke()" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="System" transform="translate(-288.000000, 0.000000)">
          <g id="close_line" transform="translate(288.000000, 0.000000)">
              <path d="M12,13.4144 L17.6568,19.0713 C18.0473,19.4618 18.6805,19.4618 19.071,19.0713 C19.4615,18.6807 19.4615,18.0476 19.071,17.657 L13.4142,12.0002 L19.071,6.34335 C19.4615,5.95283 19.4615,5.31966 19.071,4.92914 C18.6805,4.53861 18.0473,4.53861 17.6568,4.92914 L12,10.586 L6.34309,4.92912 C5.95257,4.5386 5.3194,4.5386 4.92888,4.92912 C4.53836,5.31965 4.53836,5.95281 4.92888,6.34334 L10.5857,12.0002 L4.92888,17.6571 C4.53836,18.0476 4.53836,18.6807 4.92888,19.0713 C5.3194,19.4618 5.95257,19.4618 6.34309,19.0713 L12,13.4144 Z" id="路径" [attr.fill]="fill()" ></path>
          </g>
      </g>
    </svg>
  `
})
export class CloseSVGComponent{
  width = input(24);
  height = input(24);
  stroke = input('transparent');
  fill = input('#F3F3F3');
}
