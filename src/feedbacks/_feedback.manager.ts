import { Player, Type } from '@theatrixx/xpresscue-connect'
import { Feedback, FEEDBACK_IDKEY } from './_feedback.types'
import { CompanionFeedback } from '../../../../instance_skel_types'
import { PlayStateFeedback } from './play-state.feedback'
import { TimeRemainingFeedback } from './time-remaining.feedback'
import { Manager } from '../utils/manager.class'
import { OutputModeFeedback } from './output-mode.feedback'
import { PlayModeFeedback } from './play-mode.feedback'
import { MultiDeviceModeFeedback } from './multidevice-mode.feedback'
import { MediaNameFeedback } from './media-name.feedback'
import { MediaStateFeedback } from './media-state.feedback'
import { PlaylistNameFeedback } from './playlist-name.feedback'
import { DeviceBusyFeedback } from './device-busy.feedback'

const ALL_FEEDBACKS: Type<Feedback>[] = [
	PlayStateFeedback,
	TimeRemainingFeedback,
	OutputModeFeedback,
	PlayModeFeedback,
	MultiDeviceModeFeedback,
	MediaNameFeedback,
	MediaStateFeedback,
	PlaylistNameFeedback,
	DeviceBusyFeedback,
]

export class FeedbackManager extends Manager<CompanionFeedback, Feedback> {
	constructor(protected readonly player: Player) {
		super(player, FEEDBACK_IDKEY)
		this.initialize(ALL_FEEDBACKS)
	}
}
