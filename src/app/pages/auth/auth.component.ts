import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs';

@Component({
  selector: 'atp-auth',
  imports: [],
  template: `
  <section class="about-system">
    <div class="about-system__container">
      <div class="about-system__wrapper">
        <div class="about-system__logo">
        </div>
        <div class="about-system__description">
          <p class="about-system__description__p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil aut quasi dolore dolores harum omnis laudantium earum expedita eaque, quaerat autem maxime recusandae blanditiis. Ipsa impedit est repudiandae nemo perspiciatis ducimus mollitia et ea, qui dignissimos cumque corrupti illum aut quas, animi, facilis minus eum? Ipsa aliquam repudiandae iure dolorum molestias cumque illo, minima esse, soluta dignissimos fugit, iste unde accusamus dicta ad sit distinctio laboriosam in! Iure dignissimos perferendis natus iusto cupiditate asperiores, harum est modi rem optio iste nulla, qui cum reprehenderit error tempore! Alias nemo dolorum iusto. Accusamus quisquam non molestias perspiciatis commodi laborum praesentium corrupti voluptate!
          </p>
        </div>
      </div>
    </div>
  </section>
  `,
  styles: ``
})
export class AuthComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  isAuthenticated = toSignal(this.#authService.isAuthenticated$.pipe(
    tap((s) => {
      if(s){
        this.#router.navigate(['/system']);
      }
    })
  ));

}
