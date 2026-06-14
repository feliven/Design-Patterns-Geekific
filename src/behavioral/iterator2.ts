interface Iterator<T> {
  hasNext(): boolean;
  getNext(): T | null;
  reset(): void;
}

class Vertex<T> {
  private visited = false;
  private neighbors: Vertex<T>[] = [];

  constructor(public val: T) {}

  isVisited(): boolean {
    return this.visited;
  }

  setVisited(visited: boolean): void {
    this.visited = visited;
  }

  getNeighbors(): Vertex<T>[] {
    return this.neighbors;
  }

  setNeighbors(neighbors: Vertex<T>[]): void {
    this.neighbors = neighbors;
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
    return this.stack.length > 0;
  }

  getNext(): T | null {
    if (!this.hasNext()) {
      return null;
    }

    const current = this.stack.pop()!;
    if (!current.isVisited()) {
      current.setVisited(true);
      // Push neighbors to stack
      current.getNeighbors().forEach((neighbor) => {
        this.stack.push(neighbor);
      });
      return current.val;
    }
    return this.getNext();
  }

  reset(): void {
    this.stack = [this.startVertex];
  }
}

class BreadthFirstIterator<T> implements Iterator<T> {
  private startVertex: Vertex<T>;
  private queue: Vertex<T>[] = [];

  constructor(startVertex: Vertex<T>) {
    this.startVertex = startVertex;
    this.queue.push(startVertex);
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }

  getNext(): T | null {
    if (!this.hasNext()) {
      return null;
    }

    const current = this.queue.shift()!;
    if (!current.isVisited()) {
      current.setVisited(true);
      // Push neighbors to queue
      current.getNeighbors().forEach((neighbor) => {
        this.queue.push(neighbor);
      });
      return current.val;
    }
    return this.getNext();
  }

  reset(): void {
    this.queue = [this.startVertex];
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

  console.log("--- Depth First Search ---");
  const dfs = new DepthFirstIterator<number>(v0);
  while (dfs.hasNext()) {
    const next = dfs.getNext();
    if (next) {
      console.log(next);
    }
  }

  // Reset visit status for BFS
  [v0, v1, v2, v3, v4, v5, v6].forEach((v) => v.setVisited(false));

  console.log("--- Breadth First Search ---");
  const bfs = new BreadthFirstIterator<number>(v0);
  while (bfs.hasNext()) {
    const next = bfs.getNext();
    if (next) {
      console.log(next);
    }
  }
}

iteratorFn();

interface Tree<T> {
  createBFSIterator(...params: unknown[]): Iterator<T>;
  createDFSIterator(...params: unknown[]): Iterator<T>;
}

export class BinarySearchTree<T> implements Tree<T> {
  //

  createBFSIterator(param: Vertex<T>): Iterator<T> {
    return new BreadthFirstIterator<T>(param);
  }

  createDFSIterator(param: Vertex<T>): Iterator<T> {
    return new DepthFirstIterator<T>(param);
  }
}

export class RedBlackTree<T> implements Tree<T> {
  //

  createBFSIterator(param: Vertex<T>): Iterator<T> {
    return new BreadthFirstIterator<T>(param);
  }

  createDFSIterator(param: Vertex<T>): Iterator<T> {
    return new DepthFirstIterator<T>(param);
  }
}
