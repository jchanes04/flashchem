import type { SetInfo } from "../../client";

export function setsList(): SetInfo[] {
    return [
        {
            difficulty: 'starter',
            topic: 'atomic numbers',
            type: 'list',
            name: 'Atomic Numbers - Starter',
            id: 'S1'
        },
        {
            difficulty: 'starter',
            topic: 'atomic masses',
            type: 'list',
            name: 'Atomic Masses - Starter',
            id: 'S2'
        },
        {
            difficulty: 'starter',
            topic: 'periodic table locations',
            type: 'place',
            name: 'Periodic Table Locations - Starter',
            id: 'S3'
        },
        {
            difficulty: 'starter',
            topic: 'chemical formulas',
            type: 'name',
            name: 'Chemical Formulas - Starter',
            id: 'S4'
        }
    ]
}