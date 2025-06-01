export type AbstractCar = {
  readonly ownerNameSurname: string;
  readonly serialNumber: string;
  readonly softwareVersion: string;
  readonly techComments: string;
  readonly buyingDay: Date | string;
  readonly editedBy: string;
  readonly lastUpdateDate: Date | string;
  readonly lockedBy: string;
  readonly generalComments: string;
  readonly salesComments: string;
  readonly batteryChangeDate: Date | string;
  readonly paymentStatus: string;
  readonly finalPrice: number;
  readonly initialPrice: number;
  readonly airConditioning: boolean;
  readonly fuelType: string;
  readonly seats: string;
  readonly transmission: number;
  readonly gps: boolean;
  readonly bluetooth: boolean;
  readonly status: string;
  readonly color: string;
  readonly carId: number;
}
