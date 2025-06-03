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

  get allColumnsNamesMapper(): { [key : string]: string }{
    return {
      airConditioning: 'Air Conditioner',
      batteryChangeDate: 'Battery Change Date',
      bluetooth: 'Bluetooth',
      brand: 'Brand',
      buyingDay: 'BuyingDay',
      carId: 'Id',
      color: 'Color',
      editedBy: 'Edited By',
      finalPrice: 'Final Price',
      fuelType: 'Fuel Type',
      generalComments: 'General Comments',
      gps: 'GPS',
      initialPrice: 'Initial Price',
      lastUpdateDate: 'Last Update Date',
      lockedBy: 'Locked By',
      model: 'Model',
      ownerNameSurname: 'Owner Name & Surname',
      paymentStatus: 'Payment Status',
      salesComments: 'Sales Comments',
      seats: 'Seats',
      serialNumber: 'Serial Number',
      softwareVersion: 'Software Version',
      status: 'Status',
      techComments: 'Tech Comments',
      transmission: 'Transmission',
      year: 'Year'
    }
  }
}
