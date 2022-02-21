import { Player, Type } from '@theatrixx/xpresscue-connect';
import { Feedback, FEEDBACK_IDKEY } from './_feedback.types';
import { CompanionFeedback } from '../../../../instance_skel_types';
import { PlayStateFeedback } from './play-state.feedback';
import { TimeRemainingFeedback } from './time-remaining.feedback';
import { Manager } from '../utils/manager.class';

const ALL_FEEDBACKS: Type<Feedback>[] = [
  PlayStateFeedback,
  TimeRemainingFeedback
];

export class FeedbackManager extends Manager<CompanionFeedback, Feedback> {

  constructor(
    protected readonly player: Player) {
      super(player, FEEDBACK_IDKEY);
      this.initialize(ALL_FEEDBACKS);
  }
}

