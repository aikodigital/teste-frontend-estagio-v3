interface QueryModifier<T, R> {
  sortBy?: keyof T;
  order?: 'asc' | 'desc';
  where?: (item: T) => boolean;
  limit?: number;
  relation?: {
    data: R[];
    key: keyof R;
    relation: keyof T;
  };
}

class Query<T> {
  data: T[];
  constructor(data: T[]) {
    this.data = data;
  }

  where(callback: (item: T) => boolean) {
    this.data = this.data.filter(callback);
    return this;
  }

  sort(field: keyof T, order: 'asc' | 'desc' = 'asc') {
    this.data.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return order === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return this;
  }

  limit(limit: number) {
    this.data.splice(limit);
    return this;
  }

  get<R>(query?: QueryModifier<T, R>): (T & { relation: R[] })[] {
    const data = this.data.map((a) => ({ ...a, relation: [] }));
    if (!query) {
      return data;
    }
    const { sortBy, order, where, limit, relation } = query;
    if (where) {
      this.where(where);
    }
    if (sortBy) {
      this.sort(sortBy, order);
    }
    if (limit) {
      this.limit(limit);
    }
    if (relation) {
      return this.relation<R>(relation.data, relation.key, relation.relation);
    }
    return data;
  }

  relation<R>(
    data: R[],
    key: keyof R,
    relation: keyof T,
  ): (T & { relation: R[] })[] {
    return this.data.map((a) => {
      const id = a[relation] as unknown;
      const related: R[] = data.filter((b) => b[key] === id);
      return {
        ...a,
        relation: related,
      };
    });
  }
}

export function query<T>(data: T[]) {
  return new Query<T>(data);
}
