import { inject, Injectable, resource, ResourceRef, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CarsService {

  get allColumnsNamesMapper(): { [key : string]: string }{
    return {
      airConditioning: 'Air Conditioner',
      batteryChangeDate: 'Battery Change Date',
      bluetooth: 'Bluetooth',
      brand: 'Brand',
      buyingDay: 'Buying Day',
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
