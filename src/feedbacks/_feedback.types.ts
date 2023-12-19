import { CompanionFeedbackDefinition, CompanionPresetFeedback } from '@companion-module/base'
import { createClassKeyDecorator } from '../utils/decorators.js'
import { ManagedInstance } from '../utils/manager.class.js'
import { Type } from '@theatrixx/xpresscue-connect'
import { Observable } from 'rxjs'

export const FEEDBACK_IDKEY = 'feedbackId'

export const FeedbackId = createClassKeyDecorator(FEEDBACK_IDKEY)

export function getFeedbackId(type: Type<Feedback>): string {
	return (type as any)[FEEDBACK_IDKEY]
}

export interface Feedback extends ManagedInstance<CompanionFeedbackDefinition> {
	/**
	 * Should return an Observable that will emit whenever the feedback
	 * needs to be `checked` (indicating a state change)
	 * */
	selectCheckFeedback(): Observable<string>
}

export type FeedbackPreset = CompanionPresetFeedback
