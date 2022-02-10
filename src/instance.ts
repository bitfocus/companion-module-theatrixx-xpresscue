import InstanceSkel = require('../../../instance_skel')
import { CompanionActionEvent, CompanionConfigField, CompanionSystem } from '../../../instance_skel_types';
import { ActionManager } from './actions/_action.manager';
import { getConfigInputFields, PlayerConfig } from './config';
import { FeedbackManager } from './feedbacks/_feedback.manager';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Player } from '@theatrixx/player-connection';

export class PlayerInstance extends InstanceSkel<PlayerConfig> {

  private player = new Player();
  private destroy$ = new Subject<void>();

  private actions = new ActionManager(this.player);
  private feedbacks = new FeedbackManager(this.player);

  constructor(system: CompanionSystem, id: string, config: PlayerConfig) {
    super(system, id, config);
    this.setupListeners();
  }

  async init(): Promise<void> {
    this.status(this.STATUS_ERROR);
    this.player.connect(this.config.host, this.config.port);
    this.refreshActions();
    this.defineFeedbacks();
  }

  destroy(): void {
    this.player.destroy();
    this.destroy$.next();
  } 
  
  updateConfig(newConfig: PlayerConfig): void {
    this.player.disconnect();
    this.player.connect(newConfig.host, newConfig.port);
    this.config = newConfig;
  }

  action(event: CompanionActionEvent): void {
    this.actions.handle(event);
  }

  config_fields(): CompanionConfigField[] {
    return getConfigInputFields(this);
  }

  private setupListeners(): void {
    this.player.client.connectionStateChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.status(state));

    this.actions.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.refreshActions());

    this.feedbacks.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => this.checkFeedbacks(id));
  }

  private refreshActions(): void {
    const actions = this.actions.get();
    this.setActions(actions);
  }

  private defineFeedbacks(): void {
    const feedbacks = this.feedbacks.get();
    this.setFeedbackDefinitions(feedbacks);
  }

}
