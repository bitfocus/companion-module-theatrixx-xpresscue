import { createClassKeyDecorator } from '../utils/decorators'
import { CompanionFeedback, CompanionPreset } from '../../../../instance_skel_types'
import { ManagedInstance } from '../utils/manager.class'
import { Type } from '@theatrixx/xpresscue-connect'

export const FEEDBACK_IDKEY = 'feedbackId'

export const FeedbackId = createClassKeyDecorator(FEEDBACK_IDKEY)

export function getFeedbackId(type: Type<Feedback>): string {
	return (type as any)[FEEDBACK_IDKEY]
}

export interface Feedback extends ManagedInstance<CompanionFeedback> {}

export type FeedbackPreset = CompanionPreset['feedbacks'][0]
