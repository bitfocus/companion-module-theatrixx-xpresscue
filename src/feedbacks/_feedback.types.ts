import { createClassKeyDecorator } from '../utils/decorators';
import { CompanionFeedback } from '../../../../instance_skel_types';
import { ManagedInstance } from '../utils/manager.class';

export const FEEDBACK_IDKEY = 'feedbackId';

export const FeedbackId = createClassKeyDecorator(FEEDBACK_IDKEY);

export interface Feedback extends ManagedInstance<CompanionFeedback> {}
