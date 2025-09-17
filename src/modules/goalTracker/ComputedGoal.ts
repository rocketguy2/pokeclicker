import { Computed } from 'knockout';
import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';
import Goal from './Goal';
import { GoalType } from './GoalType';


export default class ComputedGoal extends Goal {
    private current: Computed<number>;
    private goal: Computed<number>;

    constructor(
        name: string,
        current: () => number,
        goal: () => number,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    ) {
        super(name, GoalType.Computed, requirement);
        this.current = ko.pureComputed(current);
        this.goal = ko.pureComputed(goal);
    }

    progressText(): string {
        //return `${Math.min(this.current(), this.goal()).toLocaleString('en-US')} / ${this.goal().toLocaleString('en-US')}`;
        return `${this.current().toLocaleString('en-US')} / ${this.goal().toLocaleString('en-US')}`;
    }

    progressPercent(): number {
        return Math.floor((this.current() / this.goal()) * 100) / 100;
    }
}
