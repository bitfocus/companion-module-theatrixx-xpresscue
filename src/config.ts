import { Regex, SomeCompanionConfigField } from '@companion-module/base'

export interface PlayerConfig {
	host: string
	port: number
}

export function ConfigFieldsFactory(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'Information',
			value:
				'This is the official Theatrixx xPressCue Companion module, please consult the help documentation for more information.',
		},
		{
			id: 'host',
			type: 'textinput',
			label: 'Host IP Address',
			regex: Regex.IP,
			width: 6,
			required: true,
		},
		{
			id: 'port',
			type: 'number',
			label: 'Host port',
			width: 6,
			required: true,
			min: 1,
			max: 65535,
			default: 80,
		},
	]
}
