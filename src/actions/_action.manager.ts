import { CompanionActionDefinition } from '@companion-module/base'
import type { Player, Type } from '@theatrixx/xpresscue-connect'
import { Action, ACTION_IDKEY } from './_action.types.js'

import { LoadPlaylistAction } from './load-playlist.action.js'
import { PlayStateAction } from './play-state.action.js'
import { SetNextMediaAction } from './set-next-media.action.js'
import { TakeAction } from './take.action.js'
import { SetTestPatternAction } from './test-pattern.action.js'
import { Manager } from '../utils/manager.class.js'
import { IdentifyAction } from './identify.action.js'
import { NextFrameAction } from './next-frame.action.js'
import { SetOutputModeAction } from './set-output-mode.action.js'
import { SetPlayModeAction } from './set-play-mode.action.js'
import { SetMultiDeviceModeAction } from './set-multidevice-mode.action.js'
import { JumpPlaybackAction } from './jump-playback.action.js'
import { SetVolumeAction } from './set-volume.action.js'
import { SetIntensityAction } from './set-intensity.action.js'
import { QueueSkipAction } from './queue-skip.action.js'
import { QueueClearAction } from './queue-clear.action.js'

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
