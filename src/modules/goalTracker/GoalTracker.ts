import { ObservableArray } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import Goal from './Goal';
import ComputedGoal from './ComputedGoal';
import MultiRequirement from '../requirements/MultiRequirement';
import SpecialEventRequirement from '../requirements/SpecialEventRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import ShadowPokemonRequirement from '../requirements/ShadowPokemonRequirement';
import TemporaryBattleRequirement from '../requirements/TemporaryBattleRequirement';
import { AchievementOption, ShadowStatus, getTemporaryBattlesIndex } from '../GameConstants';
import ItemGoal from './ItemGoal';


export default class GoalTracker implements Feature {
    name = 'Goal Tracker';
    saveKey = 'goalTracker';
    defaults = {};

    public goals: ObservableArray<Goal> = ko.observableArray([]);
    public playerGoals: ObservableArray<Goal> = ko.observableArray([]);

    initialize() {
        this.goals.push(new ComputedGoal('Purify Chamber - Flow',
            () => App.game.purifyChamber.currentFlow(),
            () => App.game.purifyChamber.flowNeeded(),
            new ShadowPokemonRequirement(131, ShadowStatus.Purified, AchievementOption.less),
        ));

        this.goals.push(new ComputedGoal('Daily Christmas Presents',
            () => {
                const currentGifts = player.itemList.Christmas_present();
                const startingAmounts = [50, 28, 12, 1];
                const index = ['Santa Jynx 4', 'Santa Jynx 3', 'Santa Jynx 2', 'Santa Jynx 1']
                    .findIndex((battle) => App.game.statistics.temporaryBattleDefeated[getTemporaryBattlesIndex(battle)]());
                return index > -1 ? currentGifts - startingAmounts[index] : 0;
            },
            () => {
                const goalAmounts = [150, 49, 27, 11];
                const startingAmounts = [50, 28, 12, 1];
                const index = ['Santa Jynx 4', 'Santa Jynx 3', 'Santa Jynx 2', 'Santa Jynx 1']
                    .findIndex((battle) => App.game.statistics.temporaryBattleDefeated[getTemporaryBattlesIndex(battle)]());
                return index > -1 ? goalAmounts[index] - startingAmounts[index] : 10;
            }, new MultiRequirement([
                new SpecialEventRequirement('Merry Christmas!'),
                new OneFromManyRequirement([
                    new TemporaryBattleRequirement('Santa Jynx 1'),
                    new TemporaryBattleRequirement('Santa Jynx 2'),
                    new TemporaryBattleRequirement('Santa Jynx 3'),
                    new TemporaryBattleRequirement('Santa Jynx 4'),
                ]),
            ]),
        ));

        //this.goals.push(new ItemGoal('get some leeks, yo', 'Leek', 1337, 0));
    }

    canAccess() { return true; }

    update() {}

    toJSON(): Record<string, any> {
        /*return {
            list: this.list().filter(g => g.hasProgress()).map(g => g.toJSON()),
        };*/
        return this.playerGoals().map((g) => g.toJSON());
    }

    fromJSON(json: Record<string, any>): void {
        if (json === null) {
            return;
        }

        /*json.forEach((goal) => {
            if (goal.type == 'ItemGoal') {
                this.playerGoals.push(new ItemGoal(goal.name, goal.itemName, goal.goalAmount, goal.progressAmount));
            }
        });*/
    }
}
