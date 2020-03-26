import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';

// ----
export interface IPouch {
  id: string;
  json: string;
}
interface IPouchDBAllDocsResult {
  offset: number;
  total_rows: number;
  rows: IPouchDBRow[];
}

interface IPouchDBPutResult {
  ok: boolean;
  id: string;
  rev: string;
}

interface IPouchDBRemoveResult {
  ok: boolean;
  id: string;
  rev: string;
}

interface IPouchDBRow {
  id: string;
  key: string;
  value: { rev: string };

  // Only included if include_docs is set to true during query.
  doc?: any;
}

interface IPouchDBGetResult {
  _id: string;
  _rev: string;
}
interface IPouchDBGetPouchResult extends IPouchDBGetResult {
  json: string;
}

// ----

@Injectable({
  providedIn: 'root'
})
export class PouchdbService {
  private isInstantiated: boolean;
  private pouch: any;

  constructor() {
    if (!this.isInstantiated) {
      this.pouch = new PouchDB(
        'pouchdb-sici',
        {
          auto_compaction: true
        }
      );
      this.isInstantiated = true;
    }
  }

   // --
   public add(id: string, json: string): Promise<string> {
    const promise = this.pouch
      .put({
        _id: (id ),
        json
      })
      .then(
        (result: IPouchDBPutResult): string => {
          return (result.id);
        },
        error => {
          return this.update(id, json);
        }
      );

    return (promise);
  }

  public delete(id: string): Promise<void> {
    const promise = this.pouch
      .get(id)
      .then(
        (doc: IPouchDBGetPouchResult ): any => {
          return (this.pouch.remove(doc));
        }
      )
      .then(
        (result: IPouchDBRemoveResult): void => {
          return;
        }
      );
    return (promise);
  }

  public deleteAll(): Promise<void> {
    this.pouch
      .allDocs().then(result => {
        // Promise isn't supported by all browsers; you may want to use bluebird
        return Promise.all(result.rows.map(row => {
          return this.pouch.remove(row.id, row.value.rev);
        }));
      });

    //  CLEANUP
    const promise = new PouchDB('tmp-pouchdb-sici').destroy()
      .then(() => Promise.resolve(new PouchDB('tmp-pouchdb-sici')))
      .then(tmpDB => new Promise((resolve, reject) => {
        this.pouch.replicate.to(tmpDB, { filter: (doc, req) => !doc._deleted})
          .on('complete', () => { resolve(tmpDB); })
          .on('denied', reject)
          .on('error', reject);
      }))
      .then((tmpDB) => {
        return this.pouch.destroy().then(() => Promise.resolve(tmpDB));
      })
      .then((tmpDB) => new Promise((resolve, reject) => {
        try {
          resolve({ db: new PouchDB('pouchdb-sici'), tmpDB });
        } catch (e) {
          reject(e);
        }
      }))
      .then(({ db, tmpDB }) => new Promise((resolve, reject) => {
         tmpDB.replicate.to(db)
          .on('complete', () => { this.pouch = db; resolve(tmpDB); })
          .on('denied', reject)
          .on('error', reject);
      }))
      .then((tmpDB) => tmpDB.destroy())
      .then(() => { console.log('Cleanup complete'); })
      .catch((err) => { console.log(err); });
    return (promise);
  }

  public update(id: string, json: string): Promise<void> {
    const promise  = this.pouch
      .get(id)
      .then(
        (doc: IPouchDBGetPouchResult ): Promise<IPouchDBPutResult> => {
          doc.json = json;
          return (this.pouch.put(doc));
        }
      )
      .then(
        (result: IPouchDBPutResult): void => {
          return;
        }
      );
    return (promise);
  }

  public getById(id: string): Promise<IPouch> {
    const promise = this.pouch.get(id)
      .then(
        result => {
          return ({
            id: result._id,
            json: result.json
          });
        });
    return (promise);
  }

  public getAllByClave(clave: string): Promise<IPouch[]> {
    const promise = this.pouch
      .allDocs({
        include_docs: true,
        startkey: clave,
        endkey: clave + '\uffff'
      })
      .then(
        (result: IPouchDBAllDocsResult): IPouch[] => {
          const all = result.rows.map(
            (row: any): IPouch => {
              return({
                id: row.doc._id,
                json: row.doc.json
            });
            }
          );
          return (all);
        }
      );
    return (promise);
  }

  public sortPouchCollection(bienes: IPouch[]): IPouch[] {

    bienes.sort(
      (a: IPouch, b: IPouch): number => {
        if (a.json.toLowerCase() < b.json.toLowerCase()) {
          return (-1);
        } else {
          return (1);
        }

      }
    );
    return (bienes);
  }

  public testId(clave: string, id: string): void {
    if (!id.startsWith(clave)) {
      throw (new Error('Invalid Id'));
    }
  }
}
