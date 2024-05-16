import { Hall } from "../../HallsList/interfaces/hallInterface";

export interface Cinema {
    _id: string;

    address: string;

    name: string;

    numberOfHalls: string;

    halls: Hall[];

    menu: object[];

    projections: object[];
}
