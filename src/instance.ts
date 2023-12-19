import { InstanceBase, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { ActionManager } from './actions/_action.manager'
import { ConfigFieldsFactory, PlayerConfig } from './config'
import { FeedbackManager } from './feedbacks/_feedback.manager'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ConnectionState, Player } from '@theatrixx/xpresscue-connect'
import { PresetManager } from './presets/_preset.manager'
import { VariableManager } from './variables/_variable.manager'

export class PlayerInstance extends InstanceBase<PlayerConfig> {
	private config: PlayerConfig = { host: '', port: 0 }
	private player = new Player()
	private destroy$ = new Subject<void>()

	private actions = new ActionManager(this.player)
	private feedbacks = new FeedbackManager(this.player)
	private presets = new PresetManager(this.player)
	private variables = new VariableManager(this.player)

	constructor(internal: unknown) {
		super(internal)

		this.setupListeners()
	}

	async init(config: PlayerConfig): Promise<void> {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)
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

	async destroy(): Promise<void> {
		this.player.destroy()
		this.destroy$.next()
	}

	async configUpdated(newConfig: PlayerConfig): Promise<void> {
		this.player.disconnect()
		this.player.connect(newConfig.host, newConfig.port)
		this.config = newConfig
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return ConfigFieldsFactory()
	}

	private setupListeners(): void {
		this.player.client.connectionStateChanges.pipe(takeUntil(this.destroy$)).subscribe((state) => {
			switch (state) {
				case ConnectionState.OK:
					this.updateStatus(InstanceStatus.Ok)
					break
				case ConnectionState.WARNING:
					this.updateStatus(InstanceStatus.UnknownWarning)
					break
				case ConnectionState.ERROR:
				default:
					this.updateStatus(InstanceStatus.UnknownError)
					break
			}
		})
		this.actions.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.refreshActions())
		this.feedbacks.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.defineFeedbacks())
		this.feedbacks.checkFeedback$.pipe(takeUntil(this.destroy$)).subscribe((id) => this.checkFeedbacks(id))
		this.presets.refresh$.pipe(takeUntil(this.destroy$)).subscribe(() => this.definePresets())
		this.variables.update$
			.pipe(takeUntil(this.destroy$))
			.subscribe(([id, value]) => this.setVariableValues({ [id]: value }))
	}

	private refreshActions(): void {
		const actions = this.actions.get()
		this.setActionDefinitions(actions)
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
