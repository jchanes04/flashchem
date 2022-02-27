import type { SetInfo } from "../../client";

export function setsList(): SetInfo[] {
    return [
        {
            difficulty: 'basic',
            topic: 'atomic numbers',
            type: 'list',
            name: 'Atomic Numbers - Basic',
            description: 'Contains the first 18 elements and their atomic numbers. This is a good first set to learn for beginners.',
            id: 'B1',
            options: {
                inputType: "number"
            }
        },
        {
            difficulty: 'basic',
            topic: 'atomic masses',
            type: 'list',
            name: 'Atomic Masses - Basic',
            description: 'Contains the first 18 elements and their atomic masses. This is a good first set to learn for beginners.',
            id: 'B2',
            options: {
                inputType: "number"
            }
        },
        {
            difficulty: 'basic',
            topic: 'periodic table locations',
            type: 'place',
            name: 'Periodic Table Locations - Basic',
            description: 'Contains the first 18 elements and where they are located on the periodic table. This is a good first set to learn for beginners.',
            id: 'B3',
            options: {
                hideAtomicNumber: true,
                hideAtomicSymbol: true,
                hideAtomicMass: true
            }
        },
        {
            difficulty: 'basic',
            topic: 'chemical formulas',
            type: 'list',
            description: 'Contains the most commonly used compounds in intro chemistry and their chemical formulas. This is a good first set to learn for beginners.',
            name: 'Chemical Formulas - Basic',
            id: 'B4',
            options: {
                inputType: "chemical-formula"
            }
        },
        {
            difficulty: 'comprehensive',
            topic: 'periodic table locations',
            type: 'place',
            description: 'A set of all the elements on the periodic table, good for those who want to learn it all.',
            name: 'Periodic Table Locations - Comprehensive',
            id: 'C1',
            options: {
                hideAtomicSymbol: true,
                hideAtomicMass: true,
                hideAtomicNumber: true,
                showFBlock: true
            }
        }
    ]
}