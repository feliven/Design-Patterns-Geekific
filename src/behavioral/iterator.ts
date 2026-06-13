interface Iterator<T> {
  hasNext(): boolean;
  getNext(): T;
  reset(): void;
}

interface Vertex<T> {
  isVisited(): boolean;
  setVisited(set: boolean): void;
  getNeighbors(): T[];
  setNeighbors(neighbors: Vertex<T>[]): void;
}

class Vertex<T> implements Vertex<T> {
  constructor(private num: number) {
    this.num = num;
  }

  isVisited(): boolean {
    return true;
  }
  setVisited(set: boolean): void {}
  getNeighbors(): T[] {
    return [];
  }
}

class DepthFirstIterator<T> implements Iterator<T> {
  private startVertex: Vertex<T>;
  private stack: Vertex<T>[] = [];

  constructor(startVertex: Vertex<T>) {
    this.startVertex = startVertex;
    this.stack.push(startVertex);
  }

  hasNext(): boolean {
    return !Boolean(this.stack.length);
  }

  getNext(): T {
    if (!this.hasNext()) {
      return null as T;
    }

    const current: Vertex<T> | undefined = this.stack.pop();

    if (!current?.isVisited()) {
      current?.setVisited(true);
      current?.getNeighbors().forEach((neighbor) => {
        this.stack.push(neighbor as Vertex<T>);
      });
      return current as T;
    }
    return this.getNext();
  }

  reset(): void {
    this.stack.length = 0;
    this.stack.push(this.startVertex);
  }
}

class BreadthFirstIterator<T> implements Iterator<T> {
  BreadthFirstIterator() {
    //
  }

  hasNext(): boolean {
    //
    return true;
  }

  getNext(): T {
    //
    return "" as T;
  }

  reset(): void {
    //
  }
}

function iteratorFn(): void {
  const v0 = new Vertex<number>(0);
  const v1 = new Vertex<number>(1);
  const v2 = new Vertex<number>(2);
  const v3 = new Vertex<number>(3);
  const v4 = new Vertex<number>(4);
  const v5 = new Vertex<number>(5);
  const v6 = new Vertex<number>(6);

  v0.setNeighbors([v1, v5, v6]);
  v1.setNeighbors([v3, v4, v5]);
  v4.setNeighbors([v2, v6]);
  v6.setNeighbors([v0]);

  const dfs = new DepthFirstIterator<number>(v0);
  while (dfs.hasNext()) {
    console.log(dfs.getNext());
  }
}

iteratorFn();
