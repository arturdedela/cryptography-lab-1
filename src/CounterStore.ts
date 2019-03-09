import {observable, action} from "mobx";
import { provide } from './IoC';

@provide.singleton()
export class CounterStore {
    @observable counter: number = 0;

    @action.bound
    increment() {
        this.counter++;
    }
}