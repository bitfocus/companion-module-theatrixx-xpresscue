import { Player, Type } from '@theatrixx/xpresscue-connect'
import { Feedback, FEEDBACK_IDKEY } from './_feedback.types'
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
import { merge, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { MediaThumbnailFeedback } from './media-thumbnail.feedback'
import { CompanionFeedbackDefinition } from '@companion-module/base'

const ALL_FEEDBACKS: Type<Feedback>[] = [
	PlayStateFeedback,
	TimeRemainingFeedback,
	OutputModeFeedback,
	PlayModeFeedback,
	MultiDeviceModeFeedback,
	MediaNameFeedback,
	MediaThumbnailFeedback,
	MediaStateFeedback,
	PlaylistNameFeedback,
	DeviceBusyFeedback,
]

export class FeedbackManager extends Manager<CompanionFeedbackDefinition, Feedback> {
	protected _checkFeedback$ = new Subject<string>()

	constructor(protected readonly player: Player) {
		super(player, FEEDBACK_IDKEY)
		this.initialize(ALL_FEEDBACKS)
	}

	get checkFeedback$(): Observable<string> {
		return this._checkFeedback$.asObservable()
	}

	protected initialize(types: Type<Feedback>[]): void {
		super.initialize(types)
		const feedbackObs: Observable<string>[] = []
		for (const [idKey, instance] of this.instances) {
			this.instances.set(idKey, instance)
			if (instance.selectCheckFeedback) {
				const obs = instance.selectCheckFeedback().pipe(map(() => idKey))
				feedbackObs.push(obs)
			}
		}

		/** Create a combined refresh request */
		merge(...feedbackObs).subscribe((ids) => this._checkFeedback$.next(ids))
	}
}
