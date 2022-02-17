import type { SetInfo } from "../../client";

export function setsList(): SetInfo[] {
    return [
        {
            difficulty: 'starter',
            topic: 'atomic numbers',
            type: 'list',
            name: 'Atomic Numbers - Starter',
            description: 'Contains the first 18 elements and their atomic numbers. This is a good first set to learn for beginners.',
            id: 'S1',
            etc: {
                inputType: "number"
            }
        },
        {
            difficulty: 'starter',
            topic: 'atomic masses',
            type: 'list',
            name: 'Atomic Masses - Starter',
            description: 'Contains the first 18 elements and their atomic masses. This is a good first set to learn for beginners.',
            id: 'S2',
            etc: {
                inputType: "number"
            }
        },
        {
            difficulty: 'starter',
            topic: 'periodic table locations',
            type: 'place',
            name: 'Periodic Table Locations - Starter',
            description: 'Contains the first 18 elements and where they are located on the periodic table. This is a good first set to learn for beginners.',
            id: 'S3',
            etc: {
                hideAtomicNumber: true,
                hideAtomicSymbol: true,
                hideAtomicMass: true
            }
        },
        {
            difficulty: 'starter',
            topic: 'chemical formulas',
            type: 'name',
            description: 'Contains the most commonly used compounds in intro chemistry and their chemical formulas. This is a good first set to learn for beginners.',
            name: 'Chemical Formulas - Starter',
            id: 'S4'
        }
    ]
}