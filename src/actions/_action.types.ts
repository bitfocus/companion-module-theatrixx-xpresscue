import { Type } from '@theatrixx/xpresscue-connect'
import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types'
import { createClassKeyDecorator } from '../utils/decorators'
import { ManagedInstance } from '../utils/manager.class'

export const ACTION_IDKEY = 'actionId'

export const ActionId = createClassKeyDecorator(ACTION_IDKEY)

export function getActionId(type: Type<Action>): string {
	return (type as any)[ACTION_IDKEY]
}

export interface Action extends ManagedInstance<CompanionAction> {
	handle(event: CompanionActionEvent): void
}
