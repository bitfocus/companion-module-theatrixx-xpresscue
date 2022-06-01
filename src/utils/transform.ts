export function readableMiliseconds(value: number): string {
	if (value === null || value === undefined || isNaN(value)) {
		return ''
	}

	const negative = value < 0
	let outputString: string

	if (negative) {
		// tslint:disable-next-line: no-bitwise
		value = ~value + 1
	}

	const milliseconds = value - Math.floor(value / 1000) * 1000
	const seconds = Math.floor((value / 1000) % 60)
	const minutes = Math.floor((value / (1000 * 60)) % 60)
	const hours = Math.floor(value / (1000 * 60 * 60))

	const hoursStr = hours < 10 ? '0' + hours : hours
	const minutesStr = minutes < 10 ? '0' + minutes : minutes
	const secondsStr = seconds < 10 ? '0' + seconds : seconds

	let msStr = milliseconds.toString()

	if (milliseconds < 100) {
		msStr = '0' + milliseconds
	}

	if (milliseconds < 10) {
		msStr = '00' + milliseconds
	}

	outputString = `${hoursStr}:${minutesStr}:${secondsStr}.${msStr}`

	if (negative) {
		outputString = '-' + outputString
	}

	return outputString
}
