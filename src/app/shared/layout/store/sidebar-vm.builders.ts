import { CarColumnKey } from "../../models/car.model";
import { SidebarVM } from "./sidebar.vm";

export function buildSidebarVm(defaultColumns: Record<CarColumnKey, boolean>): SidebarVM{
  return {
    selectedColumns: buildSelectedColumns(defaultColumns),
  };

  function buildSelectedColumns(defaultColumns: Record<CarColumnKey, boolean>){

    let finalColumns = defaultColumns;

    let localySaved = JSON.parse(localStorage.getItem('columns')!);

    console.log('localySaved', localySaved);
    if(localySaved != null){

    }

    return finalColumns;
  }
}
