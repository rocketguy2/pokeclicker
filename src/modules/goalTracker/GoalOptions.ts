

/*
class PokeballFilterOption<T, M = T> {
    public defaultSetting: Setting<T>;

    constructor(
        public createSetting: (defaultVal?: T, name?: string, defaultName?: string) => Setting<T>,
        public describe: (value: T) => string,
        public requirement?: Requirement,
        public matchTest: (optionValue: T, testValue: M) => boolean = (
            optionValue: T, testValue: M,
        ) => optionValue === (testValue as unknown as T),
    ) {
        this.defaultSetting = createSetting();
    }

    public canUse() {
        return this.requirement?.isCompleted() ?? true;
    }
}

category: new PokeballFilterOption<number>(
    (category = 0) => new Setting(
        'pokeballFilterCategory',
        'Category',
        () => PokemonCategories.categories().map((c) => new SettingOption(c.name(), c.id)),
        category,
    ),
    (category) => `In the ${PokemonCategories.categories().find(c => c.id == category)?.name()} category`,
),
*/

import { ItemList } from '../items/ItemList';
import Setting from '../settings/Setting';
import SettingOption from '../settings/SettingOption';
import { GoalType } from './GoalType';

/*class CustomGoalType {
    constructor(
        public type: GoalType,
        public options: Array<Setting<string | number>>,
        public getVal: (options: Array<string | number>) => number,
    ) {}
}

type TestType = {
    options: Array<Setting<string | number>>,
    getVal: (options: Array<string | number>) => number,
};

export const GoalTypeLookup = {
    [GoalType.Item]: CustomGoalType,
};

const a = () => {
    const b = new GoalTypeLookup[GoalType.Item]();
};*/

/*export const goalOptions: Partial<Record<GoalType, TestType>> = {
    [GoalType.Item]: {
        options: [
            new Setting<string>(
                'customGoalItem',
                'Item',
                () => {
                    const includedItemTypes = [
                        'BattleItem',
                        'EnergyRestore',
                        'MulchItem',
                        'PokeballItem',
                        'MegaStoneItem',
                        'EggItem',
                        'Vitamin',
                        'Consumable',
                        'UndergroundItem',
                    ];

                    return Object.values(ItemList).filter((item) => includedItemTypes.includes(item.constructor.name))
                        .map((item) => new SettingOption(item.displayName, item.name));
                },
                undefined,
            )
        ],
        getVal: (options) => {
            return player.itemList[options[0]]?.() ?? 0;
        },
    },
};*/

/*export const goalOptions: Record<GoalType, CustomGoalType> = {
    [GoalType.Item]: new CustomGoalType(
        GoalType.Item,
        [
            new Setting<string>(
                'customGoalItem',
                'Item',
                () => {
                    const includedItemTypes = [
                        'BattleItem',
                        'EnergyRestore',
                        'MulchItem',
                        'PokeballItem',
                        'MegaStoneItem',
                        'EggItem',
                        'Vitamin',
                        'Consumable',
                        'UndergroundItem',
                    ];

                    return Object.values(ItemList).filter((item) => includedItemTypes.includes(item.constructor.name))
                        .map((item) => new SettingOption(item.displayName, item.name));
                },
                undefined,
            )
        ],
        (options) => {
            return player.itemList[options[0]]?.() ?? 0;
        }
    ),
    [GoalType.Pokemon]: new CustomGoalType(

    ),
    [GoalType.Statistic]: new CustomGoalType(

    ),
};*/

/*class GoalOption<T> {
    constructor(
        public createSetting: (defaultVal?: T, name?: string, defaultName?: string) => Setting<T>,
    ) {}
}

export const goalOptions = {
    item: new GoalOption<string>(
        (test = '') => new Setting<string>(
            'customGoalItem',
            'Item',
            () => {
                const includedItemTypes = [
                    'BattleItem',
                    'EnergyRestore',
                    'MulchItem',
                    'PokeballItem',
                    'MegaStoneItem',
                    'EggItem',
                    'Vitamin',
                    'Consumable',
                    'UndergroundItem',
                ];

                return Object.values(ItemList).filter((item) => includedItemTypes.includes(item.constructor.name))
                    .map((item) => new SettingOption(item.displayName, item.name));
            },
            test,
        )
    ),

    pokemon: new GoalOption(
        'Pokémon',
        [

        ],
    ),

    statistic: new GoalOption(
        'Statistic',
        [

        ],
    ),
};*/
