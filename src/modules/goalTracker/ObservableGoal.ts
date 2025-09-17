import { Observable } from 'knockout';
import GameHelper from '../GameHelper';
import Goal from './Goal';
import { GoalType } from './GoalType';

export default abstract class ObservableGoal extends Goal {
    private _goalAmount: Observable<number>;
    private _progressAmount: Observable<number>;
    private _controlAmount: number;
    private _trackedSub: KnockoutSubscription;

    constructor(
        name: string,
        type: GoalType,
        //private trackedObservable: Observable<number>,
        //goalAmount: number,
        //startAmount?: number,
    ) {
        super(name, type);

        //this._goalAmount = ko.observable(goalAmount);
        //this._progressAmount = ko.observable(startAmount ?? trackedObservable());
        //this._controlAmount = trackedObservable();

        /*this._trackedSub = trackedObservable.subscribe((amount) => {
            if (amount > this._controlAmount) {
                GameHelper.incrementObservable(this._progressAmount, amount - this._controlAmount);
            }
            this._controlAmount = amount;
        });*/
    }

    //abstract getTrackedObservable(): Observable<number>;
    abstract getObservable(): Observable<number>;

    /*public startTracking(): void {


        this.trackedSub?.dispose();
        this.trackedSub = this.getTrackedObservable().subscribe((amount) => {
            if (amount > this.controlAmount) {
                GameHelper.incrementObservable(this._progressAmount, amount - this.controlAmount);
            }
            this.controlAmount = amount;
        });
    }*/

    /*protected setupSubscriber(): void {
        this.trackedSub?.dispose();
        this.trackedSub = this.getTrackedObservable().subscribe((amount) => {
            if (amount > this.controlAmount) {
                GameHelper.incrementObservable(this._progressAmount, amount - this.controlAmount);
            }
            this.controlAmount = amount;
        });
    }*/

    progressText(): string {
        return `${this.progressAmount.toLocaleString('en-US')} / ${this.goalAmount.toLocaleString('en-US')}`;
    }

    progressPercent(): number {
        return Math.floor((this.progressAmount / this.goalAmount) * 100) / 100;
    }

    get goalAmount(): number {
        return this._goalAmount();
    }

    set goalAmount(value: number) {
        this._goalAmount(value);
    }

    get progressAmount(): number {
        return this._progressAmount();
    }

    set progressAmount(value: number) {
        this._progressAmount(value);
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json.progressAmount = this.progressAmount;
        json.goalAmount = this.goalAmount;
        return json;
    }
}
