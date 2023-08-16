import { useRecallFormState } from '../states/recall-form-state';

export class RecallFromState {
    private static _instance: RecallFromState;

    public setFormClosed(): void {
        useRecallFormState.getState().setFormClosed(true);
    }

    public static get instance(): RecallFromState {
        if (!RecallFromState._instance) {
            RecallFromState._instance = new RecallFromState();
        }
        return RecallFromState._instance;
    }
}
