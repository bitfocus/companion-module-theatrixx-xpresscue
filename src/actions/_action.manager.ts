import { Player, Type } from '@theatrixx/xpresscue-connect'
import { Action, ACTION_IDKEY } from './_action.types'

import { LoadPlaylistAction } from './load-playlist.action'
import { PlayStateAction } from './play-state.action'
import { SetNextMediaAction } from './set-next-media.action'
import { TakeAction } from './take.action'
import { SetTestPatternAction } from './test-pattern.action'
import { Manager } from '../utils/manager.class'
import { IdentifyAction } from './identify.action'
import { NextFrameAction } from './next-frame.action'
import { SetOutputModeAction } from './set-output-mode.action'
import { SetPlayModeAction } from './set-play-mode.action'
import { SetMultiDeviceModeAction } from './set-multidevice-mode.action'
import { JumpPlaybackAction } from './jump-playback.action'
import { SetVolumeAction } from './set-volume.action'
import { SetIntensityAction } from './set-intensity.action'
import { QueueSkipAction } from './queue-skip.action'
import { QueueClearAction } from './queue-clear.action'
import { CompanionActionDefinition } from '@companion-module/base'

const ALL_ACTIONS: Type<Action>[] = [
	PlayStateAction,
	TakeAction,
	SetNextMediaAction,
	LoadPlaylistAction,
	SetTestPatternAction,
	IdentifyAction,
	NextFrameAction,
	SetOutputModeAction,
	SetPlayModeAction,
	SetMultiDeviceModeAction,
	JumpPlaybackAction,
	SetVolumeAction,
	SetIntensityAction,
	QueueSkipAction,
	QueueClearAction,
]

export class ActionManager extends Manager<CompanionActionDefinition, Action> {
	constructor(protected readonly player: Player) {
		super(player, ACTION_IDKEY)
		this.initialize(ALL_ACTIONS)
	}
}
