import { CompanionInputFieldDropdown, DropdownChoice } from '../../../instance_skel_types';
import {
  MediaFileStore,
  Player,
  PlaylistStore,
  SimpleEntity,
  TestPatternStore
} from '@theatrixx/xpresscue-connect';

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
  const patterns = player.state.get(TestPatternStore);
  const choices = patterns.map(m => ({ id: m._id, label: m._id }));
  return {
    id: 'patternId',
    label: 'Choose Test Pattern',
    type: 'dropdown',
    default: '',
    choices,
    minChoicesForSearch: 0
  }
}

function getDropdown<T extends SimpleEntity>(entities: T[]): DropdownChoice[] {
  return entities.map(m => ({ id: m._id, label: m.name }));
}
