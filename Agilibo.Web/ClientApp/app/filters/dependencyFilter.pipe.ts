import { Pipe, PipeTransform } from '@angular/core';
import { UserStoryDepency } from '../models/crossteamdependency';  

@Pipe({
    name: 'dependencyVerticalfilter',
})
export class DependencyVerticalPipe implements PipeTransform {
    transform(items: UserStoryDepency[]) {
        return items.filter(item => item.direction === 1
            || item.direction === 2
            || item.direction === 4);
    }
}

@Pipe({
    name: 'dependencyHorizontalfilter',
})
export class DependencyHorizontalPipe implements PipeTransform {
    transform(items: UserStoryDepency[]) {       
        return items.filter(item => item.direction === 3 || item.direction === 5);
    }
}