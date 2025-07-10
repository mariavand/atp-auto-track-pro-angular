export type AbstractCar = {
  readonly carId: number;
  readonly ownerNameSurname: string;
  readonly serialNumber: string;
  readonly softwareVersion: string;
  readonly techComments: string;
  readonly buyingDay: Date;
  readonly generalComments: string;
  readonly salesComments: string;
  readonly batteryChangeDate: Date;
  readonly paymentStatus: string;
  readonly initialPrice: number;
  readonly finalPrice: number;
  readonly airConditioning: boolean;
  readonly fuelType: string;
  readonly seats: string;
  readonly transmission: number;
  readonly gps: boolean;
  readonly bluetooth: boolean;
  readonly status: string;
  readonly color: string;
  readonly lastUpdateDate: Date;
  readonly editedBy: string;
  readonly lockedBy: string;
}
