import React from 'react';

interface IViewState {
    grid: {
        rows_per_page: number,
        current_page: number,
        total_pages: number,
        prev_page: number,
        next_page: number,
        first_page: number,
        last_page: number,

        filter: {}
    },
    form: {},
    view: {},
    additional: {}
}

class View<P, S> extends React.Component<P, IViewState & S> {
    initialState: IViewState & S;

    constructor(props: P) {
        super(props);

        this.initialState = this.state;

        this.paginateController = this.paginateController.bind(this);
        this.navigateToFirstPage = this.navigateToFirstPage.bind(this);
        this.navigateToPrevPage = this.navigateToPrevPage.bind(this);
        this.navigateToNextPage = this.navigateToNextPage.bind(this);
        this.navigateToLastPage = this.navigateToLastPage.bind(this);
        this.pageNavigationDisabled = this.pageNavigationDisabled.bind(this);
        this.setPaginationData = this.setPaginationData.bind(this);
        this.setGridState = this.setGridState.bind(this);
        this.setGridFilterState = this.setGridFilterState.bind(this);
        this.setFormState = this.setFormState.bind(this);
        this.setViewState = this.setViewState.bind(this);
        this.setAdditionalState = this.setAdditionalState.bind(this);
        this.resetGridState = this.resetGridState.bind(this);
        this.resetGridState = this.resetGridFilterState.bind(this);
        this.resetFormState = this.resetFormState.bind(this);
        this.resetViewState = this.resetViewState.bind(this);
        this.resetAdditionalState = this.resetAdditionalState.bind(this);
    }

    public paginateController(dataFetcher: (() => void) | undefined = undefined) {
        if (this.state.grid.current_page < 1 || this.state.grid.current_page > this.state.grid.total_pages) {
            this.setState((state) => ({
                grid: {
                    ...state.grid,
                    current_page: 1,
                }
            }), () => {
                if (typeof dataFetcher !== "undefined" && typeof dataFetcher === "function") {
                    dataFetcher();
                }
            });

            return;
        }

        if (typeof dataFetcher !== "undefined" && typeof dataFetcher === "function") {
            dataFetcher();
        }
    }

    public navigateToFirstPage(): void {
        this.setState((state) => ({
            grid: {
                ...state.grid,
                current_page: 1,
            }
        }), () => {
            this.paginateController();
        });
    }

    public navigateToPrevPage(): void {
        this.setState((state) => ({
            grid: {
                ...state.grid,
                current_page: state.grid.prev_page,
            }
        }), () => {
            this.paginateController();
        });
    }

    public navigateToNextPage(): void {
        this.setState((state) => ({
            grid: {
                ...state.grid,
                current_page: state.grid.next_page,
            }
        }), () => {
            this.paginateController();
        });
    }

    public navigateToLastPage(): void {
        this.setState((state) => ({
            grid: {
                ...state.grid,
                current_page: state.grid.last_page,
            }
        }), () => {
            this.paginateController();
        });
    }

    public setPaginationData(total_pages: number, prev_page: number, next_page: number, last_page: number): void {
        this.setState((state) => ({
            grid: {
                ...state.grid,
                total_pages,
                prev_page,
                next_page,
                last_page,
            }
        }));
    }

    public pageNavigationDisabled(): { firstPage: boolean, prevPage: boolean, nextPage: boolean, lastPage: boolean, } {
        return {
            firstPage: this.state.grid.current_page === 1,
            prevPage: this.state.grid.current_page === 1,
            nextPage: this.state.grid.current_page >= this.state.grid.total_pages,
            lastPage: this.state.grid.current_page >= this.state.grid.total_pages,
        }
    }

    public setGridState(state: { [k in keyof (IViewState & S)['grid']]?: (IViewState & S)['grid'][k] }, callback: undefined | (() => void) = undefined): void {
        this.setState((_state) => ({
            grid: {
                ..._state.grid,
                ...state,
            }
        }), callback);
    }

    public setGridFilterState(state: { [k in keyof (IViewState & S)['grid']['filter']]?: (IViewState & S)['grid']['filter'][k] }, callback: undefined | (() => void) = undefined): void {
        this.setState((_state) => ({
            grid: {
                ..._state.grid,
                filter: {
                    ..._state.grid.filter,
                    ...state,
                }
            }
        }), callback);
    }

    public setFormState(state: { [k in keyof (IViewState & S)['form']]?: (IViewState & S)['form'][k] }, callback: undefined | (() => void) = undefined): void {
        this.setState((_state) => ({
            form: {
                ..._state.form,
                ...state,
            }
        }), callback);
    }

    public setViewState(state: { [k in keyof (IViewState & S)['view']]?: (IViewState & S)['view'][k] }, callback: undefined | (() => void) = undefined): void {
        this.setState((_state) => ({
            view: {
                ..._state.view,
                ...state,
            }
        }), callback);
    }

    public setAdditionalState(state: { [k in keyof (IViewState & S)['additional']]?: (IViewState & S)['additional'][k] }, callback: undefined | (() => void) = undefined): void {
        this.setState((_state) => ({
            additional: {
                ..._state.additional,
                ...state,
            }
        }), callback);
    }

    public resetGridFilterState(callback: undefined | (() => void) = undefined): void {
        this.setState((state) => ({
            ...state,
            grid: {
                ...state.grid,
                filter: this.initialState.grid.filter,
            },
        }), callback);
    }

    public resetGridState(callback: undefined | (() => void) = undefined): void {
        this.setState((state) => ({
            ...state,
            grid: this.initialState.grid,
        }), callback);
    }

    public resetFormState(callback: undefined | (() => void) = undefined): void {
        this.setState((state) => ({
            ...state,
            form: this.initialState.form,
        }), callback);
    }

    public resetViewState(callback: undefined | (() => void) = undefined): void {
        this.setState((state) => ({
            ...state,
            view: this.initialState.view,
        }), callback);
    }

    public resetAdditionalState(callback: undefined | (() => void) = undefined): void {
        this.setState((state) => ({
            ...state,
            additional: this.initialState.additional,
        }), callback);
    }

}

export default View;
