
public interface Iterator<T> {
    boolean hasNext();
    T getNext();
    void reset();
}

public class DepthFirstIterator<T> implements Iterator<T> {
    private final Vertex<T> startVertex;
    private Deque<Vertex<T>> stack = new LinkedList<>();

    public DepthFirstIterator(Vertex<T> startVertex) {
        this.startVertex = startVertex;
        stack.push(startVertex);
    }

    @Override
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    @Override
    public T getNext() {
        if (!hasNext()) {
            return null;
        }
        Vertex<T> current = stack.pop();
        if (!current.isVisited()) {
            current.setVisited(true);
            current.getNeighbors().forEach(stack::push);
            return current;
        }
        return getNext();
    }

    @Override
    public void reset() {
        stack.clear();
        stack.push(startVertex);
    }
}

public class BreadthFirstIterator<T> implements Iterator<T> {
    public BreadthFirstIterator() {
        ...
    }

    @Override
    public boolean hasNext() {
        ...
    }

    @Override
    public T getNext() {
        ...
    }

    @Override
    public void reset() {
        ...
    }
}

public static void main(String[] args) {
    Vertex<Integer> v0 = new Vertex<>(0);
    Vertex<Integer> v1 = new Vertex<>(1);
    Vertex<Integer> v2 = new Vertex<>(2);
    Vertex<Integer> v3 = new Vertex<>(3);
    Vertex<Integer> v4 = new Vertex<>(4);
    Vertex<Integer> v5 = new Vertex<>(5);
    Vertex<Integer> v6 = new Vertex<>(6);

    v0.setNeighbors(Arrays.asList(v1, v5, v6));
    v1.setNeighbors(Arrays.asList(v3, v4, v5));
    v4.setNeighbors(Arrays.asList(v2, v6));
    v6.setNeighbors(Arrays.asList(v0));

    DepthFirstIterator<Integer> dfs = new DepthFirstIterator<>(v0);
    while (dfs.hasNext()) {
        System.out.println(dfs.getNext());
    }
}

public interface Tree<T> {
    Iterator<T> createBFSIterator(...);
    Iterator<T> createDFSIterator(...);
}

public class BinarySearchTree<T> implements Tree<T> {
    ...

    @Override
    public Iterator<T> createBFSIterator(...) {
        return new BreadthFirstIterator<>(...);
    }

    @Override
    public Iterator<T> createDFSIterator(...) {
        return new DepthFirstIterator<>(...);
    }
}

public class RedBlackTree<T> implements Tree<T> {
    ...

    @Override
    public Iterator<T> createBFSIterator(...) {
        return new BreadthFirstIterator<>(...);
    }

    @Override
    public Iterator<T> createDFSIterator(...) {
        return new DepthFirstIterator<>(...);
    }
}
