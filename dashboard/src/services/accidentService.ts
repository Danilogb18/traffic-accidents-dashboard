import { get, limitToLast, orderByChild, query, ref } from 'firebase/database';
import { database } from '../firebase/firebase';
import type { Accident } from '../types/accident';

export async function fetchAccidents(limit = 500): Promise<Accident[]> {
  const q = query(ref(database, 'accidents'), orderByChild('crash_date'), limitToLast(limit));
  const snapshot = await get(q);

  const rows: Accident[] = [];
  snapshot.forEach((child) => {
    rows.push(child.val() as Accident);
  });
  return rows.reverse(); 
}