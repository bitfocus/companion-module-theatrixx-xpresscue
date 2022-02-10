import { CompanionAction, CompanionActionEvent } from '../../../../instance_skel_types';
import { PlaylistPicker } from '../pickers';
import { Action, ActionId } from './_action.types';
import { Player } from '@theatrixx/player-connection';
import { Observable } from 'rxjs';

@ActionId('load_playlist')
export class LoadPlaylistAction implements Action {

  constructor(
    private readonly player: Player) {}
    
  get(): CompanionAction {
    return {
      label: 'Load Playlist',
      options: [
        PlaylistPicker(this.player),
        {
          id: 'func',
          label: 'Function',
          type: 'dropdown',
          default: 'replace',
          choices: [
            { id: 'append', label: 'Append' },
            { id: 'replace', label: 'Replace' },
          ]
        }
      ]
    }
  }

  selectRefresh(): Observable<void> {
    return this.player.store.select('Playlist');
  }

  handle(event: CompanionActionEvent): void {
    const opts = event.options;
    this.player.loadPlaylist(opts.playlistId as string, opts.func as any);
  }
}
