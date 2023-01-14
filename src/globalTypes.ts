export type ItemType =  typeof itemTypes[number];
export type Faction =  'bs' | 'sm';

export const itemTypes = ['High Tech Items', 'Tech Items', 'Advanced Items', 'Usable Items', 'Super Mutant Items', 'Upgrades', 'Power armor'] as const;

export const factionKeyToLabelMap = {
    'bs': 'Brotherhood of steel',
    'sm': 'Super mutants',
    'surv': 'Survivors',
    'inst': 'Institute',
    'robots': 'Robots',
    'creatures': 'Creatures',
    'ncr': 'NCR',
    'rider': 'Riders',
    'caesar': 'Caesar Legion',
    'robobrain': 'Robobrain',
    'atomchild': 'Children\'s of atom',
    'strelok': 'Gunners',
    'podzemka': 'Railroad',
    'enclave': 'Enclave'
}