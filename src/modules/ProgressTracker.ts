import ProgressItem from './ProgressItem';
import { AchievementOption, ShadowStatus, getTemporaryBattlesIndex } from './GameConstants';
import TemporaryBattleRequirement from './requirements/TemporaryBattleRequirement';
import OneFromManyRequirement from './requirements/OneFromManyRequirement';
import MultiRequirement from './requirements/MultiRequirement';
import SpecialEventRequirement from './requirements/SpecialEventRequirement';
import ShadowPokemonRequirement from './requirements/ShadowPokemonRequirement';

export default class ProgressTracker {
    static trackerList: ProgressItem[];

    static initialize(): void {
        this.trackerList = [
            new ProgressItem('Purify Chamber - Flow',
                () => App.game.purifyChamber.currentFlow(),
                () => App.game.purifyChamber.flowNeeded(),
                new ShadowPokemonRequirement(131, ShadowStatus.Purified, AchievementOption.less),
            ),
            new ProgressItem('Daily Christmas Presents',
                () => {
                    const currentGifts = player.itemList.Christmas_present();
                    const startingAmounts = [50, 28, 12, 1];
                    const battles = ['Santa Jynx 4', 'Santa Jynx 3', 'Santa Jynx 2', 'Santa Jynx 1'];
                    const index = battles.findIndex((battle) => App.game.statistics.temporaryBattleDefeated[getTemporaryBattlesIndex(battle)]());
                    return index > -1 ? currentGifts - startingAmounts[index] : 0;
                },
                () => {
                    const goalAmounts = [150, 49, 27, 11];
                    const startingAmounts = [50, 28, 12, 1];
                    const battles = ['Santa Jynx 4', 'Santa Jynx 3', 'Santa Jynx 2', 'Santa Jynx 1'];
                    const index = battles.findIndex((battle) => App.game.statistics.temporaryBattleDefeated[getTemporaryBattlesIndex(battle)]());
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
            ),
        ];
    }
}
