import { CarColumnKey } from "../../models/car.model";

export type SidebarVM = {
  selectedColumns: Record<CarColumnKey, boolean>,
}
