import {
    Computed as KnockoutComputed,
} from 'knockout';
import Requirement from './requirements/Requirement';
import MultiRequirement from './requirements/MultiRequirement';
import OneFromManyRequirement from './requirements/OneFromManyRequirement';

export default class ProgessItem {
    public current: KnockoutComputed<number>;
    public goal: KnockoutComputed<number>;
    public progressText: KnockoutComputed<string>;
    public progressPercent: KnockoutComputed<number>;

    constructor(
        public name: string,
        current: () => number,
        goal: () => number,
        private visibleRequirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    ) {
        this.current = ko.pureComputed(current);
        this.goal = ko.pureComputed(goal);

        this.progressText = ko.pureComputed((): string => {
            return `${Math.min(this.current(), this.goal()).toLocaleString('en-US')} / ${this.goal().toLocaleString('en-US')}`;
        });

        this.progressPercent = ko.pureComputed((): number => {
            const progress = Math.min(this.current() / this.goal(), 1);
            return Math.floor(progress * 100) / 100;
        });
    }

    public isActive(): boolean {
        return this.visibleRequirement?.isCompleted() ?? true;
    }
}
