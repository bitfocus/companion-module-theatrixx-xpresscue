import { rgb } from './utils/colors'

export const Colors = {
	BLACK: rgb(0, 0, 0),
	WHITE: rgb(255, 255, 255),
	GREY: rgb(80, 80, 80),
	RED: rgb(255, 0, 0),
	GREEN: rgb(0, 172, 0),
	BLUE: rgb(0, 0, 255),
	ORANGE: rgb(255, 80, 0),
}

/**
 * Temporary hack to get proper TypeScript support for built-in Base64 icons (and so that
 * we don't have to import `InstanceSkel` everywhere) */
const CompanionIcons = require('../../../lib/resources/icons') as {
	ICON_POWER_UNKNOWN: string
	ICON_POWER_ON: string
	ICON_POWER_OFF: string
	ICON_FWD_ACTIVE: string
	ICON_FWD_INACTIVE: string
	ICON_REW_ACTIVE: string
	ICON_REW_INACTIVE: string
	ICON_REC_ACTIVE: string
	ICON_REC_INACTIVE: string
	ICON_STOP_INACTIVE: string
	ICON_STOP_ACTIVE: string
	ICON_PAUSE_INACTIVE: string
	ICON_PAUSE_ACTIVE: string
	ICON_PLAY_INACTIVE: string
	ICON_PLAY_ACTIVE: string
	ICON_UP: string
	ICON_DOWN: string
	ICON_LEFT: string
	ICON_RIGHT: string
	ICON_UP_RIGHT: string
	ICON_DOWN_RIGHT: string
	ICON_UP_LEFT: string
	ICON_DOWN_LEFT: string
}

export { CompanionIcons }
