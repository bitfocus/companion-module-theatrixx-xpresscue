import InstanceSkel = require('../../../instance_skel')
import { SomeCompanionConfigField } from '../../../instance_skel_types';

export interface PlayerConfig {
  host: string;
  port: number;
}

export function getConfigInputFields(instance: InstanceSkel<PlayerConfig>): SomeCompanionConfigField[] {
  return [
    {
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module is for the Theatrixx MediaPlayer, please read the help'
		},
    {
      id: 'host',
      type: 'textinput',
      label: 'Host IP Address',
      regex: instance.REGEX_IP,
      width: 6,
      required: true
    },
    {
      id: 'port',
      type: 'number',
      label: 'Host port',
      width: 6,
      required: true,
      min: 1,
      max: 65535,
      default: 80
    }
  ];
}
