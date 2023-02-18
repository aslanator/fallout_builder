export type ItemType =  typeof itemTypes[number];
export type ItemSubType =  typeof itemSubTypes[number];
export type Faction =  'bs' | 'sm';

export const itemTypes = ['Leader', 'Perk', 'Armor', 'Clothes', 'Gear', 'Heroic', 'Melee', 'Mod', 'Pistol', 'Rifle', 'Heavy Weapon', 'Thrown Weapon', 'Alcohol', 'Chem', 'Food', 'Power Armor'] as const;
export const itemSubTypes = ['High Tech Items', 'Tech Items', 'Advanced Items', 'Usable Items', 'Super Mutant Items', 'Upgrades', 'Power armor', 'Creature items', 'Dog items', 'Leader Perk', 'Perk', 'Robot Items'] as const;

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