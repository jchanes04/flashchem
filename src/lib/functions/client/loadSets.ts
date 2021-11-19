import type { SetInfo } from "$lib/client";

export default async function loadSets(filterText: string): Promise<SetInfo[]> {
    return [{
        difficulty: 'basic',
        topic: 'chemical formulas',
        type: 'name',
        name: 'Middle School Basic Chemical Formulas',
        id: '8538128312'
    }]
}