import {
    Computed, Observable,
} from 'knockout';
import Requirement from './requirements/Requirement';
import MultiRequirement from './requirements/MultiRequirement';
import OneFromManyRequirement from './requirements/OneFromManyRequirement';

export default class GoalTracker {
    public _name: Observable<string>;
    public current: Computed<number>;
    public goal: Computed<number>;
    startAmount: number;

    constructor(
        name: string,
        current: () => number,
        goal: () => number,
        private requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
        startAmount?: number,
    ) {
        this._name = ko.observable(name);
        //this.current = ko.isComputed(current) ? current : ko.pureComputed(current);
        this.current = ko.pureComputed(current);
        this.goal = ko.pureComputed(goal);

        this.startAmount = startAmount ?? this.current();
    }

    public isActive(): boolean {
        return this.requirement?.isCompleted() ?? true;
    }

    get name(): string {
        return this._name();
    }

    set name(value: string) {
        this._name(value);
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            startAmount: this.startAmount,
        };
    }
}
