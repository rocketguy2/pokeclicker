import {
    Observable,
} from 'knockout';
import Requirement from '../requirements/Requirement';
import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import { GoalType } from './GoalType';

export default abstract class Goal {
    private _name: Observable<string>;
    private _type: GoalType;

    constructor(
        name: string,
        type: GoalType,
        private requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    ) {
        this._name = ko.observable(name);
        this._type = type;
    }

    abstract progressText(): string;
    abstract progressPercent(): number;

    public isActive(): boolean {
        return this.requirement?.isCompleted() ?? true;
    }

    get name(): string {
        return this._name();
    }

    set name(value: string) {
        this._name(value);
    }

    get type(): GoalType {
        return this._type;
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            type: this.type,
        };
    }
}
