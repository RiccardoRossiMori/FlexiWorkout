import {QueryDocumentSnapshot} from "@angular/fire/compat/firestore";
import {Scheda} from "./scheda";

export interface SchedaDocumenti {
  payload: QueryDocumentSnapshot<Scheda>;
  id: string;
}
