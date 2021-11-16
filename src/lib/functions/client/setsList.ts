import type { SetInfo } from "../../client";

export function setsList(): SetInfo[] {
    return [
        {
            difficulty: 'starter',
            topic: 'atomic numbers',
            type: 'list',
            name: 'Atomic Numbers - Starter',
            id: 'Atomic Numbers - Starter'
        },
        {
            difficulty: 'starter',
            topic: 'atomic masses',
            type: 'list',
            name: 'Atomic Masses - Starter',
            id: 'Atomic Masses - Starter'
        },
        {
            difficulty: 'starter',
            topic: 'periodic table locations',
            type: 'place',
            name: 'Periodic Table Locations - Starter',
            id: 'Periodic Table Locations - Starter'
        },
        {
            difficulty: 'starter',
            topic: 'chemical formulas',
            type: 'name',
            name: 'Chemical Formulas - Starter',
            id: 'Chemical Formulas - Starter'
        }
    ]
}