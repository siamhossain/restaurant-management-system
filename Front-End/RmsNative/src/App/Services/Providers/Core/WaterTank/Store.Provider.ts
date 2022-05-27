import {EventEmitter} from 'events';
import {Dispatcher} from "@/App/Services/Providers/Core/WaterTank/Dispatcher.Provider";

export class StoreProvider extends EventEmitter {
    public CHANGE: string = "CHANGE_STORE_STATE"; //Event name
    protected actionTypes: any; // Action types for the store
    public initialState: any; // Initial value of the store
    public state: any; // Exported value of the store

    public constructor() {
        super();

        //Initiate the state with initialState
        this.state = this.initialState;

        //Register the dispatcher
        this.registerDispatcher();
    }

    /**
     * Adds the change event listener
     * @param callback {function}
     */
    public addChangeListener(callback: (state: any) => void): void {
        this.on(this.CHANGE, () => callback(this.getState()));
    }

    /**
     * Removes the change event listener
     * @param callback {function}
     */
    public removeChangeListener(callback: (state: any) => void): void {
        this.removeListener(this.CHANGE, () => callback(this.getState()));
    }

    /**
     * Fires the change event
     */
    public emitChange(): void {
        this.emit(this.CHANGE);
    }

    /**
     * Returns the state with it's correct type definitions
     */
    public getState<S = any>(): S {
        return this.state;
    }

    /**
     * Binds the actionTypes object in the constructor for avoiding bugs on dispatcher registration
     * @param actionTypes {object}
     * @private
     */
    public __bindActionTypes<STATE = any>(actionTypes: any): { state: STATE } {
        this.actionTypes = actionTypes;
        return {
            state: this.getState<STATE>(),
        };
    }

    /**
     * Reset the state with the initial state values
     */
    public resetState(): void {
        this.state = this.initialState;
        this.emitChange();
    }

    /**
     * Register the dispatcher for handling the events and action types
     * You can add conditions if need or override this method in your extended store
     */
    public registerDispatcher(): void {
        Dispatcher.register((action: any) => {
            switch (action.type) {
                case this.actionTypes.SET_STATE:
                    this.state = {
                        ...this.state,
                        ...action.payload,
                    };

                    this.emitChange();
                    break;

                default:
                    break
            }
        });
    }
}
