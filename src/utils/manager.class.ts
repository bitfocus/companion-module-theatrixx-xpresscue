import { Observable, Subject, merge } from 'rxjs';
import { map} from 'rxjs/operators';
import { Player, Type } from '@theatrixx/player-connection';


export class Manager<C, T extends ManagedInstance<C>> {

  protected instances = new Map<string, T>();
  protected _refresh$ = new Subject<string>();

  constructor(
    protected readonly player: Player,
    protected readonly instanceIdKey: string) {}

  /** Returns an object with all instances */
  get(): Record<string, C>
  /** Return an object with the instance matching ID `id`  */
  get(id: string): Record<string, C>
  get(id?: string): Record<string, C> {
    if (id) {
      return { [id]: this.instances.get(id)?.get() as C }
    }
    const instances: Record<string, C> = {};
    for (const [ id, instance ] of this.instances) {
      instances[id] = instance.get();
    }
    return instances;
  }

  get refresh$(): Observable<string> {
    return this._refresh$.asObservable();
  }

  protected initialize(types: Type<T>[]): void {
    const refreshObs: Observable<string>[] = [];
    /** Initialize instances */
    for (const type of types) {
      const instance = new type(this.player);
      const idKey = (type as any)[this.instanceIdKey] as string;
      this.instances.set(idKey, instance);
      if (instance.selectRefresh) {
        const obs = instance.selectRefresh().pipe(
          map(() => idKey)
        );
        refreshObs.push(obs);
      }
    }

    /** Create a combined refresh request */
    merge(...refreshObs).subscribe(ids => this._refresh$.next(ids));
  }
}

export interface ManagedInstance<C> {
  get(): C;
  selectRefresh?(): Observable<any>;
}

