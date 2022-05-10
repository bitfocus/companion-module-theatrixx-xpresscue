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
import { merge, Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'

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
	protected _checkFeedback$ = new Subject<string>()

	constructor(protected readonly player: Player) {
		super(player, FEEDBACK_IDKEY)
		this.initialize(ALL_FEEDBACKS)
	}

	get checkFeedback$(): Observable<string> {
		return this._checkFeedback$.asObservable()
	}

	protected initialize(types: Type<Feedback>[]): void {
		const feedbackObs: Observable<string>[] = []
		/** Initialize instances */
		for (const type of types) {
			const instance = new type(this.player)
			const idKey = this.getIdKey(type)
			this.instances.set(idKey, instance)
			if (instance.selectCheckFeedback) {
				const obs = instance.selectCheckFeedback().pipe(map(() => idKey))
				feedbackObs.push(obs)
			}
		}

		/** Create a combined refresh request */
		merge(...feedbackObs).subscribe((ids) => this._checkFeedback$.next(ids))

		super.initialize(types)
	}
}
