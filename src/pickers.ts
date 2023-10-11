import { CompanionInputFieldDropdown, CompanionInputFieldNumber, DropdownChoice } from '../../../instance_skel_types'
import { MediaFileStore, Player, PlaylistStore, SimpleEntity, TestPatternStore } from '@theatrixx/xpresscue-connect'

export function MediaPicker(player: Player): CompanionInputFieldDropdown {
	return {
		id: 'mediaId',
		label: 'Choose Media',
		type: 'dropdown',
		default: '',
		choices: getDropdown(player.state.get(MediaFileStore)),
		minChoicesForSearch: 0,
	}
}

export function PlaylistPicker(player: Player): CompanionInputFieldDropdown {
	return {
		id: 'playlistId',
		label: 'Choose Playlist',
		type: 'dropdown',
		default: '',
		choices: getDropdown(player.state.get(PlaylistStore)),
		minChoicesForSearch: 0,
	}
}

export function TestPatternPicker(player: Player): CompanionInputFieldDropdown {
	const patterns = player.state.get(TestPatternStore)
	const choices = patterns.map((m) => ({ id: m._id, label: m._id }))
	return {
		id: 'patternId',
		label: 'Choose Test Pattern',
		type: 'dropdown',
		default: '',
		choices,
		minChoicesForSearch: 0,
	}
}

export function TimePicker(id = 'time', label = 'Time (seconds)'): CompanionInputFieldNumber {
	return {
		id,
		label,
		type: 'number',
		min: 0,
		max: 99999999,
		default: 10,
	}
}

export function PercentPicker(id = 'value', label = 'Value (%)'): CompanionInputFieldNumber {
	return {
		id,
		label,
		type: 'number',
		min: 0,
		max: 100,
		default: 50,
		range: true,
	}
}

export function VideoOutputModePicker(): CompanionInputFieldDropdown {
	return {
		id: 'videoOutputMode',
		label: 'Choose Video Output Mode',
		type: 'dropdown',
		default: 'normal',
		choices: [
			{ id: 'normal', label: 'Normal' },
			{ id: 'test', label: 'Test Pattern' },
			{ id: 'identity', label: 'Identity' },
			{ id: 'blackout', label: 'Blackout' },
		],
	}
}

export function PlayModePicker(): CompanionInputFieldDropdown {
	return {
		id: 'playMode',
		label: 'Choose Play Mode',
		type: 'dropdown',
		default: 'playlist',
		choices: [
			{ id: 'playlist', label: 'Playlist' },
			{ id: 'abpreset', label: 'A/B Preset' },
			{ id: 'direct', label: 'Direct' },
		],
	}
}

export function MultiDeviceModePicker(): CompanionInputFieldDropdown {
	return {
		id: 'multiDeviceMode',
		label: 'Choose Multi-Device Mode',
		type: 'dropdown',
		default: 'master',
		choices: [
			{ id: 'master', label: 'Master' },
			{ id: 'follower', label: 'Follower' },
		],
	}
}

function getDropdown<T extends SimpleEntity>(entities: T[]): DropdownChoice[] {
	return entities.sort(sortAlpha).map((m) => ({ id: m._id, label: m.name }))
}

function sortAlpha<T extends SimpleEntity>(a: T, b: T): -1 | 1 | 0 {
	if (a.name < b.name) {
		return -1
	}
	if (a.name > b.name) {
		return 1
	}
	return 0
}
