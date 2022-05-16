import InstanceSkel = require('../../../instance_skel')

import { CompanionActionEvent, CompanionConfigField, CompanionSystem } from '../../../instance_skel_types'
import { ActionManager } from './actions/_action.manager'
import { ConfigFieldsFactory, PlayerConfig } from './config'
import { FeedbackManager } from './feedbacks/_feedback.manager'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { Player } from '@theatrixx/xpresscue-connect'
import { PresetManager } from './presets/_preset.manager'
import { VariableManager } from './variables/_variable.manager'

export class PlayerInstance extends InstanceSkel<PlayerConfig> {
	private player = new Player()
	private destroy$ = new Subject<void>()

	private actions = new ActionManager(this.player)
	private feedbacks = new FeedbackManager(this.player)
	private presets = new PresetManager(this.player)
	private variables = new VariableManager(this.player)

	constructor(system: CompanionSystem, id: string, config: PlayerConfig) {
		super(system, id, config)
		this.setupListeners()
	}

	init(): void {
		this.status(this.STATUS_ERROR)
		this.player
			.connect(this.config.host, this.config.port)
			.then(() => {
				this.refreshActions()
				this.defineFeedbacks()
				this.definePresets()
				this.defineVariables()
			})
			.catch((e) => {
				console.error(`Error connecting to device!`, e)
			})
	}

	destroy(): void {
		this.player.destroy()
		this.destroy$.next()
	}

	updateConfig(newConfig: PlayerConfig): void {
		this.player.disconnect()
		this.player.connect(newConfig.host, newConfig.port)
		this.config = newConfig
	}

	action(event: CompanionActionEvent): void {
		this.actions.handle(event)
	}

	config_fields(): CompanionConfigField[] {
		return ConfigFieldsFactory(this)
	}

	private setupListeners(): void {
		this.player.client.connectionStateChanges.pipe(takeUntil(this.destroy$)).subscribe((state) => this.status(state))
		this.actions.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.refreshActions())
		this.feedbacks.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.defineFeedbacks())
		this.feedbacks.checkFeedback$.pipe(takeUntil(this.destroy$)).subscribe((id) => this.checkFeedbacks(id))
		this.presets.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.definePresets())
		this.variables.update$.pipe(takeUntil(this.destroy$)).subscribe(([id, value]) => this.setVariable(id, value))
	}

	private refreshActions(): void {
		const actions = this.actions.get()
		this.setActions(actions)
	}

	private defineFeedbacks(): void {
		const feedbacks = this.feedbacks.get()
		this.setFeedbackDefinitions(feedbacks)
		this.checkFeedbacks()
	}

	private definePresets(): void {
		const presets = this.presets.getFlat()
		this.setPresetDefinitions(presets)
	}

	private defineVariables(): void {
		const variables = this.variables.getFlat()
		this.setVariableDefinitions(variables)
	}
}
