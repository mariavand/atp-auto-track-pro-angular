export interface wsResponse {
  readonly type: string;
  readonly email: string;
  readonly locked: boolean;
  readonly carId: number;
}
