import { SimpleEntity } from '@theatrixx/xpresscue-connect'
import { MonoTypeOperatorFunction, Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

export function filterEntitiesChanged<T extends SimpleEntity>(): MonoTypeOperatorFunction<T[]> {
	return (obs$: Observable<T[]>): Observable<T[]> => obs$.pipe(distinctUntilChanged(entitiesSame))
}

function entitiesSame<T extends SimpleEntity>(x: T[], y: T[]): boolean {
	if (x.length !== y.length) {
		/** List length changed, some items were added or removed */
		return false
	}

	/** Otherwise, has the name changed? */
	return x.every((entity, idx) => {
		return y[idx].name === entity.name
	})
}
