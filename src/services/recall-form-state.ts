import { useRecallFormState } from '../states/recall-form-state';

export class RecallFromState {
    private static _instance: RecallFromState;

    public static get instance(): RecallFromState {
        if (!RecallFromState._instance) {
            RecallFromState._instance = new RecallFromState();
        }
        return RecallFromState._instance;
    }

    public get formState(): boolean {
        return useRecallFormState.getState().formState;
    }

    public setFormClosed(): void {
        useRecallFormState.getState().setFormClosed(true);
    }
}
