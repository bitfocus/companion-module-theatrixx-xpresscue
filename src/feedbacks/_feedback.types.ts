import { createClassKeyDecorator } from '../utils/decorators'
import { CompanionFeedback, CompanionPreset } from '../../../../instance_skel_types'
import { ManagedInstance } from '../utils/manager.class'
import { Type } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'

export const FEEDBACK_IDKEY = 'feedbackId'

export const FeedbackId = createClassKeyDecorator(FEEDBACK_IDKEY)

export function getFeedbackId(type: Type<Feedback>): string {
	return (type as any)[FEEDBACK_IDKEY]
}

export interface Feedback extends ManagedInstance<CompanionFeedback> {
	/**
	 * Should return an Observable that will emit whenever the feedback
	 * needs to be `checked` (indicating a state change)
	 * */
	selectCheckFeedback(): Observable<string>
}

export type FeedbackPreset = CompanionPreset['feedbacks'][0]
