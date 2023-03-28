interface QueryModifier<T> {
  sortBy?: keyof T;
  order?: 'asc' | 'desc';
  where?: (item: T) => boolean;
}

class Query<T> {
  data: T[];
  constructor(data: T[]) {
    this.data = new Array(...data);
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
      const aValStr = String(aVal);
      const bValStr = String(bVal);
      const aDate = new Date(aValStr).getTime();
      const bDate = new Date(bValStr).getTime();
      if (!isNaN(aDate) && !isNaN(bDate)) {
        return order === 'asc' ? aDate - bDate : bDate - aDate;
      }

      return order === 'asc'
        ? aValStr.localeCompare(bValStr)
        : bValStr.localeCompare(aValStr);
    });
    return this;
  }

  get(query?: QueryModifier<T>): T[] {
    if (!query) {
      return this.data;
    }
    const { sortBy, order, where } = query;
    if (where) {
      this.where(where);
    }
    if (sortBy) {
      this.sort(sortBy, order);
    }
    return this.data;
  }

  first(query?: QueryModifier<T>): T {
    return this.get(query)[0];
  }
}

export function query<T>(data: T[]) {
  return new Query<T>(data);
}
