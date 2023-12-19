import type { CompanionActionDefinition, CompanionPresetAction } from '@companion-module/base'
import type { Type } from '@theatrixx/xpresscue-connect'
import { createClassKeyDecorator } from '../utils/decorators.js'
import type { ManagedInstance } from '../utils/manager.class.js'

export const ACTION_IDKEY = 'actionId'

export const ActionId = createClassKeyDecorator(ACTION_IDKEY)

export function getActionId(type: Type<Action>): string {
	return (type as any)[ACTION_IDKEY]
}

export interface Action extends ManagedInstance<CompanionActionDefinition> {}

export type ActionPreset = CompanionPresetAction
