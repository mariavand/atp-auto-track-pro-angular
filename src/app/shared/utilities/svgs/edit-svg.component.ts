import { Component, input } from "@angular/core";

@Component({
  selector: 'atp-edit-svg',
  template: `
  <svg [attr.stroke]="stroke()" [attr.width]="width() + 'px'" [attr.height]="height() + 'px'" viewBox="0 0 24 24" [attr.fill]="fill()" xmlns="http://www.w3.org/2000/svg">
    <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4M9.35443 12.4346L15.9429 5.92003C16.4684 5.40046 17.3049 5.3718 17.8647 5.85418C18.4812 6.38542 18.5247 7.32554 17.96 7.91149L11.481 14.6335L9 15L9.35443 12.4346Z" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
})
export class EditSvgComponent{
  width = input(24);
  height = input(24);
  fill = input('transparent');
  stroke = input('#464455');
}
