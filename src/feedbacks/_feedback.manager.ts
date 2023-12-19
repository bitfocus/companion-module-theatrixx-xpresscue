import { CompanionFeedbackDefinition } from '@companion-module/base'
import { Player, Type } from '@theatrixx/xpresscue-connect'
import { Feedback, FEEDBACK_IDKEY } from './_feedback.types.js'
import { PlayStateFeedback } from './play-state.feedback.js'
import { TimeRemainingFeedback } from './time-remaining.feedback.js'
import { Manager } from '../utils/manager.class.js'
import { OutputModeFeedback } from './output-mode.feedback.js'
import { PlayModeFeedback } from './play-mode.feedback.js'
import { MultiDeviceModeFeedback } from './multidevice-mode.feedback.js'
import { MediaNameFeedback } from './media-name.feedback.js'
import { MediaStateFeedback } from './media-state.feedback.js'
import { PlaylistNameFeedback } from './playlist-name.feedback.js'
import { DeviceBusyFeedback } from './device-busy.feedback.js'
import { merge, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators/index.js'
import { MediaThumbnailFeedback } from './media-thumbnail.feedback.js'

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
