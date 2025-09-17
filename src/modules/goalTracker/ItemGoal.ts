//import { Observable } from 'knockout';
import { ItemNameType } from '../items/ItemNameType';
import ObservableGoal from './ObservableGoal';
import { GoalType } from './GoalType';
import { ItemList } from '../items/ItemList';
import { Observable } from 'knockout';

export default class ItemGoal extends ObservableGoal {
    constructor(
        name: string,
        private itemName: ItemNameType,
        goalAmount: number,
        startAmount?: number,
    ) {
        super(name, GoalType.Item, player.itemList[itemName], goalAmount, startAmount);
        //super(name, goalAmount, startAmount);
    }

    /*getTrackedObservable(): Observable<number> {
        return player.itemList[this.itemName];
    }*/

    getObservable(): Observable<number> {
        return player.itemList[this.itemName];
    }

    getGoalOptions() {
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

        return Object.values(ItemList).filter((item) => includedItemTypes.includes(item.constructor.name));
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        //json.type = this.constructor.name;
        json.itemName = this.itemName;
        return json;
    }
}
