import { HttpClient, httpResource, HttpResourceRef } from "@angular/common/http";
import { inject, Injectable, resource, ResourceRef, signal } from "@angular/core";
import { Car } from "../../store/models/car.vm";
import { environment } from "../../environments/environment.prod";
import { first, map } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: 'root' })
export class CarsService {

  #http = inject(HttpClient);

  #allCars = rxResource({
      stream: () =>
        this.#http.get<Car[]>(environment.apiUrl + '/cars').pipe(first())
    });

  get allCars(){
    return this.#allCars;
  }
}
