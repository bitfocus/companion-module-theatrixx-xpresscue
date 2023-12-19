import { Type } from '@theatrixx/xpresscue-connect'
import { createClassKeyDecorator } from '../utils/decorators'
import { ManagedInstance } from '../utils/manager.class'
import { CompanionActionDefinition, CompanionPresetAction } from '@companion-module/base'

export const ACTION_IDKEY = 'actionId'

export const ActionId = createClassKeyDecorator(ACTION_IDKEY)

export function getActionId(type: Type<Action>): string {
	return (type as any)[ACTION_IDKEY]
}

export interface Action extends ManagedInstance<CompanionActionDefinition> {}

export type ActionPreset = CompanionPresetAction
